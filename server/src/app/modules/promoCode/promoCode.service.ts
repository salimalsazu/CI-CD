/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BuyItemGetItemPromotion, Prisma, Promotion } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { IPromoFilterRequest } from './promoCode.interface';
import { PromoCodeRelationalFields, PromoCodeRelationalFieldsMapper, PromoCodeSearchableFields } from './promoCode.constants';
import { getDateISODateWithoutTimestamp } from '../../../shared/utils';
// modules

// !----------------------------------Update Courier---------------------------------------->>>
const updatePromotion = async (promotionId: string, promotionInfo: any, buyItemGetItemPromotionInfo: any): Promise<Promotion> => {
  const result = await prisma.$transaction(async transactionClient => {
    const dataToUpdate = {
      ...promotionInfo,
    };
    if (promotionInfo.startDate) dataToUpdate['startDate'] = promotionInfo.startDate;
    if (promotionInfo.endDate) dataToUpdate['endDate'] = promotionInfo.endDate;
    if (buyItemGetItemPromotionInfo) {
      dataToUpdate['buyItemGetItemPromotion'] = {
        update: {
          ...buyItemGetItemPromotionInfo,
        },
      };
    }

    const updatedData = transactionClient.promotion.update({
      where: { promotionId: promotionId },
      data: dataToUpdate,
    });
    return updatedData;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
  }

  return result;
};

const updateBuyItemGetItemPromotion = async (promotionId: string, infoToUpdate: any): Promise<BuyItemGetItemPromotion> => {
  try {
    const updatedInfo = prisma.buyItemGetItemPromotion.update({
      where: { promotionId: promotionId },
      data: infoToUpdate,
    });
    return updatedInfo;
  } catch (err) {
    console.log('Error in updateBuyItemGetItemPromotion service: ', err);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update the info!');
  }
};

// Create a promotion
const createPromotion = async (promotionInfo: any, buyItemGetItemPromotion: any): Promise<any> => {
  try {
    const result = await prisma.$transaction(async transactionClient => {
      const promotionData = {
        ...promotionInfo,
        // startDate: new Date(promotionInfo.startDate).toISOString(),
        // endDate: new Date(promotionInfo.endDate).toISOString(),
        buyItemGetItemPromotion: {
          create: buyItemGetItemPromotion,
        },
      };

      console.log('promotionInfo', promotionInfo);

      const promotion = await transactionClient.promotion.create({ data: promotionData });
      return promotion;
    });

    return { promotion: result };
  } catch (err) {
    console.log('Error in create promotion service:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create promotion!');
  }
};

const deletePromotion = async (promotionId: string): Promise<Promotion> => {
  try {
    const result = await prisma.promotion.delete({
      where: { promotionId },
    });
    return result;
  } catch (err) {
    console.log('Error in delete promo service: ', err);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to remove the Promotion!');
  }
};

const getPromotions = async (filters: IPromoFilterRequest, options: IPaginationOptions): Promise<any> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PromotionWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...PromoCodeSearchableFields.map((field: any) => ({
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
        if (PromoCodeRelationalFields.includes(key)) {
          return {
            [PromoCodeRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.PromotionWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const promotions = await prisma.promotion.findMany({
    where: whereConditions,
    include: {
      buyItemGetItemPromotion: {
        select: {
          rewardItem: true,
          rewardQuantity: true,
          requiredItem: true,
          requiredQuantity: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching for pagination
  const total = await prisma.promotion.count({
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
    data: { promotions: promotions },
  };
};

const applyPromoCode = async (promoCode: string, cartData: any) => {
  const currentDate = new Date(getDateISODateWithoutTimestamp(new Date())).toISOString();
  // console.log(currentDate);
  const promotion = await prisma.promotion.findUnique({
    where: {
      promoCode: promoCode,
      isActive: true,
      startDate: {
        lte: currentDate,
      },
      endDate: {
        gte: currentDate,
      },
      // buyItemGetItemPromotion: {
      //   requiredItemId: purchasedItemId,
      //   requiredQuantity: purchasedQuantity,
      // },
    },
    select: {
      buyItemGetItemPromotion: true,
    },
  });

  if (!promotion) {
    return {
      isValid: false,
    };
  }
  console.log(promotion);
  // @ts-ignore
  const { requiredItemId = '', rewardItemId = '', rewardQuantity = 0, requiredQuantity = 0 } = promotion.buyItemGetItemPromotion;
  const cartItem = cartData?.find((item: any) => item.productId === requiredItemId && item.quantity >= requiredQuantity);
  if (!cartItem) {
    return { isValid: false };
  }

  // Calculate how many will get as free
  const quantityWillGet: number = Math.floor(cartItem.quantity / requiredQuantity) * rewardQuantity;

  const product = await prisma.productVariation.findFirst({
    where: {
      productId: rewardItemId,
      // stock: {
      //   gte: quantityWillGet,
      // },
    },
    include: {
      product: {
        select: {
          productName: true,
        },
      },
    },
  });

  return {
    isValid: true,
    product: product,
    quantity: quantityWillGet,
  };
};

const isExist = async (promoCode: string) => {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { promoCode: promoCode },
    });
    return promotion ? { isExist: true } : { isExist: false };
  } catch (err) {
    console.log('Error in isExist service: ', err);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to check existance of promo code!');
  }
};
export const PromoCodeService = {
  createPromotion,
  updatePromotion,
  updateBuyItemGetItemPromotion,
  deletePromotion,
  getPromotions,
  applyPromoCode,
  isExist,
};
