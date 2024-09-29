/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, ProductQA } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IQAFilterRequest, IQARequest, IQAUpdateRequest } from './productQA.interface';
import { productQAValidation } from './productQA.utils';
import { QARelationalFields, QARelationalFieldsMapper, QASearchableFields } from './productQA.constants';

// modules

// !----------------------------------Create New Event------------------------------------->>>
const addQA = async (data: IQARequest): Promise<ProductQA> => {
  await productQAValidation(data);

  const dataObj = {
    productId: data.productId,
    question: data.question,
    answer: data.answer,
  };

  const result = await prisma.productQA.create({
    data: dataObj,
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add QA');

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getQA = async (filters: IQAFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<ProductQA[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, productName, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProductQAWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...QASearchableFields.map((field: any) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
        {
          product: {
            productName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (QARelationalFields.includes(key)) {
          return {
            [QARelationalFieldsMapper[key]]: {
              name: (filterData as any)[key],
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

  if (productName) {
    andConditions.push({
      product: {
        productName: {
          equals: productName,
        },
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ProductQAWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.productQA.findMany({
    include: {
      product: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.productQA.count({
    where: whereConditions,
  });

  // Calculate total pages
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

// !----------------------------------Update Courier---------------------------------------->>>
const updateQA = async (productQaId: string, payload: IQAUpdateRequest): Promise<ProductQA> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingQA = await transactionClient.productQA.findUnique({
      where: {
        productQaId,
      },
    });

    if (!existingQA) {
      throw new ApiError(httpStatus.NOT_FOUND, 'QA Not Found!!');
    }

    const updatedDetails = {
      productId: payload?.productId,
      question: payload?.question,
      answer: payload?.answer,
    };

    const updatedQA = await transactionClient.productQA.update({
      where: {
        productQaId,
      },
      data: updatedDetails,
    });

    return updatedQA;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update QA !!');
  }

  return result;
};

const deleteQA = async (productQaId: string): Promise<ProductQA> => {
  if (!productQaId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'productQaId is required');
  }

  const result = await prisma.productQA.delete({
    where: {
      productQaId,
    },
  });

  return result;
};

export const QAService = {
  addQA,
  getQA,
  updateQA,
  deleteQA,
};
