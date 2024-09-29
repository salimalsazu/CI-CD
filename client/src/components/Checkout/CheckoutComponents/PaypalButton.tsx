// components/PayPalButton.js
"use client";
import { useCreatePaymentMutation } from "@/redux/api/features/paypal/paypalApi";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

const PayPalButton = ({ addCapture }: any) => {
  const [createPayment] = useCreatePaymentMutation();

  const { payAmount, cart } = useSelector((state: any) => state.cart);

  // console.log("Pay amount", payAmount, cart);

  const { getValues, trigger } = useFormContext();
  // const initialOptions = {
  //   clientId:
  //     "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
  //   currency: "USD",
  //   intent: "capture",
  //   components: "buttons",
  // };
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
        currency: "USD",
        intent: "capture",
        components: "buttons",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "pill",
          label: "pay",
        }}
        fundingSource="paypal" // This ensures only PayPal button is shown
        createOrder={async (data: any, actions: any) => {
          // Validate form data
          const isValid = await trigger();
          console.log("Is valid", isValid);
          // Access form data
          const cartDataObj = getValues();

          //Call your server to set up the transaction

          const cartData = {
            ...cartDataObj,
            cart: cart,
          };

          if (isValid) {
            try {
              const paymentData = {
                price: payAmount?.subtotal,
                currency: "USD",
                quantity: 1,
              };

              const response = await createPayment({
                paymentData,
                cartData,
              }).unwrap();

              if (response && response?.data) {
                // Return PayPal order ID
                return response?.data?.id;
              } else {
                console.error("Unexpected response structure:", response);
                throw new Error("Failed to create order");
              }
            } catch (error) {
              console.error("Error creating PayPal order:", error);
              throw error;
            }
          }
        }}
        onApprove={async (data, actions) => {
          // Call your server to finalize the transaction
          const dataObj = {
            orderID: data?.orderID,
          };

          // console.log("Data obj", dataObj);

          try {
            const confirmResponse = await addCapture(dataObj);

            if (confirmResponse && confirmResponse.data) {
              const orderData = confirmResponse.data;

              const errorDetail =
                Array.isArray(orderData.details) && orderData.details[0];

              if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              }

              if (errorDetail) {
                let msg = "Sorry, your transaction could not be processed.";
                if (errorDetail.description)
                  msg += "\n\n" + errorDetail.description;
                if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
                return alert(msg);
              }

              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
              const transaction =
                orderData.purchase_units[0].payments.captures[0];
              alert(
                "Transaction " +
                  transaction.status +
                  ": " +
                  transaction.id +
                  "\n\nSee console for all available details"
              );

              if (transaction.status === "COMPLETED") {
                // Use your Next.js router to navigate if required
                // router.push("/");
              }
            } else {
              console.error("Unexpected response structure:", confirmResponse);
            }
          } catch (error) {
            console.error("Error confirming PayPal payment:", error);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
