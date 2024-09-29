"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getClientUrl } from "@/config/envConfig";
import { useCreateOrderMutation } from "@/redux/api/features/orders/orderApi";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdatePaymentIntentMutation } from "@/redux/api/features/payment/stripePaymentApi";

interface StripeCheckoutFormProps {
  setIsStripeLoading: (loading: boolean) => void;
  intentId: string;
  amountToPaid: number;
}

const StripeCheckoutForm = forwardRef(
  (
    { setIsStripeLoading, intentId, amountToPaid }: StripeCheckoutFormProps,
    ref
  ) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const cart = useSelector((state: any) => state.cart.cart);
    const [updatePaymentIntent, {}] = useUpdatePaymentIntentMutation();
    const [createOrder, { data: createdOrderData }] = useCreateOrderMutation();
    const { getValues } = useFormContext(); // Access form data

    // Function to handle payment confirmation
    const handlePaymentConfirmation = async (orderId: string) => {
      if (!stripe || !elements) {
        setMessage("Stripe.js or Elements not loaded");
        return { success: false, error: "Stripe.js or Elements not loaded" };
      }

      try {
        const { error } = await stripe.confirmPayment({
          elements,

          confirmParams: {
            return_url: `${getClientUrl()}/payment-done/${orderId}`,
          },
        });

        if (error) {
          setMessage(error.message || "An unexpected error occurred.");
          return { success: false, error: error.message };
        }

        setMessage("Payment successful!");
        return { success: true };
      } catch (err) {
        setMessage("An error occurred while processing the payment.");
        return {
          success: false,
          error: "An error occurred while processing the payment.",
        };
      }
    };

    // Function to handle order creation and payment process
    const handleChildSubmit = async () => {
      if (!stripe || !elements) {
        return { success: false, error: "Stripe.js or Elements not loaded" };
      }

      setIsStripeLoading(true);

      try {
        // update intent
        await updatePaymentIntent({
          intentId,
          amountToPaid,
        });

        // Creating new order
        let orderId = createdOrderData?.data?.orderId || "";
        const orderData = getValues();
        if (!orderId) {
          const createdOrder = await createOrder({
            cart,
            deliveryInfo: orderData,
          }).unwrap();
          orderId = createdOrder?.data?.orderId || "";
        } else {
          await createOrder({
            cart,
            deliveryInfo: orderData,
          }).unwrap();
        }
        //
        // Confirming payment
        const result = await handlePaymentConfirmation(orderId);

        return result;
      } catch (err) {
        setMessage("An error occurred while processing the order.");
        return {
          success: false,
          error: "An error occurred while processing the order.",
        };
      } finally {
        setIsStripeLoading(false);
      }
    };

    // Expose the handleChildSubmit function to the parent component
    useImperativeHandle(ref, () => ({
      handleChildSubmit,
    }));

    return (
      <div>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        {message && <div id="payment-message">{message}</div>}
      </div>
    );
  }
);

// Set display name for debugging purposes
StripeCheckoutForm.displayName = "StripeCheckoutForm";

export default StripeCheckoutForm;
