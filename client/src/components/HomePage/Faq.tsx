import Link from "next/link";
import React from "react";

const Faq = () => {
  return (
    <div className="relative mx-auto w-full py-16 px-5 font-sans text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24">
      <h2 className="mb-5 text-center font-sans text-4xl sm:text-5xl font-bold">
        Frequently asked Questions
      </h2>
      <p className="mb-12 text-center text-lg text-gray-600">
        We have written down answers to some of the frequently asked questions.
        But, if you still have any queries, feel free to ping us on chat.
      </p>
      <ul className="space-y-4">
        <li className="text-left">
          <label
            htmlFor="accordion-1"
            className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
          >
            <input
              className="peer hidden"
              type="checkbox"
              id="accordion-1"
              checked
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
              <h3 className="text-sm text-gray-600 lg:text-base">
                Is there a free trial with Appsy?
              </h3>
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
              <div className="p-5">
                <p className="text-sm">
                  Lorem ipsum, consectetur adipisicing elit. Adipisci eligendi,
                  recusandae voluptatum distinctio facilis necessitatibus
                  aperiam ut? Dolor mollitia modi aliquam, non sint at
                  reprehenderit commodi dignissimos quo unde asperiores officiis
                  quos laboriosam similique nihil.
                </p>
              </div>
            </div>
          </label>
        </li>

        <li className="text-left">
          <label
            htmlFor="accordion-2"
            className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
          >
            <input className="peer hidden" type="checkbox" id="accordion-2" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
              <h3 className="text-sm text-gray-600 lg:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit?
              </h3>
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
              <div className="p-5">
                <p className="text-sm">
                  Lorem ipsum, <b>dolor sit amet</b> consectetur adipisicing
                  elit. Adipisci eligendi, recusandae voluptatum distinctio
                  facilis necessitatibus aperiam ut? Dolor mollitia modi
                  aliquam, non sint at reprehenderit commodi dignissimos quo
                  unde asperiores officiis quos laboriosam similique nihil.
                </p>
              </div>
            </div>
          </label>
        </li>

        <li className="text-left">
          <label
            htmlFor="accordion-3"
            className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
          >
            <input className="peer hidden" type="checkbox" id="accordion-3" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
              <h3 className="text-sm text-gray-600 lg:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio.?
              </h3>
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
              <div className="p-5">
                <p className="text-sm">
                  Lorem ipsum, <b>dolor sit amet</b> consectetur adipisicing
                  elit. Adipisci eligendi, recusandae voluptatum distinctio
                  facilis necessitatibus aperiam ut? Dolor mollitia modi
                  aliquam, non sint at reprehenderit commodi dignissimos quo
                  unde asperiores officiis quos laboriosam similique nihil.
                </p>
              </div>
            </div>
          </label>
        </li>

        <li className="text-left">
          <label
            htmlFor="accordion-4"
            className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
          >
            <input className="peer hidden" type="checkbox" id="accordion-4" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
              <h3 className="text-sm text-gray-600 lg:text-base">
                Lorem ipsum dolor sit amet.?
              </h3>
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
              <div className="p-5">
                <p className="text-sm">
                  Lorem ipsum, <b>dolor sit amet</b> consectetur adipisicing
                  elit. Adipisci eligendi, recusandae voluptatum distinctio
                  facilis necessitatibus aperiam ut? Dolor mollitia modi
                  aliquam, non sint at reprehenderit commodi dignissimos quo
                  unde asperiores officiis quos laboriosam similique nihil.
                </p>
              </div>
            </div>
          </label>
        </li>
      </ul>
      <div className="mt-20 flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500 "
        >
          Still have questions?
        </Link>
      </div>
    </div>
  );
};

export default Faq;
