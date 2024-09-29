/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import StripePaymentProcessor from './stripe.services';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from '../orders/orders.service';
import PaymentReportService from '../paymentReport/payment.services';

/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */

class StripeController {
  private static orderCreationSuccessMessage = 'Order creation successful!!!';
  private static orderCreationFailedMessage = 'Order creation failed!!!';

  /**
   * Handles payment for an order.
   */
  static createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { amountToPaid } = req.body;

    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.createPaymentIntent(amountToPaid);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? StripeController.orderCreationSuccessMessage : StripeController.orderCreationFailedMessage,
      data: {
        ...jsonResponse,
        //  orderId: order.orderId
      },
    });
  });
  static updatePaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { intentId, amountToPaid } = req.body;

    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.updatePaymentIntent(intentId, amountToPaid);
    // const orderData = {
    //   ...deliveryInfo,
    //   cartItems: cart,
    // };
    // const order = await OrderService.createOrder(orderData);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? StripeController.orderCreationSuccessMessage : StripeController.orderCreationFailedMessage,
      data: {
        ...jsonResponse,
        //  orderId: order.orderId
      },
    });
  });

  static retrieveStripePaymentInformation = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    // Retrieve the Payment Intent
    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.retrieveStripePaymentInfo(paymentIntentId);
    // updating order details
    const updatedOrderData = OrderService.updateOrder(orderId);
    // Get the latest charge ID from the Payment Intent
    const chargeId = jsonResponse?.latest_charge;
    const paymentReport = await StripePaymentProcessor.generatePaymentReport(chargeId, jsonResponse, orderId);
    // Create payment report in the database
    await PaymentReportService.createPaymentReport(paymentReport);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: 'Payment information successfully retrieved!!!',
      data: updatedOrderData,
    });
  });

  /**
   * Generates a payment report based on PayPal API response data.
   */
}

export default StripeController;
