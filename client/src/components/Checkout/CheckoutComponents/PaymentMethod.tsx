import Image from "next/image";
import paypalLogo from "../../../../public/images/checkout/checkout-paypal.svg";
import { useState } from "react";
import { useGetClientSecretMutation } from "@/redux/api/features/payment/stripePaymentApi";
import StripeCheckoutForm from "@/components/paymentGateway/stripe/StripeCheckoutForm";
import PaymentMethodStripe from "./PaymentMethodStripe";
import PaymentMethodPaypal from "./PaymentMethodPaypal";

interface PaymentMethodProps {
  amountToPaid: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ amountToPaid }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <>
      <div className="mt-5">
        <h3 className="font-bold text-xl">PAYMENT METHOD</h3>
        <p className="text-sm text-gray-500 mb-3 mt-1">
          All transactions are secure and encrypted.
        </p>
        <section>
          <PaymentMethodStripe
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
            amountToPaid={amountToPaid}
          />
          <PaymentMethodPaypal
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
          />
        </section>
      </div>
    </>
  );
};

export default PaymentMethod;
