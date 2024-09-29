"use client";

import { ICreateProductQA, ICreateTestimonial } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, useToaster } from "rsuite";

import { useEffect } from "react";

import UserImageUpload from "./ImageUploader";
import { useAddTestimonialMutation } from "@/redux/features/testimonialApi";

const AddTestimonialSection = () => {
  const toaster = useToaster();

  const [
    addTestimonial,
    { isError, isLoading, isSuccess, error, reset, data },
  ] = useAddTestimonialMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateTestimonial>();

  const handleAddTestimonial = async (newData: ICreateTestimonial) => {
    const formData = new FormData();

    if (newData?.clientImage?.blobFile) {
      formData.append("file", newData?.clientImage?.blobFile);
    }

    const objData = {
      clientName: newData.clientName,
      testimonialTitle: newData.testimonialTitle,
      testimonialDescription: newData.testimonialDescription,
      rating: newData.rating,
    };
    const testimonialData = JSON.stringify(objData);

    formData.append("data", testimonialData);

    await addTestimonial({ data: formData });

    formReset({
      clientName: "",
      testimonialTitle: "",
      testimonialDescription: "",
      rating: "",
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Creation Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [isSuccess, isError, isLoading, error, toaster, reset, formReset, data]);

  return (
    <div className="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
      {/* heading */}
      <div className="border-b p-5">
        <h2 className="text-2xl font-semibold">Add Testimonial</h2>
      </div>
      {/* content */}
      <div className="p-5 ">
        <form onSubmit={handleSubmit(handleAddTestimonial)} className="px-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {/* left */}
            <div className="col-span-2 space-y-2">
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Client Name
                </label>
                <Controller
                  name="clientName"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        {...field}
                        placeholder="Name..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.clientName &&
                            !!errors?.clientName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.clientName?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div className="col-span-2 space-y-2">
                {/* Question */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Testimonial Title
                  </label>
                  <Controller
                    name="testimonialTitle"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Title..."
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.testimonialTitle &&
                              !!errors?.testimonialTitle?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.testimonialTitle?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Client Image
                  </label>

                  <div className="">
                    <Controller
                      name="clientImage"
                      control={control}
                      render={({ field }) => (
                        <UserImageUpload field={field as any} />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="col-span-2 space-y-2">
              {/* Product Answer */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">Rating</label>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        {...field}
                        placeholder="rating..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.rating && !!errors?.rating?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.rating?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Description
                </label>
                <Controller
                  name="testimonialDescription"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        rows={10}
                        {...field}
                        placeholder="Description..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.testimonialDescription &&
                            !!errors?.testimonialDescription?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.testimonialDescription?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
              size="lg"
            >
              Add Testimonial
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonialSection;
