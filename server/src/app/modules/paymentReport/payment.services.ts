/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IStripePaymentReqData, IPaymentData } from './payment.interfaces';

class PaymentReportService {
  static createPaymentReport = async (paymentReport: IStripePaymentReqData): Promise<any> => {
    const { gateWay, status, totalAmountPaid, totalAmountToPaid, gateWayFee, gateWayTransactionId, ...others } = paymentReport || {};

    const paymentData: IPaymentData = {
      paymentPlatformId: gateWayTransactionId,
      paymentPlatform: gateWay,
      paymentStatus: status,
      amountPaid: totalAmountPaid,
      amountToPay: totalAmountToPaid,
      platformFee: gateWayFee,
      ...others,
    };

    try {
      const newPayment = await prisma.paymentReport.create({
        data: paymentData,
      });

      if (!newPayment) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create payment!!!');
      }

      return {
        jsonResponse: newPayment,
        httpStatusCode: 201,
      };
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create payment!!!');
    }
  };

  static getPaymentReport = async (paymentId: string) => {
    const paymentReport = await prisma.paymentReport.findUnique({
      where: { paymentPlatformId: paymentId },
    });
    if (!paymentReport) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment information retrieve failed!!!');
    }
    return {
      jsonResponse: paymentReport,
      httpStatusCode: 200,
    };
  };

  static getPaymentReports = async (paymentId: string, orderId: string) => {
    const paymentsInfo = await prisma.paymentReport.findMany({
      where: {
        paymentPlatformId: paymentId,
        orderId: orderId,
      },
    });
    if (!paymentsInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment information retrivation failed!!!');
    }
    return {
      jsonResponse: paymentsInfo,
      httpStatusCode: 200,
    };
  };
}

export default PaymentReportService;
