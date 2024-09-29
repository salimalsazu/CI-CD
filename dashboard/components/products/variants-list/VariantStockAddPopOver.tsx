"use client";

import { useAddMoreStockMutation } from "@/redux/features/barCodeApi";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiAddLine } from "react-icons/ri";
import {
  Button,
  Form,
  InputNumber,
  Notification,
  Popover,
  Whisper,
  WhisperInstance,
  useToaster,
} from "rsuite";

interface VariantStockAddPopOverProps {
  rowData: any;
}

const VariantStockAddPopOver: React.FC<VariantStockAddPopOverProps> = ({
  rowData,
}) => {
  const triggerRef = useRef<WhisperInstance>(null);
  const open = () => triggerRef.current?.open();
  const close = () => triggerRef.current?.close();

  // !
  type IAddStock = {
    stock: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IAddStock>();
  //
  const [addMoreStock, { data, isLoading, isSuccess, isError, error, reset }] =
    useAddMoreStockMutation();

  const handleAddStock = async (newStock: IAddStock) => {
    await addMoreStock({
      data: {
        variantId: rowData?.variantId,
        stock: parseInt(newStock?.stock),
      },
    });
    //
  };

  // !
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold xl:text-xl">
            {data?.message || "Stock Added"}
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
        placement="right"
        speaker={
          <Popover title="Stock">
            <div className="!w-[240px]">
              <form onSubmit={handleSubmit(handleAddStock)}>
                <div className="!max-w-[220px] mx-auto !h-[110px] space-y-5">
                  <Controller
                    name="stock"
                    control={control}
                    rules={{
                      max: {
                        value: 500,
                        message: "Stock max 500",
                      },
                      required: "Stock is Required",
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <div>
                          <InputNumber
                            min={1}
                            // max={500}
                            {...field}
                            size="lg"
                            placeholder="Enter Stock..."
                          />
                        </div>
                        <Form.ErrorMessage
                          show={
                            (!!errors?.stock && !!errors?.stock?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.stock?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />

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
          className="bg-[#f1f5f9] flex justify-between w-full px-1 rounded-md hover:text-primary hover:bg-[#e2e8f0]"
        >
          <span>
            <RiAddLine size={20} className="" />
          </span>
        </button>
      </Whisper>
    </div>
  );
};

export default VariantStockAddPopOver;
