"use client";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/features/userApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { Button, Drawer, Form, Notification, useToaster } from "rsuite";

const PasswordSettingDrawer = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: any;
}) => {
  const { data } = useGetMyProfileQuery({});

  // !
  type IUpdatePassword = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<IUpdatePassword>();

  //! submit
  const [
    updateMyProfile,
    {
      data: updatedResData,
      isLoading,
      isSuccess,
      isError,
      error,
      reset: resetReq,
    },
  ] = useUpdateMyProfileMutation();

  const handleUpdateName = async (updatedData: IUpdatePassword) => {
    await updateMyProfile({
      data: {
        password: updatedData?.currentPassword,
        newPassword: updatedData?.newPassword,
      },
    });
  };

  // ! side effect
  const toaster = useToaster();

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold">Password Updated</h4>
        </Notification>,
        { placement: "bottomStart", duration: 2000 }
      );
      handleClose();
      formReset();
      resetReq();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Update"
            }
          </h4>
        </Notification>,
        { placement: "bottomStart", duration: 4000 }
      );
    }
  }, [
    error,
    formReset,
    handleClose,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    toaster,
  ]);

  return (
    <div>
      <Drawer
        placement="bottom"
        size="md"
        backdrop="static"
        open={isOpen}
        onClose={handleClose}
        closeButton={false}
      >
        <Drawer.Body className=" max-md:!w-full max-md:!p-3">
          <div className="w-full lg:max-w-2xl   mx-auto ">
            {/* header */}
            <div className="flex justify-between items-center px-4 py-1 md:py-2">
              <div className="max-md:hidden"></div>
              <div className="flex-grow text-center">
                <h2 className="text-2xl font-bold text-pure_black">
                  Edit Password
                </h2>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    formReset();
                    resetReq();
                  }}
                  className="p-1.5 rounded-full duration-300 transition-all
                hover:text-red-600 hover:bg-gray-200"
                >
                  <IoClose size={25} />
                </button>
              </div>
            </div>
            {/* content */}
            <div>
              <form onSubmit={handleSubmit(handleUpdateName)}>
                <div className="space-y-5">
                  {/* Current Password */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      Current Password
                    </label>
                    <div className="w-full">
                      <Controller
                        name="currentPassword"
                        rules={{
                          required: "Current Password is Required !",
                        }}
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              name="currentPassword"
                              type="password"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Enter First Name..."
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.currentPassword &&
                                  !!errors?.currentPassword?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.currentPassword?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      New Password
                    </label>
                    <div className="w-full">
                      <Controller
                        name="newPassword"
                        rules={{
                          required: "New Password is Required !",
                        }}
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              name="newPassword"
                              type="password"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Enter New Password..."
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.newPassword &&
                                  !!errors?.newPassword?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.newPassword?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      Confirm Password
                    </label>
                    <div className="w-full">
                      <Controller
                        name="confirmPassword"
                        rules={{
                          required: "Confirm Password is Required !",
                          validate: (value) =>
                            value === watch("newPassword") ||
                            "Passwords do not match!",
                        }}
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              name="confirmPassword"
                              type="password"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Confirm password..."
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
                </div>

                {/* submit handler */}
                <div className="mt-12">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    size="lg"
                    className="!bg-primary/90 duration-300 transition-all hover:!bg-primary !text-white !shadow-xl !font-bold !rounded-lg"
                    block
                  >
                    {isLoading ? (
                      <h2 className="flex  justify-center items-center gap-4">
                        Updating Password{" "}
                        <span className="animate-spin">
                          <ImSpinner9 />
                        </span>{" "}
                      </h2>
                    ) : (
                      "Edit Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default PasswordSettingDrawer;
