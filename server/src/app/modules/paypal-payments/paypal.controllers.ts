/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PaypalService } from './paypal.services';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createPaypalController = catchAsync(async (req: Request, res: Response) => {
  const { paymentData, cartData } = req.body;

  const payment = await PaypalService.createPaypalPayment(paymentData, cartData);

  // Extract the approval URL for redirecting the user to PayPal
  const approvalUrl = payment?.links?.find((link: any) => link.rel === 'approve').href;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment created successfully!',
    data: {
      id: payment?.id,
      approvalUrl,
    },
  });
});

const capturePaypalController = catchAsync(async (req: Request, res: Response) => {
  const orderID = req.body;
  console.log('id', req.body);
  const paymentReport = await PaypalService.capturePaypalOrder(orderID);
  console.log('paymentReport', paymentReport);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment captured successfully!',
    data: paymentReport,
  });
});

export const PaypalController = {
  createPaypalController,
  capturePaypalController,
};
