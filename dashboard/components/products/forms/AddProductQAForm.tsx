"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { ICreateProduct, ICreateProductQA } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputPicker,
  Message,
  SelectPicker,
  useToaster,
} from "rsuite";

import { useEffect, useState } from "react";

import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/categoryApi";
import { useAddProductQAMutation } from "@/redux/features/productQAApi";

const AddProductQAForm = () => {
  const toaster = useToaster();
  let subCategoryQuery: any = {};
  const [subCategorySearch, setSubCategorySearch] = useState("");
  subCategoryQuery["limit"] = 100;
  subCategoryQuery["searchTerm"] = subCategorySearch;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<ICreateProductQA>();

  const { categoryHref } = watch();

  //Get All Category
  const {
    data: categoryResponse,
    isLoading: subCategoryLoading,
    isFetching: subCategoryFetching,
  } = useGetCategoryQuery({ ...subCategoryQuery });

  const categoryEnums = categoryResponse?.data?.map((single: any) => {
    return {
      label: single?.categoryName,
      value: single?.categoryHref,
    };
  });

  const { data: categoriesWiseProduct, isLoading: productLoading } =
    useGetSingleCategoryQuery(categoryHref, {
      skip: !categoryHref,
    });

  const productEnum = categoriesWiseProduct?.data?.product?.length
    ? categoriesWiseProduct?.data?.product?.map((single: any) => {
        return {
          label: single?.productName,
          value: single?.productId,
        };
      })
    : [];

  const [addProductQA, { data, isLoading, isSuccess, isError, error, reset }] =
    useAddProductQAMutation();

  const handleAddProductQA = async (newData: ICreateProductQA) => {
    const objData = {
      productId: newData?.productId,
      question: newData?.question,
      answer: newData?.answer,
    };

    console.log("objData", objData);

    await addProductQA(objData);

    formReset({
      categoryHref: "",
      productId: "",
      question: "",
      answer: "",
    });
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
      formReset();
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
        <h2 className="text-2xl font-semibold">Add Product Q&A</h2>
      </div>
      {/* content */}
      <div className="p-5 ">
        <form onSubmit={handleSubmit(handleAddProductQA)} className="px-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {/* left */}
            <div className="col-span-2 space-y-2">
              {/* Product Name */}
              {/* select category */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Category
                </label>
                <Controller
                  name="categoryHref"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={categoryEnums}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Category"
                        searchable={false}
                        renderMenu={(menu) =>
                          renderLoading(
                            menu,
                            subCategoryLoading || subCategoryFetching
                          )
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.categoryHref &&
                            !!errors?.categoryHref?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.categoryHref?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* Product Name */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">Product</label>
                <Controller
                  name="productId"
                  control={control}
                  rules={{ required: "Product is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={productEnum || []}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Product "
                        searchable={false}
                        renderMenu={(menu) =>
                          renderLoading(
                            menu,
                            productLoading || subCategoryFetching
                          )
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.productId &&
                            !!errors?.productId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.productId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* right */}
            <div className="col-span-2 space-y-2">
              {/* Question */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Product Question
                </label>
                <Controller
                  name="question"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        rows={3}
                        {...field}
                        placeholder="Write product Question..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.question && !!errors?.question?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.question?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* Product Answer */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Product Answer
                </label>
                <Controller
                  name="answer"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        rows={3}
                        {...field}
                        placeholder="Write product Answer..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.answer && !!errors?.answer?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.answer?.message}
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
              Add Product QA
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductQAForm;
