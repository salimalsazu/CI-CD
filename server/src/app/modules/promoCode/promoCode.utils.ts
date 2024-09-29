import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IQARequest } from '../productQA/productQA.interface';

export const productQAValidation = async (data: IQARequest) => {
  if (!data.productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Id is required');
  }

  const isProductExist = await prisma.product.findUnique({
    where: {
      productId: data.productId,
    },
  });

  if (!isProductExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  if (!data.answer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Answer is required');
  }

  if (!data.question) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question is required');
  }
};
