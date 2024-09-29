/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardService } from './dashboard.service';

// !----------------------------------get all Hall---------------------------------------->>>
const getTotalCount = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getTotalCount();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Count fetched successfully',
    data: result,
  });
});

export const DashboardController = {
  getTotalCount,
};
