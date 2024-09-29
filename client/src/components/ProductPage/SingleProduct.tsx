/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React from "react";
import productImage from "../../../public/images/shop/SIngleProudct/Pink_Grey_2048x_c8757b05-6f3c-49eb-8eba-ce8b94695ac3.webp";
import productImage2 from "../../../public/images/shop/SIngleProudct/Screenshot_130.png";
import EasilyAccessible from "../HomePage/TotalControl";
import ConnectYourWay from "../HomePage/ConnectYourWay";
import { useGetSingleProductQuery } from "@/redux/api/features/productApi";
import { fileUrlKey } from "@/helpers/config/envConfig";

const SingleProduct = ({ params }: any) => {
  console.log(params, "params");
  const { data, isLoading } = useGetSingleProductQuery(params?.categoryHref, {
    skip: !params?.categoryHref,
  });
  const singleProduct = data?.data;
  console.log(singleProduct, "singleProduct");
  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 bg-[#F5F5F7] py-20">
        <Image
          src={`${fileUrlKey()}/${singleProduct?.productImage}`}
          width={100}
          height={100}
          alt=""
          className="py-10 w-2/7"
        />
        <span className="inline-block mb-4 text-sm md:text-3xl font-semibold leading-none text-primary capitalize  ">
          Access
        </span>
        <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-7xl">
          Lose your knack <br /> for losing things.
        </h2>
      </div>
      <div className="text-center px-4 py-24">
        <p className="mb-6 text-2xl font-semibold tracking-tight text-gray-900   max-w-3xl leading-9 mx-auto">
          AirTag is a supereasy way to keep track of your stuff. <br /> Attach
          one to your keys, slip another in your backpack. And just like that,
          they’re on your radar in the Find My app, where you can also track
          down your Apple devices and keep up with friends and family.
        </p>
        <h2 className="mb-6 text-gray-500 text-2xl font-semibold leading-tight tracking-tight   ">
          Starting at $29
        </h2>
        <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg">
          Buy
        </button>
      </div>
      <div className="pb-20  ">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="w-full md:w-1/2 md:mb-0 mb-8">
            <div className="relative  md:mr-0 w-full">
              <div className="relative overflow-hidden rounded-7xl">
                <img
                  src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                  alt=""
                  className="relative z-10 object-cover w-full h-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:mb-0 mb-8">
            <div className="relative  md:mr-0 w-full">
              <div className="relative overflow-hidden rounded-7xl">
                <img
                  src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                  alt=""
                  className="relative z-10 object-cover w-full h-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-4  py-20">
        <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
          Access
        </span>
        <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
          Let the search party begin.
        </h2>
        <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto pt-4 pb-20 text-center">
          iOS 17 lets you share AirTag with up to five people. So items that
          everyone uses — like an umbrella, a bike, or the family car keys — can
          be tracked by friends and family.
        </p>
        <img
          src="https://i.ibb.co/qr3vnph/share-airtag-cg30tsedr8pe-large.jpg"
          alt=""
        />
      </div>
      <EasilyAccessible />
      <div className="flex flex-col justify-center items-center px-4  py-20">
        <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
          Access
        </span>
        <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
          More color. More fun. More you.
        </h2>
        <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto pt-4 text-center">
          It’s easy to attach AirTag to just about anything with colorful key
          rings and loops from Apple. AirTag comes individually or in a 4 pack.
          Happy tagging.
        </p>
        <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
          Buy
        </button>
        <img
          src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
          alt=""
          className="w-full"
        />
      </div>
      <ConnectYourWay />
    </>
  );
};

export default SingleProduct;
