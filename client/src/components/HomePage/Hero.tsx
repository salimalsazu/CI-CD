import React from "react";

const Hero = () => {
  return (
    <section className="overflow-hidden homePageBg bg-cover bg-top bg-no-repeat">
      <div className="bg-black/25  py-24">
        <div className=" p-8 md:p-40 lg:px-[10%] ">
          <div className="text-center">
            <h2 className="md:text-6xl font-bold text-white text-3xl pb-2 md:pb-2">
              Connection you can tap into,
            </h2>
            <h2 className="md:text-6xl font-bold text-white text-3xl pb-2 md:pb-2">
              Anytime, Anywhere
            </h2>

            <p className="text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed text-center">
              The smallest and easiest safety wearable on the market
            </p>

            <div className="mt-4 sm:mt-8">
              <button
                type="button"
                className="items-center rounded-full justify-center px-8 py-3  border-white border-2 hover:border-primary duration-300 transition-all text-white  hover:text-gray-100 hover:bg-primary "
              >
                Get Yours Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
