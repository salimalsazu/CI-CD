import React from "react";
import Image from "next/image";

interface PaymentMethodPaypalProps {
  setPaymentMethod: (method: string) => void;
  paymentMethod: string;
}

const PaymentMethodPaypal: React.FC<PaymentMethodPaypalProps> = ({
  setPaymentMethod,
  paymentMethod,
}) => {
  return (
    <div>
      <div
        className={`${
          paymentMethod == "paypal"
            ? "h-auto opacity-100 bg-[#F4F4F4] p-6 border rounded-b-md border-t-0 transition-all"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <p>
          {` After clicking "Pay with PayPal", you will be redirected
                to PayPal to complete your purchase securely.`}
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodPaypal;
