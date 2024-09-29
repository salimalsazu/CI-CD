import SignInForm from "@/components/MyProfile/authentication/SignInForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | E.T. Phone Home",
};

const SignInPage = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center lg:py-0 py-5">
      <div className="w-full lg:w-1/2 px-4 lg:p-0">
        <SignInForm />
      </div>
      <div className="w-full lg:w-1/2 min-h-[90vh] lg:flex flex-col justify-center items-center overflow-hidden bg-[url(https://i.ibb.co/QcHxCT2/h1-rev-img-11a.jpg)] bg-cover bg-top bg-no-repeat hidden ">
        <div className="text-center pt-12">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white pt-8 text-center">
            Welcome!
          </h2>
          <p className="pt-4 text-white font-semibold">
            Create your E.T.Phone Home Tag account.
          </p>
        </div>
        <div className="pt-12">
          <p className="text-xl mt-8 text-white">
            {`Don't have an account yet?`}
            <Link
              href="/sign-up"
              className="hover:underline ml-1 w-full py-2.5 px-8 text-sm font-semibold rounded-full bg-transparent hover:bg-primary text-white border focus:outline-none"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
