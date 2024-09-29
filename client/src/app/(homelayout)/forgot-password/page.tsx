import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:py-0 py-5">
      <div className="w-full md:w-1/2 px-4 md:p-0">
        <form className="max-w-lg w-full mx-auto">
          <div className="mb-12 text-center">
            <h3 className="text-black md:text-3xl text-2xl font-extrabold text-center">
              Reset Passwords
            </h3>
            <p className="text-slate-500 pt-2">
              Use that email when you registered
            </p>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                className="w-full bg-transparent text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              className="w-full py-2.5 px-8 text-sm font-semibold rounded bg-primary hover:bg-blue-600 text-white border focus:outline-none"
            >
              Reset Password
            </button>
            <p className="text-sm md:text-xl my-8 md:hidden block">
              Have an account already?{" "}
              <Link
                href="/sign-in"
                className="text-sm md:text-xl hover:underline ml-1 w-full py-2.5 px-8 border-primary font-semibold rounded-full text-black hover:bg-primary hover:text-white border focus:outline-none"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 min-h-[90vh] md:flex flex-col justify-center items-center overflow-hidden bg-[url(https://i.ibb.co/QcHxCT2/h1-rev-img-11a.jpg)] bg-cover bg-top bg-no-repeat hidden ">
        {/* <div className="flex justify-center items-center bg-black">
          <Image
            // className="w-[350px] object-cover "
            src={logo}
            width={110}
            height={110}
            alt=""
          />
        </div> */}
        <div className="text-center pt-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white pt-8 text-center">
            Welcome!
          </h2>
          <p className="pt-4 text-white font-semibold">
            Create your E.T.Phone Home Tag account.
          </p>
        </div>
        <div className="pt-12">
          <p className="text-xl mt-8 text-white">
            Have an account already?{" "}
            <Link
              href="/sign-in"
              className="hover:underline ml-1 w-full py-2.5 px-8 text-sm font-semibold rounded-full bg-transparent hover:bg-primary text-white border focus:outline-none"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
