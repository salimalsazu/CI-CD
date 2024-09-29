/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PromoCodeFilterableFields } from './promoCode.constants';
import { PromoCodeService } from './promoCode.service';

// !----------------------------------get all Hall---------------------------------------->>>
// const getPromotion = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, PromoCodeFilterableFields);

//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

//   const result = await PromoCodeService.getPromotions(filters, options);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// !----------------------------------Update Slot---------------------------------------->>>
const updatePromotion = catchAsync(async (req: Request, res: Response) => {
  const { promotionId } = req.params;
  const { buyItemGetItemPromotionInfo, ...promotionInfo } = req.body;

  const result = await PromoCodeService.updatePromotion(promotionId, promotionInfo, buyItemGetItemPromotionInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

const deletePromotion = catchAsync(async (req: Request, res: Response) => {
  const { promotionId } = req.params;
  const result = await PromoCodeService.deletePromotion(promotionId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

const applyPromoCode = catchAsync(async (req: Request, res: Response) => {
  const { promoCode } = req.params;
  const { cartData } = req.body;
  const result = await PromoCodeService.applyPromoCode(promoCode, cartData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promotion applied successfully !',
    data: result,
  });
});

const createPromotion = catchAsync(async (req: Request, res: Response) => {
  const { buyItemGetItemPromotion, ...promotionInfo } = req.body;
  const result = await PromoCodeService.createPromotion(promotionInfo, buyItemGetItemPromotion);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Created successfully !',
    data: result,
  });
});

const getPromotions = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PromoCodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PromoCodeService.getPromotions(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Extracted successfully !',
    data: result,
  });
});

const isExist = catchAsync(async (req: Request, res: Response) => {
  const { promoCode } = req.params;

  const result = await PromoCodeService.isExist(promoCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checking Successful !',
    data: result,
  });
});







export const PromoCodeController = {
  createPromotion,
  updatePromotion,
  deletePromotion,
  getPromotions,
  applyPromoCode,
  isExist,
};
