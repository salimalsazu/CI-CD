"use client";

import { storeUserInfo } from "@/hooks/services/auth.service";
import { useUserLoginMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Message, Notification, useToaster } from "rsuite";

type ISignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ISignUp>();
  // submit
  const [userLogin, { data, isLoading, isSuccess, isError, error }] =
    useUserLoginMutation();

  const handleSignIn = async (registerData: any) => {
    const res = await userLogin({ data: registerData }).unwrap();

    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };
  // ! side effect
  const toaster = useToaster();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold ">{"Successfully Logged In"}</h4>
        </Notification>,
        { placement: "bottomStart", duration: 2000 }
      );
      router.push("/my-account");
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Login"
            }
          </h4>
        </Notification>,
        { placement: "bottomCenter", duration: 2000 }
      );
    }
  }, [data?.message, error, isError, isLoading, isSuccess, router, toaster]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="max-w-lg w-full mx-auto"
      >
        <div className="mb-12 text-center">
          <h3 className="text-black md:text-3xl text-2xl font-extrabold text-center">
            Login
          </h3>
          <p className="text-slate-500 pt-2">Welcome Back :)</p>
        </div>

        {/* Email */}

        <div className="mt-10">
          <label className="text-xs block mb-2">Email</label>
          <div className="w-full">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <input
                    {...field}
                    name="email"
                    type="text"
                    className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter Email..."
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.email && !!errors?.email?.message) || false
                    }
                    placement="topEnd"
                  >
                    <span className="font-semibold">
                      {errors?.email?.message}
                    </span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-10">
          <label className="text-xs block mb-2">Password</label>
          <div className="w-full">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is Required !!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <input
                    {...field}
                    name="password"
                    type="password"
                    className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.password && !!errors?.password?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span className="font-semibold">
                      {errors?.password?.message}
                    </span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            loading={isLoading}
            block
            type="submit"
            className="w-full !py-2.5 !px-8 !text-sm !font-semibold !rounded !bg-primary hover:!bg-blue-600 !text-white  !shadow-lg focus:!outline-none"
          >
            Login
          </Button>
          <p className="text-sm md:text-xl my-8 md:hidden block">
            {`Don't`} have an account?{" "}
            <Link
              href="/sign-up"
              className="text-sm md:text-xl hover:underline w-full  font-semibold  text-black"
            >
              Register Here
            </Link>
          </p>
        </div>
      </form>
      {/*  */}
      <div className="flex justify-center py-10">
        <h2 className="flex gap-3 items-center text-xl ">
          <p className="font-medium">{`Don't`} have an account yet?</p>
          <Link
            href="/sign-up"
            className="underline text-primary font-semibold "
          >
            Register here
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default SignInForm;
