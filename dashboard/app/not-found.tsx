/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div>
      <section className="flex items-center h-screen bg-gray-200 font-poppins dark:bg-gray-900">
        <div className="max-w-6xl px-1 mx-auto lg:px-6 ">
          <div className="justify-center">
            <div className="flex flex-wrap items-center ">
              <div className="w-full px-2 lg:px-4 lg:w-2/4 lg:mb-0 lg:py-0 py-7">
                <div className="text-center lg:text-left">
                  <h1 className="inline-block mb-8 font-semibold text-gray-800 text-7xl lg:text-9xl dark:text-gray-400">
                    Oops!
                  </h1>
                  <h2 className="mb-8 text-2xl font-semibold text-gray-700 lg:text-4xl dark:text-gray-400">
                    404 Page not found
                  </h2>
                  <p className="mb-8 text-xl text-gray-700 dark:text-gray-400">
                    Sorry! we are unable to find the page that you are looking
                    for...
                  </p>
                  <div className="flex flex-wrap items-center justify-start">
                    <Link
                      href="/"
                      className="w-full px-8 py-4 mb-8 mr-0 text-base font-medium text-white uppercase bg-primary rounded-full lg:w-auto hover:bg-red-800 lg:mb-0 lg:mr-4 md:w-full "
                    >
                      Return Home
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden w-full mb-12 lg:block lg:w-2/4 lg:mb-0">
                <img
                  src="https://i.postimg.cc/dt0HXw8J/pexels-mikhail-nilov-7534104.jpg"
                  alt=""
                  className="relative inset-0 object-cover w-full h-2/4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
