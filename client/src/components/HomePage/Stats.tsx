import React from "react";
import { MdOutlinePayment, MdSubscriptions } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";

const Stats = () => {
  return (
    <div className="py-8  font-[sans-serif] text-[#333] border-[1px] rounded-3xl border-primary my-4 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center flex-col md:flex-row flex justify-start items-center gap-4 md:mb-0 mb-10">
          <MdOutlinePayment className="text-5xl" />
          <div className="text-center md:text-start">
            <p className="text-black font-semibold text-xl">Flexible Payment</p>
            <p className="text-gray-500 text-lg">One Time Payment</p>
          </div>
        </div>
        <div className="text-center flex-col md:flex-row flex justify-start items-center gap-4 md:mb-0 mb-10">
          <MdSubscriptions className="text-5xl" />
          <div className="text-center md:text-start">
            <p className="text-black font-semibold text-xl">Subscription</p>
            <p className="text-gray-500 text-lg">
              No Subscription Or Ongoing Fees
            </p>
          </div>
        </div>
        <div className="text-center flex-col md:flex-row flex justify-start items-center gap-4">
          <FaShippingFast className="text-5xl" />
          <div className="text-center md:text-start">
            <p className="text-black font-semibold text-xl">Shipping</p>
            <p className="text-gray-500 text-lg">Free Shipping On All Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
