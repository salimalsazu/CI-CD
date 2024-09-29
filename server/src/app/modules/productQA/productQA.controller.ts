/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { QAService } from './productQA.service';
import { QAFilterableFields } from './productQA.constants';

// !----------------------------------Create New Hall---------------------------------------->>>
const addQAController = catchAsync(async (req: Request, res: Response) => {
  const result = await QAService.addQA(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QA Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getQAController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, QAFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await QAService.getQA(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All QA fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updateQA = catchAsync(async (req: Request, res: Response) => {
  const { productQaId } = req.params;
  const payload = req.body;
  const result = await QAService.updateQA(productQaId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product QA Updated successfully !',
    data: result,
  });
});

const deleteQA = catchAsync(async (req: Request, res: Response) => {
  const { productQaId } = req.params;
  const result = await QAService.deleteQA(productQaId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QA Deleted successfully !',
    data: result,
  });
});

export const QAController = {
  addQAController,
  getQAController,
  updateQA,
  deleteQA,
};
