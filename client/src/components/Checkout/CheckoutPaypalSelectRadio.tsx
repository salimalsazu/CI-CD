"use client";
import Image from "next/image";
import paypalLogo from "../../../public/images/checkout/checkout-paypal.svg";

const CheckoutPaypalSelectRadio = ({
  paymentMethod,
  setPaymentMethod,
}: any) => {
  return (
    <div
      className={`relative border py-6 cursor-pointer ${
        paymentMethod == "paypal" && "border-black bg-[#F4F4F4]"
      }`}
      onClick={() => setPaymentMethod("paypal")}
    >
      <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 justify-between w-full items-center pl-5">
        <div className="flex items-center">
          <input
            onClick={() => setPaymentMethod("paypal")}
            type="radio"
            // name="paymentMethod"
            // id="paypal"
            className="w-5 h-5 text-red-500 cursor-pointer"
            checked={paymentMethod == "paypal"}
          />
          <label
            className="cursor-pointer pl-3"
            htmlFor="paypal"
            onClick={() => setPaymentMethod("paypal")}
          >
            Paypal
          </label>
        </div>
        <div className="flex items-center pr-3">
          <Image
            className="w-20 h-20"
            src={paypalLogo}
            alt="Paypal Logo"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaypalSelectRadio;
