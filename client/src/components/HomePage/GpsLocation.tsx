/* eslint-disable @next/next/no-img-element */
import React from "react";

const GpsLocation = () => {
  return (
    <div className="md:pb-20">
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
        <div className="w-full  md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center px-4 py-6">
            {/* <span className="inline-block mb-4 text-sm font-semibold leading-none text-red-500 capitalize  ">
              LOCATION
            </span> */}
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-5xl text-center">
              GPS Location Sharing Made Easy.
            </h2>
            <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg text-center">
              With an Easy Tap share GPS location to any contact listed on your
              profile. Zero risk of hacking and tracking.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500 "
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpsLocation;
