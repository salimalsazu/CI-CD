import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import PaymentReportService from './payment.services';

class PaymentReportController {

  static createPaymentReport = catchAsync(async (req: Request, res: Response) => {
    const { paymentInfo } = req.body;
    const { jsonResponse, httpStatusCode } = await PaymentReportService.createPaymentReport(paymentInfo);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: true,
      data: jsonResponse,
    });
  });

  static getPaymentReport = catchAsync(async (req: Request, res: Response) => {
    const { paymentId } = req.params;
    const { jsonResponse, httpStatusCode } = await PaymentReportService.getPaymentReport(paymentId);
    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: 'Payment information successfully retrived!!!',
      data: jsonResponse,
    });
  });

  static getPaymentReports = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentId } = req.body;
    // const userId = (req.user as IRequestUser).userId;

    const { jsonResponse, httpStatusCode } = await PaymentReportService.getPaymentReports(paymentId, orderId);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: 'Payment information successfully retrived!!!',
      data: jsonResponse,
    });
  });
}

export default PaymentReportController;
