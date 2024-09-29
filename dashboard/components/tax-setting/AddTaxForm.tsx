"use client";

import { ICreateTaxSetting } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, useToaster } from "rsuite";

import { useEffect, useState } from "react";

import { useAddProductQAMutation } from "@/redux/features/productQAApi";
import { useAddTaxMutation } from "@/redux/features/taxApi";

const AddTaxForm = () => {
  const toaster = useToaster();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateTaxSetting>();

  const [addTax, { data, isLoading, isSuccess, isError, error, reset }] =
    useAddTaxMutation();

  const handleAddTax = async (newData: ICreateTaxSetting) => {
    const objData = {
      state: newData.state,
      tax: newData.tax ? parseFloat(newData.tax) : 0,
    };

    await addTax(objData);
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Product QA Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();

      formReset({
        state: "",
        tax: "",
      });
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Product Creation Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    data?.message,
    error,
    formReset,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);

  return (
    <div className="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
      {/* heading */}
      <div className="border-b p-5">
        <h2 className="text-2xl font-semibold">Add Tax State Wise</h2>
      </div>
      {/* content */}
      <div className="p-5 ">
        <form onSubmit={handleSubmit(handleAddTax)} className="px-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* State */}
            <div className="space-y-1">
              <label className="block font-medium text-black ">State</label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      {...field}
                      placeholder="Write your state..."
                      className="!w-full"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.state && !!errors?.state?.message) || false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.state?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            {/*Tax */}
            <div className="space-y-1">
              <label className="block font-medium text-black ">Tax</label>
              <Controller
                name="tax"
                rules={{
                  min: { value: 0, message: "Tax can not be negative" },
                }}
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      {...field}
                      type="number"
                      placeholder="Write tax on state..."
                      className="!w-full"
                    />
                    <Form.ErrorMessage
                      show={(!!errors?.tax && !!errors?.tax?.message) || false}
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.tax?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
              size="lg"
            >
              Add Tax
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaxForm;
