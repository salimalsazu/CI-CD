"use client";
import Image from "next/image";
import myPetImage from "../../../../public/images/myaccount/mypet.png";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { GiGps } from "react-icons/gi";

const KidDetailsPreview = () => {
  return (
    <div className="my-10 md:max-w-2xl md:mx-auto">
      <div className="bg-primary px-10 pt-10 md:pb-20 flex justify-center items-center">
        <div className="bg-white inline-block p-2 rounded-full">
          <Image
            className="rounded-full"
            src={myPetImage}
            width={150}
            height={150}
            alt="pet pic"
          />
        </div>
      </div>
      <div className="bg-white border -mt-10 rounded-tl-[26px] rounded-tr-[26px]">
        <div className="flex flex-col justify-center items-center p-4 z-20">
          <div className="md:pt-2 pt-10">
            <h2 className="text-3xl font-bold">Kid name</h2>
          </div>
          <div>
            <h2>Age: 5 years</h2>
          </div>
        </div>
        <div></div>
        {/* kid emergency contact info */}
        <div className="flex justify-between items-center md:gap-6">
          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <div>
              <button className="px-3 py-1.5 bg-[#A1D7F3] rounded-full text-2xl font-extrabold text-[#6BB4DA]">
                D
              </button>
            </div>
            <div>
              <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                Dad
              </h2>
              <a className="text-sm md:text-base text-gray-600 md:block hidden">
                +1 (555) 555-5555
              </a>
            </div>
          </div>

          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <button className="bg-primary p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <FiPhone className="text-2xl text-white" />
            </button>
            <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <AiOutlineMessage className="text-2xl text-white" />
            </button>
            <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <GiGps className="text-2xl text-white" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center md:gap-6">
          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <div>
              <button className="px-3 py-1.5 bg-[#A1D7F3] rounded-full text-2xl font-extrabold text-[#6BB4DA]">
                D
              </button>
            </div>
            <div>
              <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                Mom
              </h2>
              <h2 className="text-sm md:text-base text-gray-600 md:block hidden">
                +1 (555) 555-5555
              </h2>
            </div>
          </div>

          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <button className="bg-primary p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <FiPhone className="text-2xl text-white" />
            </button>

            <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <AiOutlineMessage className="text-2xl text-white" />
            </button>
            <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <GiGps className="text-2xl text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidDetailsPreview;
