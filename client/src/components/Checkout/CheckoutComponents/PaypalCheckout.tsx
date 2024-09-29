"use client";

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ createPayment, addCapture }: any) => {
  const initialOptions: any = {
    "client-id":
      "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G", // Replace with your PayPal Client ID
    currency: "USD",
    intent: "capture",
    components: "buttons", // Include 'buttons' component here
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        fundingSource="paypal" //only for paypal button show
        style={{
          color: "blue",
          shape: "pill",
          label: "pay",
          height: 40,
        }}
        createOrder={async (data: any, actions: any) => {
          // Call your server to set up the transaction
          try {
            const paymentObj = {
              price: 100,
              currency: "USD",
              quantity: 1,
            };

            const response = await createPayment(paymentObj);

            if (response && response.data) {
              // Return PayPal order ID
              return response.data?.data?.id;
            } else {
              console.error("Unexpected response structure:", response);
              throw new Error("Failed to create order");
            }
          } catch (error) {
            console.error("Error creating PayPal order:", error);
            throw error;
          }
        }}
        onApprove={async (data: any, actions: any) => {
          console.log("Approving payment...", data.orderID);

          const dataObj = {
            orderID: data.orderID,
          };
          // Call your server to finalize the transaction
          try {
            const confirmResponse = await addCapture(dataObj);

            if (confirmResponse && confirmResponse.data) {
              const orderData = confirmResponse.data;

              console.log("Confirm response", orderData);
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
