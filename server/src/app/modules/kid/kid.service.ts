/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarcodeStatus, KidDetails, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';
import { Request } from 'express';
import { ICreateKidDetails, IKidRequest, IKidUpdateRequest, IProductFilterRequest, IRelation } from './kid.interface';
import { UserCreation, filterNonNull } from './kid.utils';
import { KidRelationalFields, KidSearchableFields, kidRelationalFieldsMapper } from './kid.constants';
import fs from 'fs';
import { errorLogger } from '../../../shared/logger';
// modules

// !----------------------------------Create New Kid--------------------------------------->>>
const addKid = async (req: Request): Promise<KidDetails> => {
  const file = req.file as IUploadFile;

  const filePath = file?.path?.substring(8);

  const { email, password, ...data } = req.body as IKidRequest;

  // await KidValidation(data);

  const relationDetails: IRelation[] = data?.relations?.map((relation: any) => {
    return {
      firstName: relation?.firstName,
      lastName: relation?.lastName,
      relation: relation?.relation,
      phoneNo: relation?.phoneNo,
    };
  });

  const result = await prisma.$transaction(async transactionClient => {
    const isProductExist = await prisma.barCode.findUnique({
      where: {
        code: data.code,
      },
    });

    if (!isProductExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Barcode Not Found!!');
    }

    const newObjData: ICreateKidDetails = {
      kidImage: filePath,
      barcodeId: isProductExist.barcodeId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      kidAge: data.kidAge,
      relations: relationDetails,
    };

    // ! check if email is already used or created

    const isExistEmail = await transactionClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!isExistEmail) {
      const createUser = await UserCreation({ email, password });
      newObjData['userId'] = createUser?.userId;
    } else {
      newObjData['userId'] = isExistEmail.userId;
    }

    const addNewKid = await transactionClient.kidDetails.create({
      data: newObjData,
    });

    if (addNewKid) {
      await transactionClient.barCode.update({
        where: {
          barcodeId: isProductExist.barcodeId,
        },
        data: {
          barcodeStatus: BarcodeStatus.ACTIVE,
        },
      });
    }

    return addNewKid;
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Kid creation failed');
  }
  return result;
};

// !----------------------------------get all Kid ---------------------------------------->>>
const getKid = async (filters: IProductFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<KidDetails[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.KidDetailsWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: KidSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (KidRelationalFields.includes(key)) {
          return {
            [kidRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
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
  const whereConditions: Prisma.KidDetailsWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.kidDetails.findMany({
    where: whereConditions,
    skip,
    include: {
      barCode: true,
      user: {
        select: {
          email: true,
        },
      },
    },
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.kidDetails.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = limit > 0 ? Math.ceil(total / limit) : 0;

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

// !----------------------------------Update Kid---------------------------------------->>>
const updateKid = async (kidId: string, req: Request): Promise<KidDetails> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);

  const result = await prisma.$transaction(async transactionClient => {
    const isExistKid = await transactionClient.kidDetails.findUnique({
      where: {
        kidId,
      },
    });

    if (!isExistKid) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Kid Not Found!!');
    }

    // getting updated data
    const updatedReq = {
      kidImage: filePath,
      ...(req.body as IKidUpdateRequest),
    };
    const updatedDetails = filterNonNull(updatedReq);
    console.log('kid update req', updatedReq);

    const updatedProduct = await transactionClient.kidDetails.update({
      where: {
        kidId,
      },
      data: updatedDetails,
    });

    if (!updatedProduct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Update');
    }
    // deleting old style Image
    if (updatedProduct && filePath !== undefined) {
      const oldFilePath = 'uploads/' + isExistKid.kidImage;
      if (oldFilePath !== undefined && filePath !== undefined) {
        fs.unlink(oldFilePath, err => {
          if (err) {
            errorLogger.error('Error deleting old file');
          }
        });
      }
    }

    return updatedProduct;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Product Information');
  }

  return result;
};

//! Kid Delete !
const deleteKid = async (kidId: string, userId: string): Promise<KidDetails> => {
  if (!kidId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Kid Id is required');
  }

  const result = await prisma.$transaction(async transactionClient => {
    // check is exist or not
    const isExistKid = await transactionClient.kidDetails.findUnique({
      where: {
        kidId,
        userId,
      },
    });

    if (!isExistKid) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Kid Not Found !');
    }

    //

    const res = await prisma.kidDetails.delete({
      where: {
        kidId,
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to Delete Kid !');
    }
    //
    const updateBarCodeStatus = await transactionClient.barCode.update({
      where: {
        barcodeId: res?.barcodeId as string,
      },
      data: {
        barcodeStatus: 'AVAILABLE',
      },
    });

    if (!updateBarCodeStatus) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to Update Barcode Status!');
    }

    return res;
  });

  return result;
};

// ! get my kids (for user)

const getMyAllKids = async (userId: string): Promise<KidDetails[]> => {
  const result = await prisma.kidDetails.findMany({
    where: {
      user: {
        userId,
      },
    },
    include: {
      barCode: {
        select: {
          variant: {
            select: {
              product: {
                select: {
                  featuredImage: true,
                  productName: true,
                  productPrice: true,
                  productStatus: true,
                  category: {
                    select: {
                      categoryHref: true,
                      categoryName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!result?.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You haven't added any Kids");
  }

  return result;
};

export const KidService = {
  addKid,
  getKid,
  updateKid,
  deleteKid,
  getMyAllKids,
};
