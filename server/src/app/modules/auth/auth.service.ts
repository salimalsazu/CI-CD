/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse, IRefreshTokenResponse, IUserCreate, IUserLogin } from './auth.interface';
import { UserRoles } from '@prisma/client';
import nodemailer from 'nodemailer';
import { generatePassword } from './auth.utils';

// ! create new user
const createNewUser = async (data: IUserCreate) => {
  const { password, email } = data;

  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  // transaction start
  const newUser = await prisma.$transaction(async transactionClient => {
    const isUserExist = await transactionClient.user.findFirst({
      where: { email },
    });

    if (isUserExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already in use');

    const profileData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      role: data.role || UserRoles.USER,
    };

    const createdProfile = await transactionClient.profile.create({
      data: {
        ...profileData,
      },
      select: {
        profileId: true,
      },
    });

    if (!createdProfile) throw new ApiError(httpStatus.BAD_REQUEST, 'Profile creation failed');

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          connect: {
            profileId: createdProfile.profileId,
          },
        },
      },
      select: {
        userId: true,
        email: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!createdUser) throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');

    const accessToken = jwtHelpers.createToken(
      {
        userId: createdUser?.userId,
        role: createdUser?.profile?.role,
        profileId: createdUser?.profile?.profileId,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
      {
        userId: createdUser?.userId,
        role: createdUser?.profile?.role,
        profileId: createdUser?.profile?.profileId,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
    };
  });

  return newUser;
};

//login
const userLogin = async (loginData: IUserLogin): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: {
        select: {
          profileId: true,
          role: true,
        },
      },
    },
  });

  /// comment
  if (!isUserExist) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found !!');

  // variable
  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect !!');
  }

  const { userId, profile } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role: profile?.role,
      profileId: profile?.profileId,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      userId: isUserExist.userId,
      role: profile?.role,
      profileId: profile?.profileId,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

//! admin login

const dashboardLogin = async (loginData: IUserLogin): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: {
        select: {
          profileId: true,
          role: true,
        },
      },
    },
  });

  if (!isUserExist) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found !!');

  if (isUserExist && isUserExist?.profile?.role === UserRoles.USER) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You don`t have permission to Login. ask to Admin !!');
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect !!');
  }

  const { userId, profile, email: loggedInEmail } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role: profile?.role,
      profileId: profile?.profileId,
      email: loggedInEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      userId: isUserExist.userId,
      role: profile?.role,
      profileId: profile?.profileId,
      email: loggedInEmail,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// !refreshToken --------------------------------
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // ! verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    // err
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Refresh Token');
  }
  //! if user not exist
  // !checking deleted user's refresh token
  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
    },
    include: {
      profile: {
        select: {
          role: true,
          profileId: true,
        },
      },
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!!');
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist?.userId,
      role: isUserExist?.profile?.role,
      profileId: isUserExist?.profile?.profileId,
      email: isUserExist?.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const forgetPassword = async (data: { email: string }): Promise<any> => {
  if (!data.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
  }

  const isExistUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Generate a random password reset token here

  const temporaryPassword = await generatePassword();

  const hashedPassword = await bcrypt.hash(temporaryPassword, Number(config.bcrypt_salt_rounds));

  // Update the user's record in the database with the password reset token
  const updatePassword = await prisma.user.update({
    where: {
      email: isExistUser.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!updatePassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Temporary password update failed');
  }

  // send email
  const transporter = nodemailer.createTransport({
    // Provide your email configuration here
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'accsalimalsazu@gmail.com',
      pass: 'qjlikalhzqdirtrx',
    },
  });

  // Send email
  const mailOptions = {
    from: 'accsalimalsazu@gmail.com',
    to: isExistUser.email,
    subject: 'Password Reset Request',
    html: `
    <html>
    <body style="font-family: monospace, sans-serif; padding: 20px; font-weight: 600; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007BFF;">Password Reset Request</h2>
        <p>Hello ${isExistUser.email},</p>
        <p>Your temporary password for logging in is: <strong style="color: #28A745; border: 1px solid green; padding:5px 15px; border-radius: 6px;">${temporaryPassword}</strong></p>
        <p>Please change your password after logging in.</p>
       
        <p style="font-size: larger; font-family: monospace;">Thank you....</p>
      </div>
    </body>
  </html>
  `,
  };

  const result = await transporter.sendMail(mailOptions);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email sending failed');
  }

  return result;
};

export const AuthService = {
  createNewUser,
  userLogin,
  refreshToken,
  dashboardLogin,
  forgetPassword,
};
