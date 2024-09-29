"use client";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/features/userApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Notification,
  useToaster,
} from "rsuite";

const PhoneNumberSettingDrawer = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: any;
}) => {
  const { data } = useGetMyProfileQuery({});

  // !
  type IMobileNumberUpdate = {
    mobileNumber: string;
    isSubscribeToGetNotification: string;
    approvePrivacyPolicy: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IMobileNumberUpdate>();

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

  const handleUpdateMobileNumber = async (updatedData: any) => {
    await updateMyProfile({
      data: {
        mobileNumber: updatedData?.mobileNumber,
      },
    });
  };

  // ! side effect
  const toaster = useToaster();

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold">Phone Number Updated</h4>
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
        size="lg"
        backdrop="static"
        placement="bottom"
        open={isOpen}
        onClose={handleClose}
        closeButton={false}
      >
        <Drawer.Body className=" max-md:!w-full max-md:!p-3">
          <div className="w-full md:max-w-2xl   mx-auto ">
            {/* header */}
            <div>
              <div className="flex justify-between items-center px-4 py-1 md:py-2">
                <div className="max-md:hidden"></div>
                <div className="flex-grow text-center">
                  <h2 className="text-2xl font-bold text-pure_black">
                    Edit Phone Number
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
              <div className="text-center mb-5">
                <p className="text-[#877f9d] text-sm font-medium">
                  {`Enter your phone number to receive notification alerts when your
                pet's ByteTag is scanned.`}
                </p>
              </div>
            </div>
            {/* content */}
            <div>
              <form onSubmit={handleSubmit(handleUpdateMobileNumber)}>
                <div className="space-y-5">
                  {/* Phone Number */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      Phone Number
                    </label>
                    <div className="w-full">
                      <Controller
                        name="mobileNumber"
                        control={control}
                        rules={{
                          required: "Phone Number is Required",
                        }}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              defaultValue={data?.data?.mobileNumber}
                              name="mobileNumber"
                              type="text"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Enter mobileNumber..."
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.mobileNumber &&
                                  !!errors?.mobileNumber?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.mobileNumber?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {/* receive notification */}
                  <div>
                    <div className="w-full">
                      <Controller
                        disabled
                        name="isSubscribeToGetNotification"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <Checkbox {...field} defaultChecked>
                              You agree to receive automated notification
                              messages from ByteTag. This agreement {`isn't`} a
                              condition of any purchase. Reply STOP to end or
                              HELP for help.
                            </Checkbox>

                            <Form.ErrorMessage
                              show={
                                (!!errors?.isSubscribeToGetNotification &&
                                  !!errors?.isSubscribeToGetNotification
                                    ?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.isSubscribeToGetNotification?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {/* promotional message */}
                  <div>
                    <div className="w-full">
                      <Controller
                        disabled
                        name="isSubscribeToGetNotification"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <Checkbox {...field} defaultChecked>
                              You agree to receive automated promotional
                              messages from ByteTag. This agreement {`isn't`} a
                              condition of any purchase. 4 Msgs/month. Reply
                              STOP to end or HELP for help.
                            </Checkbox>

                            <Form.ErrorMessage
                              show={
                                (!!errors?.isSubscribeToGetNotification &&
                                  !!errors?.isSubscribeToGetNotification
                                    ?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.isSubscribeToGetNotification?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {/* approve privacy policy */}
                  <div>
                    <div className="w-full">
                      <Controller
                        name="approvePrivacyPolicy"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <Checkbox
                              className="!select-none"
                              {...field}
                              defaultChecked
                            >
                              By checking either box, you also agree to the
                              Terms of Service and Privacy Policy.
                            </Checkbox>

                            <Form.ErrorMessage
                              show={
                                (!!errors?.approvePrivacyPolicy &&
                                  !!errors?.approvePrivacyPolicy?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.approvePrivacyPolicy?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* submit handler */}
                <div className="mt-7 mb-5">
                  <Button
                    // loading={!isLoading}
                    disabled={isLoading}
                    type="submit"
                    size="lg"
                    className="!bg-primary/90 duration-300 transition-all hover:!bg-primary !text-white  !font-bold !rounded-lg"
                    block
                  >
                    {isLoading ? (
                      <h2 className="flex  justify-center items-center gap-4">
                        Updating Phone Number{" "}
                        <span className="animate-spin">
                          <ImSpinner9 />
                        </span>{" "}
                      </h2>
                    ) : (
                      "Edit Phone Number"
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

export default PhoneNumberSettingDrawer;
