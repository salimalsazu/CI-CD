"use client";

import { IUpdateProductVariation } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import { Button, Drawer, Form, Input, Message, useToaster } from "rsuite";
import { useUpdateProductVariationMutation } from "@/redux/features/productsApi";
import UpdateProductImageUpload from "../forms/UpdateProductImageUpload";
import { useEffect } from "react";
import { CompactPicker, SketchPicker } from "react-color";

const VariantEditDrawer = ({ placement, open, setOpen, editData }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateProductVariation>();

  const toaster = useToaster();
  const [
    updateProductVariation,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateProductVariationMutation();

  const handleUpdateProduct = async (updatedData: IUpdateProductVariation) => {
    const formData = new FormData();

    if (updatedData?.image?.blobFile) {
      formData.append("file", updatedData?.image?.blobFile);
    }

    const obj = {
      color: {
        name: updatedData?.color?.name || editData?.color?.name,
        code: updatedData?.color?.code || editData?.color?.code,
      },
      variantPrice: updatedData?.variantPrice
        ? parseInt(updatedData?.variantPrice)
        : undefined,
      // stock: updatedData?.stock ? parseInt(updatedData?.stock) : undefined,
    };

    const variantData = JSON.stringify(obj);
    formData.append("data", variantData);
    console.log(obj);
    await updateProductVariation({
      data: formData,
      variantId: editData?.variantId,
    });
  };

  // ! side effect
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Update"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetReq();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Update Failed"
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
    resetReq,
    toaster,
  ]);

  return (
    <div>
      <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>
            <span className="text-sm font-semibold ">
              Edit Variant Information
            </span>
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div>
            <form onSubmit={handleSubmit(handleUpdateProduct)} className="px-1">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
                {/* Product Color */}

                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Product Color
                  </label>
                  <Controller
                    name="color.name"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          size="lg"
                          {...field}
                          defaultValue={editData?.color.name}
                          placeholder="Enter Product Color Name.."
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.color?.name &&
                              !!errors?.color?.name?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.color?.name?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* Color Code */}

                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Color Code
                  </label>
                  <Controller
                    control={control}
                    name="color.code"
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full relative">
                        <Input
                          value={field.value}
                          className="border !w-full mt-1"
                          readOnly
                        />
                        <div
                          style={{
                            backgroundColor: field?.value
                              ? field?.value
                              : editData?.color?.code,
                          }}
                          className="absolute top-0 right-0 w-5 h-5 my-2 mr-2 rounded-full"
                        ></div>
                        <Form.ErrorMessage
                          show={!!errors?.color?.code}
                          placement="topEnd"
                        >
                          <span>
                            {errors?.color?.code?.message || "Required"}
                          </span>
                        </Form.ErrorMessage>
                        <CompactPicker
                          color={field.value || editData?.color.name}
                          onChangeComplete={(color: any) => {
                            field.onChange(color.hex);
                          }}
                        />
                      </div>
                    )}
                  />
                </div>

                {/* Product Price */}

                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Product Price
                  </label>
                  <Controller
                    name="variantPrice"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          size="lg"
                          {...field}
                          defaultValue={editData?.variantPrice}
                          placeholder="Enter Product Price.."
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.variantPrice &&
                              !!errors?.variantPrice?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.variantPrice?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                {/* Product Stock */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Stock (Not Editable)
                  </label>
                  <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          defaultValue={editData?._count?.barCodes}
                          {...field}
                          readOnly
                          className="!w-full !bg-gray-3"
                        />
                        {/* <Form.ErrorMessage
                          show={
                            (!!errors?.stock && !!errors?.stock?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.stock?.message}
                          </span>
                        </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
                {/* Product Image */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Variant Image
                  </label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <UpdateProductImageUpload
                          field={field}
                          defaultImage={editData?.image}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.image && !!errors?.image?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.image?.message}
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
                  Update Variant Information
                </Button>
              </div>

              <div className="text-danger mt-5">
                <p>
                  ***To decrease the stock, delete the barcode from the Barcode
                  Table; to increase the stock, use the Add Stock function.***
                </p>
              </div>
            </form>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default VariantEditDrawer;
