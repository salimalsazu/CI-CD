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

const NameSettingDrawer = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: any;
}) => {
  const { data } = useGetMyProfileQuery({});

  // !
  type IUpdateName = {
    firstName?: string;
    lastName?: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateName>();

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

  const handleUpdateName = async (updatedData: IUpdateName) => {
    await updateMyProfile({
      data: {
        firstName: updatedData?.firstName,
        lastName: updatedData?.lastName,
      },
    });
  };

  // ! side effect
  const toaster = useToaster();

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold ">Name Updated</h4>
        </Notification>,
        { placement: "bottomStart", duration: 2000 }
      );
      handleClose();
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
        { placement: "bottomCenter", duration: 2000 }
      );
    }
  }, [error, handleClose, isError, isLoading, isSuccess, resetReq, toaster]);

  return (
    <div>
      <Drawer
        backdrop="static"
        placement="bottom"
        open={isOpen}
        onClose={handleClose}
        closeButton={false}
      >
        <Drawer.Body className=" max-md:!w-full max-md:!p-3">
          <div className="w-full md:max-w-2xl   mx-auto ">
            {/* header */}
            <div className="flex justify-between items-center px-4 py-1 md:py-2">
              <div className="max-md:hidden"></div>
              <div className="flex-grow text-center">
                <h2 className="text-2xl font-bold text-pure_black">
                  Edit Name
                </h2>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={handleClose}
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
                  {/* first Name */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      First Name
                    </label>
                    <div className="w-full">
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              defaultValue={data?.data?.profile?.firstName}
                              name="firstName"
                              type="text"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Enter First Name..."
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.firstName &&
                                  !!errors?.firstName?.message) ||
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

                  {/* Last Name */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      Last Name
                    </label>
                    <div className="w-full">
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              defaultValue={data?.data?.profile?.lastName}
                              name="lastName"
                              type="text"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Enter First Name..."
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.lastName &&
                                  !!errors?.lastName?.message) ||
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
                        Updating Name{" "}
                        <span className="animate-spin">
                          <ImSpinner9 />
                        </span>{" "}
                      </h2>
                    ) : (
                      "Edit Name"
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

export default NameSettingDrawer;
