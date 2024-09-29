/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IKidRequest } from './kid.interface';
import { BarcodeStatus, User, UserRoles } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KidValidation = async (data: IKidRequest) => {
  if (!data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'BarCode is required');
  }

  const isProductExist = await prisma.barCode.findUnique({
    where: {
      code: data.code,
      barcodeStatus: BarcodeStatus.AVAILABLE,
    },
  });

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }
};

export const UserCreation = async ({ email, password }: { email: string; password: string }): Promise<User> => {
  //

  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  // transaction start
  const result = await prisma.$transaction(async transactionClient => {
    const profileData = {
      role: UserRoles.USER,
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
    });

    if (!createdUser) throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');

    return createdUser;
  });

  return result;
};

//
export const filterNonNull = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== '')) as Partial<T>;
};
