"use client";

import { useCreateQRCodeManuallyMutation } from "@/redux/features/barCodeApi";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiAddLine } from "react-icons/ri";
import {
  Button,
  Form,
  Input,
  Notification,
  Popover,
  Whisper,
  WhisperInstance,
  useToaster,
} from "rsuite";

const BarcodeCreatePopover = ({ variantId }: { variantId: string }) => {
  const triggerRef = useRef<WhisperInstance>(null);
  const open = () => triggerRef.current?.open();
  const close = () => triggerRef.current?.close();

  // !
  type ICreateQRCode = {
    code: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateQRCode>();
  //
  const [
    createQRCodeManually,
    { data, isLoading, isSuccess, isError, error, reset },
  ] = useCreateQRCodeManuallyMutation();

  const handleCreateQRCode = async (newData: ICreateQRCode) => {
    //
    await createQRCodeManually({
      data: {
        code: "et" + newData?.code,
        variantId,
      },
    });
  };

  // !
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold xl:text-xl">
            {data?.message || "Successfully Added"}
          </h4>
        </Notification>,
        { placement: "bottomStart", duration: 2000 }
      );
      // reset();
      close();
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          <h4 className="font-semibold xl:text-xl">
            {
              // @ts-ignore
              error?.message ?? "Adding Failed. try again !"
            }
          </h4>
        </Notification>,
        { placement: "bottomStart", duration: 4000 }
      );
    }
  }, [isSuccess, isLoading, isError, data, error, toaster]);

  return (
    <div>
      <Whisper
        // open QR code create popover
        placement="bottomEnd"
        speaker={
          <Popover>
            <div className="!w-[240px]">
              <div className="mb-5">
                <h4 className="text-lg font-bold text-center">
                  Create New QR Code
                </h4>
              </div>
              <form onSubmit={handleSubmit(handleCreateQRCode)}>
                <div className="!max-w-[300px] mx-auto !h-[140px] space-y-5">
                  <div className="space-y-3">
                    <label className="text-md font-semibold">QR Code</label>
                    <Controller
                      name="code"
                      control={control}
                      rules={{
                        required: "Code is Required",
                        min: "000001",
                        max: "999999",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <div>
                            <Input
                              {...field}
                              size="lg"
                              placeholder="Enter Unique Code..."
                            />
                          </div>
                          <Form.ErrorMessage
                            show={
                              (!!errors?.code && !!errors?.code?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.code?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* button */}

                  <div className="flex justify-end items-center gap-3">
                    <Button
                      onClick={close}
                      appearance="ghost"
                      className="!px-5"
                      type="button"
                    >
                      Close
                    </Button>
                    <Button
                      loading={isLoading}
                      type="submit"
                      className="!bg-primary !px-5 !text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Popover>
        }
        ref={triggerRef}
        trigger="none"
      >
        <button
          onClick={open}
          className="bg-[#f1f5f9] flex justify-between w-full px-2 py-2 rounded-md hover:text-primary hover:bg-[#e2e8f0] items-center gap-3"
        >
          <span>
            <RiAddLine size={20} className="" />
          </span>
          Create QR Code
        </button>
      </Whisper>
    </div>
  );
};

export default BarcodeCreatePopover;
