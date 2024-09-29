/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Prisma, Blogs } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';
import { Request } from 'express';
import { errorLogger } from '../../../shared/logger';
import { IAddRequest, IBlogUpdateRequest, ITestimonialFilterRequest } from './blogs.interface';
import { updateCategoryData } from './blogs.utils';
import { BlogRelationalFields, BlogRelationalFieldsMapper, BlogSearchableFields } from './blogs.constants';

// modules
// !----------------------------------Create New Blog--------------------------------------->>>
const AddNewBlog = async (req: Request): Promise<Blogs> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);
  if (!filePath) throw new ApiError(httpStatus.BAD_REQUEST, 'Blog Image is required');

  const others = req.body as IAddRequest;
  // Replace spaces with dashes in categoryName
  const titleWithTimestamp = `${others?.title.replace(/[,\s&]+/g, '-').toLowerCase()}-${Date.now()}`;

  const result = await prisma.blogs.create({
    data: {
      blogHref: titleWithTimestamp,
      blogImage: filePath,
      ...others,
    },
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Blog creation failed');

  return result;
};

// !----------------------------------get all Category---------------------------------------->>>
const getAllBlogs = async (filters: ITestimonialFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Blogs[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.BlogsWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: BlogSearchableFields.map((field: any) => ({
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
        if (BlogRelationalFields.includes(key)) {
          return {
            [BlogRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.BlogsWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.blogs.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.blogs.count({
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

// !----------------------------------Update Blog---------------------------------------->>>
const updateBlog = async (blogId: string, req: Request): Promise<Blogs> => {
  const file = req?.file as IUploadFile;
  const filePath = file?.path?.substring(8);
  const others = req?.body as IBlogUpdateRequest;

  const result = await prisma.$transaction(async transactionClient => {
    //

    const isExistBlog = await transactionClient.blogs.findUnique({
      where: {
        blogId,
      },
    });

    if (!isExistBlog) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Blog Not Found !!');
    }

    // Updated data from request

    const allLatestData: any = {
      ...others,
      blogImage: filePath,
    };

    if (others.title) {
      allLatestData['blogHref'] = `${others?.title.replace(/[,\s&]+/g, '-').toLowerCase()}-${Date.now()}`;
    }

    const newData = await updateCategoryData(allLatestData);

    const res = await transactionClient.blogs.update({
      where: {
        blogId,
      },
      data: newData,
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Update Failed !!');
    }

    // if new file added , deleting old file
    // Deleting old  Image
    if (filePath !== undefined || filePath !== null) {
      const oldFilePaths = 'uploads/' + isExistBlog.blogImage;

      // @ts-ignore
      fs.unlink(oldFilePaths, err => {
        if (err) {
          errorLogger.error('Error deleting old file');
        }
      });
    }
    return res;
  });

  return result;
};

// !----------------------------------get single blog for dashboard---------------------------------------->>>
const getSingleBlogById = async (blogId: string): Promise<Blogs> => {
  const result = await prisma.$transaction(async transactionClient => {
    //

    const res = await transactionClient.blogs.findUnique({
      where: {
        blogId,
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Blog Not Found !!');
    }

    return res;
  });

  return result;
};
// !----------------------------------Update Blog---------------------------------------->>>
const getSingleBlogByHref = async (blogHref: string): Promise<Blogs> => {
  const result = await prisma.$transaction(async transactionClient => {
    //

    const res = await transactionClient.blogs.findUnique({
      where: {
        blogHref,
      },
      include: {
        _count: true,
        comments: true,
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Blog Not Found !!');
    }

    return res;
  });

  return result;
};

// ! delete blog
const deleteBlog = async (blogId: string): Promise<Blogs> => {
  if (!blogId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog Id is required');
  }

  const isExistBlog = await prisma.blogs.findUnique({
    where: {
      blogId,
    },
  });
  if (!isExistBlog) throw new ApiError(httpStatus.NOT_FOUND, 'Blog Not Found');

  const result = await prisma.blogs.delete({
    where: {
      blogId,
    },
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Delete');

  if (result) {
    const oldFilePaths = 'uploads/' + isExistBlog.blogImage;

    fs.unlink(oldFilePaths, err => {
      if (err) {
        errorLogger.error('Error deleting old file');
      }
    });
  }

  return result;
};

export const BlogService = {
  AddNewBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlogById,
  getSingleBlogByHref,
};
