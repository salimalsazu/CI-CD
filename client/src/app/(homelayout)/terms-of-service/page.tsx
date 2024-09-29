import React from "react";

const TermsOfService = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Terms of Services
        </h2>

        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          The product can personalize user experiences by understanding
          individual preferences and tailoring recommendations or content based
          on user behavior and historical data.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
