/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Testimonial, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ITestimonialFilterRequest, ITestimonialRequest, ITestimonialUpdateRequest } from './testimonial.interface';
import { IUploadFile } from '../../../interfaces/file';

import { Request } from 'express';
import { errorLogger } from '../../../shared/logger';
import { TestimonialRelationalFields, TestimonialRelationalFieldsMapper, TestimonialSearchableFields } from './testimonial.constants';

// modules
// !----------------------------------Create New Category--------------------------------------->>>
const addTestimonial = async (req: Request): Promise<Testimonial> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);
  if (!filePath) throw new ApiError(httpStatus.BAD_REQUEST, 'Client Image is required');

  const data = req.body as ITestimonialRequest;

  const newObj = {
    clientName: data.clientName,
    testimonialTitle: data.testimonialTitle,
    testimonialDescription: data.testimonialDescription,
    rating: data.rating,
    clientImage: filePath,
  };

  const result = await prisma.testimonial.create({
    data: newObj,
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Testimonial creation failed');

  return result;
};

// !----------------------------------get all Category---------------------------------------->>>
const getTestimonial = async (filters: ITestimonialFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Testimonial[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.TestimonialWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: TestimonialSearchableFields.map((field: any) => ({
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
        if (TestimonialRelationalFields.includes(key)) {
          return {
            [TestimonialRelationalFieldsMapper[key]]: {
              clientName: (filterData as any)[key],
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
  const whereConditions: Prisma.TestimonialWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.testimonial.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.testimonial.count({
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

// !----------------------------------Update category---------------------------------------->>>
const updateTestimonial = async (testimonialId: string, req: Request): Promise<Testimonial> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);
  const { clientName, testimonialTitle, testimonialDescription, rating, oldFilePath } = req.body as ITestimonialUpdateRequest;
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

  const updatedDetails: Partial<ITestimonialUpdateRequest> = {
    clientName,
    testimonialTitle,
    testimonialDescription,
    rating,
    clientImage: filePath,
  };

  // Updated data from request
  const newData: Partial<ITestimonialUpdateRequest> = { ...updatedDetails };

  const result = await prisma.testimonial.update({
    where: {
      testimonialId,
    },
    data: newData,
  });

  return result;
};

const deleteTestimonial = async (testimonialId: string): Promise<Testimonial> => {
  if (!testimonialId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Testimonial Id is required');
  }

  const result = await prisma.testimonial.delete({
    where: {
      testimonialId,
    },
  });

  return result;
};

export const TestimonialService = {
  addTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
