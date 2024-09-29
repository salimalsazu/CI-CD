/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IUpdateProfileReq, IUserFilterRequest, IUsersResponse } from './user.interface';
import { userRelationalFields, userRelationalFieldsMapper, userSearchableFields } from './users.constants';

// ! getting all users ----------------------------------------------------------------------->>>
const getAllUserService = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<IUsersResponse[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;
  // Define an array to hold filter conditions
  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field: any) => {
        if (field === 'fullName') {
          return {
            profile: {
              fullName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.UserWhereInput;
        } else if (field === 'phoneNumber') {
          return {
            profile: {
              phoneNumber: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.UserWhereInput;
        } else if (field === 'companyName') {
          return {
            profile: {
              companyName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.UserWhereInput;
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.UserWhereInput;
        }
      }),
    } as Prisma.UserWhereInput);
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (userRelationalFields.includes(key)) {
          return {
            profile: {
              [userRelationalFieldsMapper[key]]: {
                equals: (filterData as any)[key],
              },
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.user.findMany({
    where: {
      ...whereConditions,
      profile: {
        role: {
          in: ['ADMIN', 'SUPERADMIN'],
        },
      },
    },
    select: {
      createdAt: true,
      email: true,
      profile: true,
      userId: true,
      updatedAt: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  const total = await prisma.user.count({
    where: {
      profile: {
        role: {
          in: ['ADMIN', 'SUPERADMIN'],
        },
      },
    },
  });

  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// ! getting all Clients ----------------------------------------------------------------------->>>
const getAllClients = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<IUsersResponse[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;
  // Define an array to hold filter conditions
  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field: any) => {
        if (field === 'fullName') {
          return {
            profile: {
              fullName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.UserWhereInput;
        } else if (field === 'phoneNumber') {
          return {
            profile: {
              phoneNumber: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.UserWhereInput;
        } else if (field === 'companyName') {
          return {
            profile: {
              companyName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.UserWhereInput;
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.UserWhereInput;
        }
      }),
    } as Prisma.UserWhereInput);
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (userRelationalFields.includes(key)) {
          return {
            profile: {
              [userRelationalFieldsMapper[key]]: {
                equals: (filterData as any)[key],
              },
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.user.findMany({
    where: {
      ...whereConditions,
      profile: {
        role: {
          equals: 'USER',
        },
      },
    },
    select: {
      createdAt: true,
      email: true,
      profile: true,
      userId: true,
      updatedAt: true,
      // _count: {
      //   select: {
      //     order: true,
      //   },
      // },
      // order: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  const total = await prisma.user.count({
    where: {
      profile: {
        role: {
          equals: 'USER',
        },
      },
    },
  });

  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// ! getting single user data -------------------------------------------------------->>>
const getSingleUser = async (userId: string): Promise<IUsersResponse | null> => {
  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!');
  }

  const result = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
      email: true,
      profile: true,
      // profile: {
      //   select: {
      //     profileId: true,
      //     fullName: true,
      //     addressLine1: true,
      //     addressLine2: true,
      //     city: true,
      //     companyName: true,
      //     country: true,
      //     phoneNumber: true,
      //     postalCode: true,
      //     state: true,
      //     role: true,
      //     createdAt: true,
      //     updatedAt: true,
      //   },
      // },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!');
  }

  return result;
};

// ! update Profile info -------------------------------------------------------->>>
const updateMyProfileInfo = async (userId: string, payload: IUpdateProfileReq) => {
  const { firstName, lastName, email, address, mobileNumber, password, newPassword, displayContactInfo } = payload;
  const result = await prisma.$transaction(async transactionClient => {
    // Check if the user exists
    const existingUser = await transactionClient.user.findUnique({
      where: {
        userId,
      },
      select: {
        password: true,
        profile: {
          select: {
            profileId: true,
          },
        },
      },
    });

    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Profile not Found !!');
    }
    // if new password
    if (password && newPassword) {
      const checkHashedPassword = await bcrypt.compare(password as string, existingUser.password);

      if (!checkHashedPassword) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Current Password is Wrong !');
      } else {
        //  updating new password
        const newHashedPassword = await bcrypt.hash(password as string, Number(config.bcrypt_salt_rounds));
        await transactionClient.user.update({
          where: {
            userId,
          },
          data: {
            password: newHashedPassword,
          },
        });
      }
    }
    // if new email
    if (email) {
      const isExistEmail = await transactionClient.user.findUnique({
        where: {
          email,
        },
      });

      if (isExistEmail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This Email already Used !');
      }
      // if not
      else {
        await transactionClient.user.update({
          where: {
            userId,
          },
          data: {
            email,
          },
        });
      }
    }

    // updating profile details
    const updatedDetails: IUpdateProfileReq = {
      firstName,
      address,
      lastName,
      mobileNumber,
      displayContactInfo,
    };

    console.log(updatedDetails);

    //
    const updatedResult = await transactionClient.profile.update({
      where: {
        profileId: existingUser?.profile?.profileId as string,
      },
      data: updatedDetails,
      include: {
        user: {
          select: {
            email: true,
            updatedAt: true,
          },
        },
      },
    });
    return updatedResult;
  });

  return result;
};

//! get my profile ----------------------------------------------------------------------->>>
const getMyProfile = async (userId: string): Promise<IUsersResponse | null> => {
  const result = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
      profile: true,
      profileId: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!');
  }

  return result;
};

// ! --------------- exports all user service
export const UserService = {
  getAllUserService,
  getSingleUser,
  updateMyProfileInfo,
  getMyProfile,
  getAllClients,
};
