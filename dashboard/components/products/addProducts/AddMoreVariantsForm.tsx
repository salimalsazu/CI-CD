"use client";
import { HiPlus } from "react-icons/hi";
import { Form, Input, InputNumber } from "rsuite";
import { Controller, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import SingleUploadProduct from "./SingleUploadProduct";

const AddMoreVariantsForm = ({ control, basePrice, errors }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productVariants",
  });
  return (
    <section className=" py-4 bg-white border border-[#d1d5db] rounded-xl">
      {fields?.map((field, index) => (
        <div
          key={field.id}
          className={`${
            index === fields.length - 1 ? "" : "border-b-[#d1d5db] border-b "
          } px-5 my-3`}
        >
          {/* heading */}
          <div className="mb-3 flex justify-between">
            <h1 className="text-xl">Variant {index + 1}</h1>
            <span
              onClick={() => remove(index)}
              className="cursor-pointer hover:text-[#ef4444]"
            >
              Remove
            </span>
          </div>
          {/*  main */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-6 gap-10">
            {/* image */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 2xl:col-span-1  ">
              <div className="w-full">
                <Controller
                  name={`productVariants[${index}].image`}
                  control={control}
                  rules={{
                    required: "Image is Required !!",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <SingleUploadProduct
                        label="image"
                        variantIndex={index}
                        field={{
                          value: field.value,
                          onChange: (file) => {
                            if (Array.isArray(file)) {
                              field.onChange(file[0]);
                            } else {
                              field.onChange(file);
                            }
                          },
                        }}
                      />
                      <Form.ErrorMessage
                        show={
                          errors?.productVariants?.length &&
                          !!errors?.productVariants[index]?.image
                        }
                        placement="topEnd"
                      >
                        <span>
                          {errors?.productVariants?.length &&
                            ((errors?.productVariants[index]?.image
                              ?.message as string) ||
                              "Required")}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* input form  */}
            <div className="col-span-1 md:col-span-4 lg:col-span-6 2xl:col-span-5  ">
              <div className="md:flex gap-5 mb-2">
                {/* Color name */}
                <div className="w-full">
                  <label htmlFor="color" className="font-medium text-sm">
                    Color Name
                  </label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Color is Required !!",
                    }}
                    name={`productVariants[${index}].color.name`}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper  w-full">
                        <Input
                          value={field.value}
                          className="!w-full mt-1"
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                        <Form.ErrorMessage
                          show={
                            errors?.productVariants?.length &&
                            !!errors?.productVariants[index]?.color?.name
                          }
                          placement="topEnd"
                        >
                          <span>
                            {errors?.productVariants?.length &&
                              ((errors?.productVariants[index]?.color?.name
                                ?.message as string) ||
                                "Required")}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/*  */}
                <div className="w-full">
                  {/* Color code */}
                  <label htmlFor="code" className="font-medium text-sm">
                    Color Code
                  </label>
                  <Controller
                    control={control}
                    rules={{
                      required: "Color code is Required !!",
                    }}
                    name={`productVariants[${index}].color.code`}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full relative">
                        <Input
                          value={field.value}
                          className="border !w-full mt-1"
                        />
                        <input
                          type="color"
                          value={field.value}
                          className="!w-full mt-1 absolute inset-0 opacity-0 cursor-text z-99999"
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                        <div
                          style={{ backgroundColor: field.value }}
                          className="absolute top-0 right-0 w-5 h-5 my-2 mr-2 rounded-full "
                        ></div>
                        <Form.ErrorMessage
                          show={
                            errors?.productVariants?.length &&
                            !!errors?.productVariants[index]?.color?.code
                          }
                          placement="topEnd"
                        >
                          <span>
                            {errors?.productVariants?.length &&
                              ((errors?.productVariants[index]?.color?.code
                                ?.message as string) ||
                                "Required")}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* Size values */}
              </div>
              {/*  */}
              <div className="md:flex gap-5 mb-5">
                {/* stock */}
                <div className="w-full">
                  <label htmlFor="stock" className="font-medium text-sm">
                    Stock
                  </label>
                  <Controller
                    name={`productVariants[${index}].stock`}
                    control={control}
                    rules={{
                      required: "Stock is Required !!",
                      min: {
                        value: 0,
                        message: "Stock must be greater than 0",
                      },
                      max: {
                        value: 500,
                        message: "Stock maximum 500",
                      },
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper  w-full">
                        <InputNumber
                          min={1}
                          value={field.value}
                          className="!w-full mt-1"
                          placeholder="Stock (Maximum Value 500)"
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                        <Form.ErrorMessage
                          show={
                            errors?.productVariants?.length &&
                            !!errors?.productVariants[index]?.stock
                          }
                          placement="topEnd"
                        >
                          <span>
                            {errors?.productVariants?.length &&
                              ((errors?.productVariants[index]?.stock
                                ?.message as string) ||
                                "Required")}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* price */}
                <div className="w-full">
                  <label htmlFor="stock" className="font-medium text-sm">
                    Variant Price
                  </label>
                  <Controller
                    name={`productVariants[${index}].variantPrice`}
                    rules={{
                      required: "Variant price is Required !!",
                      min: {
                        value: 1,
                        message: "Variant Price must be greater than 0",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper  w-full">
                        <InputNumber
                          max={10000}
                          min={1}
                          defaultValue={basePrice ?? undefined}
                          className="!w-full mt-1"
                          placeholder="Price"
                          onChange={(value) => {
                            field.onChange(parseFloat(value || basePrice));
                          }}
                        />
                        <Form.ErrorMessage
                          show={
                            errors?.productVariants?.length &&
                            !!errors?.productVariants[index]?.variantPrice
                          }
                          placement="topEnd"
                        >
                          <span>
                            {errors?.productVariants?.length &&
                              ((errors?.productVariants[index]?.variantPrice
                                ?.message as string) ||
                                "Required")}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* button */}
      <div>
        <span
          onClick={() => {
            append({
              id: uuidv4(),
              color: {
                name: "",
                code: "",
              },
              size: "",
              stock: "",
              // price: basePrice,
              variantPrice: basePrice,
            });
          }}
          className="px-4 text-[#3f84de] text-sm inline-block cursor-pointer hover:underline-offset-2 hover:underline"
        >
          <HiPlus className="inline-block" /> Add options size or color
        </span>
      </div>
    </section>
  );
};

export default AddMoreVariantsForm;
