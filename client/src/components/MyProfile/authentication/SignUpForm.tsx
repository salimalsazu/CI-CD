"use client";

import { storeUserInfo } from "@/hooks/services/auth.service";
import { useRegistrationMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Notification, useToaster } from "rsuite";

type ISignUp = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUp>();
  // submit and register
  const [registration, { data, isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();

  const handleSignUp = async (registerData: any) => {
    const res: any = await registration({ data: registerData }).unwrap();

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
          <h4 className="font-semibold ">
            {data?.message || "Successfully Signed Up"}
          </h4>
        </Notification>,
        { placement: "topEnd", duration: 2000 }
      );
      router.push("/my-account");
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Register"
            }
          </h4>
        </Notification>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [data?.message, error, isError, isLoading, isSuccess, router, toaster]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="max-w-lg w-full mx-auto"
      >
        <div className="mb-12 text-center">
          <h3 className="text-black md:text-3xl text-2xl font-extrabold text-center">
            Register
          </h3>
          <p className="text-slate-500 pt-2">
            Create your E.T Phone Home Account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="space-y-3 md:space-y-5"
        >
          {/* First Name */}
          <div>
            <label className="text-md block mb-2">First Name</label>
            <div className="w-full">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="firstName"
                      type="text"
                      className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                      placeholder="Enter Full Name..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.firstName && !!errors?.firstName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.firstName?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          {/* last Name */}
          <div>
            <label className="text-md block mb-2">Last Name</label>
            <div className="w-full">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="lastName"
                      type="text"
                      className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                      placeholder="Enter Full Name..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.lastName && !!errors?.lastName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.lastName?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-md block mb-2">Email</label>
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
          <div>
            <label className="text-md block mb-2">Password</label>
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
          {/* Confirm Password */}
          <div>
            <label className="text-md block mb-2">Confirm Password</label>
            <div className="w-full">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm is Required !!",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match!",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <input
                      {...field}
                      name="confirmPassword"
                      type="password"
                      className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                      placeholder="Enter Confirm Password"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.confirmPassword &&
                          !!errors?.confirmPassword?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.confirmPassword?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
        </form>
        {/* handle submit */}
        <div className="mt-12 text-center">
          <Button
            loading={isLoading}
            block
            type="submit"
            className="w-full !py-2.5 !px-8 !text-lg !font-bold !rounded-lg !bg-primary/90 hover:!bg-primary !text-white  !shadow-lg focus:!outline-none"
          >
            Sign Up
          </Button>
          <div className="my-8 flex max-md:flex-col justify-center items-center gap-5 ">
            <p className="font-medium text-xl">
              <span>Have an account already? </span>
              <Link
                href="/sign-in"
                className="underline text-primary font-bold "
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
