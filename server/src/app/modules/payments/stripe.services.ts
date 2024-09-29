/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { errorLogger } from '../../../shared/logger';

/**
 * Creates a PayPal order for processing payment.
 */

// This is your test secret API key.
const stripe = new Stripe(config.stripe_secret_key);

class StripePaymentProcessor {
  private static intentObject = {
    amount: 0.0,
    currency: 'usd',
    payment_method_types: ['card'],
  };

  private static fixAmountToTwoDecimal = (amount: number) => {
    return parseFloat((Math.ceil(amount * 100) / 100).toFixed(2));
  };

  static createPaymentIntent = async (amountToPaid: number) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        ...this.intentObject,
        amount: this.getAmountInCentsFromDollar(this.fixAmountToTwoDecimal(amountToPaid)),
      });

      if (!paymentIntent?.client_secret) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get client secret from Stripe!!!');
      }

      return {
        jsonResponse: { clientSecret: paymentIntent.client_secret, intentId: paymentIntent.id },
        httpStatusCode: 201,
      };
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get client secret from Stripe!!!');
    }
  };

  // update intent
  static updatePaymentIntent = async (intentId: string, amountToPaid: number) => {
    try {
      const paymentIntent = await stripe.paymentIntents.update(intentId, {
        amount: this.getAmountInCentsFromDollar(this.fixAmountToTwoDecimal(amountToPaid)),
      });

      if (!paymentIntent?.client_secret) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get client secret from Stripe!!!');
      }

      return {
        jsonResponse: { clientSecret: paymentIntent.client_secret },
        httpStatusCode: 201,
      };
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get client secret from Stripe!!!');
    }
  };

  static retrieveStripePaymentInfo = async (paymentIntentId: string) => {
    const paymentIntentInfo = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntentInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment information retribution failed!!!');
    }
    return {
      jsonResponse: paymentIntentInfo,
      httpStatusCode: 200,
    };
  };
  static retrieveStripePaymentChargeInfo = async (chargeId: any) => {
    const paymentIntentInfo = await stripe.charges.retrieve(chargeId);
    if (!paymentIntentInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment Charge information retribution failed!!!');
    }
    return {
      jsonResponse: paymentIntentInfo,
      httpStatusCode: 200,
    };
  };
  static getAmountInCentsFromDollar = (amount: number): number => {
    // Multiply by 100 in last cause, Stripe receive payment in cents
    return amount * 100;
  };
  static getAmountInDollarsFromCents = (amount: number): number => {
    //  by 100 in last cause, Stripe receive payment in cents
    return amount / 100;
  };
  // generating payment report
  static generatePaymentReport = async (chargeId: string | any, retrievedPaymentInfo: any, orderId: string): Promise<any> => {
    const otherData = {
      netAmount: 0,
      fee: 0,
      totalAmount: 0,
      amountPaid: 0,
    };

    if (chargeId) {
      try {
        // Retrieve Stripe charge info
        const { jsonResponse: jsonChargeResponse } = await StripePaymentProcessor.retrieveStripePaymentChargeInfo(chargeId);
        const { balance_transaction, amount, amount_captured } = jsonChargeResponse || {};

        // Retrieve Stripe balance transaction
        const balanceTransaction = await stripe.balanceTransactions.retrieve(balance_transaction as string);

        // Extract financial details
        otherData['netAmount'] = StripePaymentProcessor.getAmountInDollarsFromCents(balanceTransaction?.net);
        otherData['fee'] = StripePaymentProcessor.getAmountInDollarsFromCents(balanceTransaction?.fee);
        otherData['totalAmount'] = StripePaymentProcessor.getAmountInDollarsFromCents(amount);
        otherData['amountPaid'] = StripePaymentProcessor.getAmountInDollarsFromCents(amount_captured);

        // Log error if there's a mismatch in amounts
        if (otherData.amountPaid !== otherData.totalAmount) {
          errorLogger.error(`Stripe payment mismatch: amount paid (${otherData.amountPaid}) does not match total amount (${otherData.totalAmount}).`);
        }
      } catch (error) {
        errorLogger.error('Error retrieving payment info from Stripe: ', error);
      }
    } else {
      otherData['totalAmount'] = StripePaymentProcessor.getAmountInDollarsFromCents(retrievedPaymentInfo?.amount);
      otherData['amountPaid'] = StripePaymentProcessor.getAmountInDollarsFromCents(retrievedPaymentInfo?.amount_received);
    }

    return {
      gateWay: 'STRIPE',
      status: retrievedPaymentInfo.status,
      totalAmountToPaid: otherData?.totalAmount,
      totalAmountPaid: otherData?.amountPaid,
      currency: retrievedPaymentInfo.currency,
      gateWayFee: otherData?.fee,
      netAmount: otherData?.netAmount,
      gateWayTransactionId: retrievedPaymentInfo.id,
      gateWayTransactionTime: new Date(retrievedPaymentInfo.created).toISOString(),
      orderId,
    };
  };
}

export default StripePaymentProcessor;
