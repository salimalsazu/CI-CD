/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICategoryFilterRequest, ICategoryRequest, ICategoryUpdateRequest } from './category.interface';
import { IUploadFile } from '../../../interfaces/file';
import { CategoryRelationalFields, CategoryRelationalFieldsMapper, CategorySearchableFields } from './category.constants';
import { Request } from 'express';
import { errorLogger } from '../../../shared/logger';
import { getDynamicHref, updateCategoryData } from './category.utils';

// modules
// !----------------------------------Create New Category--------------------------------------->>>
const addCategory = async (req: Request): Promise<Category> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);
  if (!filePath) throw new ApiError(httpStatus.BAD_REQUEST, 'Category Image is required');

  const data = req.body as ICategoryRequest;

  // Replace spaces with dashes in categoryName
  const newCategoryHref = getDynamicHref(data?.categoryName);

  const newCategory = {
    categoryName: data?.categoryName,
    description: data?.description,
    categoryImage: filePath,
    categoryHref: newCategoryHref,
  };

  const result = await prisma.$transaction(async transactionClient => {
    // Check if category name exists or if category href exists
    const isExistCategoryName = await transactionClient.category.findFirst({
      where: {
        OR: [
          {
            categoryName: data?.categoryName,
          },
          {
            categoryHref: newCategoryHref,
          },
        ],
      },
    });

    if (isExistCategoryName) throw new ApiError(httpStatus.BAD_REQUEST, 'Category Name or Href Already Exists, Try a new one!');

    const createdCategory = await transactionClient.category.create({
      data: newCategory,
    });

    return createdCategory;
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Category creation failed');

  return result;
};

// !----------------------------------get all Category---------------------------------------->>>
const getCategory = async (filters: ICategoryFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Category[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.CategoryWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: CategorySearchableFields.map((field: any) => ({
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
        if (CategoryRelationalFields.includes(key)) {
          return {
            [CategoryRelationalFieldsMapper[key]]: {
              categoryName: (filterData as any)[key],
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
  const whereConditions: Prisma.CategoryWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.category.findMany({
    include: {
      product: {
        where: {
          productStatus: 'AVAILABLE',
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.category.count({
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

// !----------------------------------get Single Courier---------------------------------------->>>
const getSingleCategory = async (categoryHref: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      categoryHref: categoryHref,
    },
    include: {
      product: true,
      _count: true,
    },
  });

  console.log(result);

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Category Not Found!!');

  return result;
};

// !----------------------------------Update category---------------------------------------->>>
const updateCategory = async (categoryId: string, req: Request): Promise<Category> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);
  const { categoryName, description, oldFilePath } = req.body as ICategoryUpdateRequest;
  const oldFilePaths = 'uploads/' + oldFilePath;

  // Deleting old style Image
  if (oldFilePath !== undefined && filePath !== undefined) {
    // @ts-ignore
    fs.unlink(oldFilePaths, err => {
      if (err) {
        errorLogger.error('Error deleting old file');
      }
    });
  }

  const updatedDetails: Partial<ICategoryUpdateRequest> = {
    categoryName,
    description,
    categoryImage: filePath,
  };

  if (categoryName) updatedDetails['categoryHref'] = getDynamicHref(categoryName);

  // Updated data from request
  const newCategoryData: Partial<ICategoryUpdateRequest> = updateCategoryData(updatedDetails);

  const result = await prisma.$transaction(async transactionClient => {
    // Check if category exists
    const existingCategory = await transactionClient.category.findUnique({
      where: {
        categoryId,
      },
    });
    if (!existingCategory) throw new ApiError(httpStatus.NOT_FOUND, 'Category Not Found!!');

    // Check if the updated category name exists
    if (categoryName) {
      const isExistCategoryName = await prisma.category.findFirst({
        where: {
          categoryName,
          NOT: {
            categoryId: {
              equals: categoryId,
            },
          },
        },
      });
      if (isExistCategoryName) throw new ApiError(httpStatus.BAD_REQUEST, 'Category Name Already Exists, Try a new one!');
    }

    const updatedCategory = await transactionClient.category.update({
      where: {
        categoryId,
      },
      data: newCategoryData,
    });

    return updatedCategory;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update');
  }

  return result;
};

const deleteCategory = async (categoryId: string): Promise<Category> => {
  if (!categoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Id is required');
  }

  const result = await prisma.category.delete({
    where: {
      categoryId,
    },
  });

  return result;
};

export const CategoryService = {
  addCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
