/* eslint-disable @next/next/no-img-element */
import React from "react";

const HeroSection = () => {
  return (
    <div className="py-10 md:py-20  ">
      <div className="flex flex-col-reverse md:flex-row items-center ">
        <div className="w-full  md:w-1/2">
          <span className="inline-block mb-4 text-sm font-semibold leading-none text-red-500 capitalize  ">
            Connection you can tap into
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-5xl">
            Anytime, Anywhere
          </h2>
          <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg">
            The smartest and easiest safety wearable on the market So simple a
            toddler can use it
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 text-gray-100 bg-blue-600 rounded-md shadow hover:text-gray-100 hover:bg-blue-500 "
          >
            Get started
          </a>
        </div>
        <div className="w-full md:px-4 md:w-1/2 md:mb-0 mb-8">
          <div className="relative mx-auto md:mr-0 max-w-max">
            <div className="relative overflow-hidden rounded-7xl">
              <img
                src="https://i.postimg.cc/52GLntwd/pexels-lukas-590022.jpg"
                alt=""
                className="relative z-10 object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
