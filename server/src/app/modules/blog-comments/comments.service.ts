/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Comments } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICommentFilterRequest, ICommentRequest } from './comments.interface';
import { CommentsRelationalFields, CommentsRelationalFieldsMapper, CommentsSearchableFields } from './comments.constants';

// modules
// !----------------------------------Create New Category--------------------------------------->>>
const addComment = async (payload: ICommentRequest, blogHref: string): Promise<Comments> => {
  //
  const result = await prisma.$transaction(async transactionClient => {
    //
    const isExistBlog = await transactionClient.blogs.findUnique({
      where: {
        blogHref,
      },
    });

    if (!isExistBlog) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Blog not Found !!');
    }
    //  create

    const res = await transactionClient.comments.create({
      data: {
        ...payload,
        blog: {
          connect: {
            blogHref,
          },
        },
      },
    });
    if (!res) throw new ApiError(httpStatus.NOT_FOUND, 'Failed To Comment !!');
    return res;
  });

  return result;
};

// !----------------------------------get all Category---------------------------------------->>>
const getAllComments = async (filters: ICommentFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Comments[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.CommentsWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: CommentsSearchableFields.map((field: any) => ({
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
        if (CommentsRelationalFields.includes(key)) {
          return {
            [CommentsRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.CommentsWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.comments.findMany({
    where: whereConditions,
    include: {
      blog: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.comments.count({
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
// ! delete comment
const deleteComment = async (commentId: string): Promise<Comments> => {
  if (!commentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment Id is required');
  }

  const result = await prisma.comments.delete({
    where: {
      commentId,
    },
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Delete');

  return result;
};
// ! get single blogs comments
const getSingleComment = async (blogHref: string) => {
  const result = await prisma.blogs.findUnique({
    where: {
      blogHref,
    },
    select: {
      blogHref: true,
      blogId: true,
      _count: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Blog Not Found');

  return result;
};

export const CommentService = {
  addComment,
  getAllComments,
  deleteComment,
  getSingleComment,
};
