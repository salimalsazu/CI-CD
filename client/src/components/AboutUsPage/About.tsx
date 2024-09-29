/* eslint-disable @next/next/no-img-element */
import React from "react";
import ConnectYourWay from "../HomePage/ConnectYourWay";

const About = () => {
  return (
    <div className="py-10 md:pt-20">
      <div className="flex flex-col gap-4">
        <div className="w-full md:mb-0 mb-8">
          <div className="relative  md:mr-0 w-full">
            <div className="relative overflow-hidden rounded-7xl">
              <img
                src="https://i.ibb.co/RgM98D5/Pet-Profile-Maple-Image.webp"
                alt=""
                className="relative z-10 object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center pt-12">
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <span className="inline-block mb-4 text-sm font-semibold leading-none text-red-500 capitalize  ">
                Safety made simple & stylish
              </span>
              <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-5xl">
                About Us
              </h2>
            </div>
            <div className="text-center">
              <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg">
                E.T. Phone Home is a female-founded company dedicated to
                creating innovative and stylish safety wearables.
              </p>
              <h2 className="mb-6 text-xl font-semibold leading-tight tracking-tight text-gray-900   md:text-2xl">
                Our Product range includes:
              </h2>
              <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg">
                <strong>Backup Buddy:</strong> Bands designed for kids aged
                3-11, offering simple and easy-to-wear safety bands.
              </p>
              <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg">
                <strong>Active:</strong> Suitable for ages 3 and up, these bands
                are the strongest of the strong, adjustable, and perfect for
                active lifestyles.
              </p>
              <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg">
                <strong>I.C.E (In Case of Emergency):</strong> With a focus on
                fashion and tailored for ages 12+, these bands provide essential
                information for those dead phone, lost phone, no phone moments.
                Perfect for travellers, college students and people experiencing
                dementia.
              </p>
              <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg">
                We are committed to innovation and excellence, continuously
                working on new improving quality and developing designs and
                utilities to ensure safety and peace of mind for all. Join us on
                our journey to a safer, more connected world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
