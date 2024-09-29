import { PaymentGateway } from '@prisma/client';

export type IStripePaymentReqData = {
  //
  gateWay: PaymentGateway;
  status: string;
  totalAmountToPaid: number;
  totalAmountPaid: number;
  currency: string;
  gateWayFee: number;
  netAmount: number;
  gateWayTransactionId: string;
  transactionCreatedTime: string;
  orderId: string;
};
export type IPaymentData = {
  paymentPlatformId: string;
  gateWayTransactionTime?: string;
  paymentStatus?: string;
  amountToPay?: number;
  amountPaid?: number;
  currency?: string;
  platformFee?: number;
  netAmount?: number;
  refundLink?: string;
  payerName?: string;
  payerEmailAddress?: string;
  paymentPlatform: PaymentGateway;
  transactionCreatedTime?: string;
};
