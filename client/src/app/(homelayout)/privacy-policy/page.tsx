import { PrivacyPolicyAllData } from "@/components/privacy-policy/PrivacyPolicyData";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Privacy Policy
        </h2>
        <p className="text-gray-500 font-bold">Last Updated: May 22, 2024 </p>
      </div>

      <div className="mt-5">
        <p className=" text-muted-foreground text-2xl leading-7 uppercase font-bold">
          At E.T. Phone Home Bands, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, share, and protect your information when you visit
          our website or make a purchase.
        </p>
      </div>

      {/* Data mapping */}
      <div className="mt-5">
        {PrivacyPolicyAllData.map((data: any, index: any) => (
          <div key={index}>
            <div className="my-3">
              <h1 className="text-xl font-bold">{data.title}</h1>
              <ul className="text-lg flex flex-col gap-2 mt-2">
                {data.content.map((content: any, index: any) => (
                  <li className="indent-10" key={index}>
                    - {content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
