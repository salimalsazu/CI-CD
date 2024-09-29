import React from "react";
import { MdOutlineSubscriptions } from "react-icons/md";
import { TbCalendarDollar, TbAsteriskSimple } from "react-icons/tb";
import { RiFileWarningFill, RiWeightLine } from "react-icons/ri";
import { FaAppStore } from "react-icons/fa";
import { GiWaterDivinerStick } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { SiAdguard } from "react-icons/si";
import { CgViewComfortable } from "react-icons/cg";

const OurFeatures = () => {
  return (
    <section className="pb-20">
      <div className="max-w-6xl mx-auto font-[sans-serif] text-[#333]">
        <h2 className="sm:text-4xl text-2xl font-extrabold text-center mb-16">
          Features You Care About
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-2">
          {" "}
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <MdOutlineSubscriptions className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              NO Subscriptions
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Tailor our product to suit
              your needs.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <TbCalendarDollar className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              NO Charging Ever
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Your data is protected by the latest security measures.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <RiFileWarningFill className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">NO EMFs</h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs 24/7 customer support for
              all your inquiries.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <FaAppStore className="w-8 mb-4 inline-block text-4xl" />

            <h3 className="text-sm md:text-base font-semibold mb-2">
              NO Apps Required
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Experience blazing-fast performance with our product.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <TbAsteriskSimple className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              NO Hacking & Tracking Risks
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Expand your reach with our
              global network.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <GiWaterDivinerStick className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              Hypo-allergenic
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Seamless communication for
              your team.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <IoWaterOutline className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              Waterproof
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Seamless communication for
              your team.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <SiAdguard className="w-8 mb-4 inline-block text-4xl" />

            <h3 className="text-sm md:text-base font-semibold mb-2">Durable</h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Seamless communication for
              your team.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <CgViewComfortable className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              Comfortable
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Seamless communication for
              your team.
            </p> */}
          </div>
          <div className="p-6 md:p-10 bg-[#f8f8f88e] hover:bg-gray-100 rounded-md text-center m-1">
            <RiWeightLine className="w-8 mb-4 inline-block text-4xl" />
            <h3 className="text-sm md:text-base font-semibold mb-2">
              Feather Light Weight
            </h3>
            {/* <p className="text-gray-500 text-sm">
              Tailor our product to suit your needs Seamless communication for
              your team.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;
