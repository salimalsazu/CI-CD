/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Tax } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { ITaxFilterRequest, ITaxRequest, ITaxUpdateRequest } from './tax.interface';
import { TaxRelationalFields, TaxRelationalFieldsMapper, TaxSearchableFields } from './tax.constants';

// modules

// !----------------------------------Create New Event------------------------------------->>>
const addTax = async (data: ITaxRequest): Promise<Tax> => {
  const dataObj = {
    state: data.state,
    tax: data.tax,
  };

  const result = await prisma.tax.create({
    data: dataObj,
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Tax !!');

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getTax = async (filters: ITaxFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Tax[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.TaxWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...TaxSearchableFields.map((field: any) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (TaxRelationalFields.includes(key)) {
          return {
            [TaxRelationalFieldsMapper[key]]: {
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
  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.TaxWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.tax.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.tax.count({
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
const updateTax = async (taxId: string, payload: ITaxUpdateRequest): Promise<Tax> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingTax = await transactionClient.tax.findUnique({
      where: {
        taxId,
      },
    });

    if (!existingTax) {
      throw new ApiError(httpStatus.NOT_FOUND, 'tax Not Found!!');
    }

    const updatedDetails = {
      state: payload.state,
      tax: payload.tax ? parseFloat(payload.tax) : undefined,
    };

    const updatedTax = await transactionClient.tax.update({
      where: {
        taxId,
      },
      data: updatedDetails,
    });

    return updatedTax;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
  }

  return result;
};

const deleteTax = async (taxId: string): Promise<Tax> => {
  if (!taxId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'taxId is required');
  }

  const result = await prisma.tax.delete({
    where: {
      taxId,
    },
  });

  return result;
};

export const TaxService = {
  addTax,
  getTax,
  updateTax,
  deleteTax,
};
