"use client";

import { IUpdateProduct } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  SelectPicker,
  useToaster,
} from "rsuite";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { useUpdateProductMutation } from "@/redux/features/productsApi";
import UpdateProductImageUpload from "../forms/UpdateProductImageUpload";
import { useEffect } from "react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";

const ProductEditModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  //Category

  const { data: categoryResponse, isLoading: categoryLoading } =
    useGetCategoryQuery({});

  const categoryEnums = categoryResponse?.data?.map((single: any) => {
    return {
      label: single?.categoryName,
      value: single?.categoryId,
    };
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateProduct>();
  const toaster = useToaster();
  const [
    updateProduct,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateProductMutation();

  const handleUpdateProduct = async (updatedData: IUpdateProduct) => {
    const formData = new FormData();

    if (updatedData?.featuredImage?.blobFile) {
      formData.append("file", updatedData?.featuredImage?.blobFile);
    }

    const obj = {
      productName: updatedData?.productName,
      productDescription: updatedData?.productDescription,
      productPrice: updatedData?.productPrice
        ? parseInt(updatedData?.productPrice)
        : undefined,
      productStock: updatedData?.productStock
        ? parseInt(updatedData?.productStock)
        : undefined,
      categoryId: updatedData?.categoryId,
      productStatus: updatedData?.productStatus,
    };

    const productData = JSON.stringify(obj);
    formData.append("data", productData);

    await updateProduct({
      data: formData,
      productId: editData?.productId,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Product Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetReq();
      handleCloseEdit();
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
    handleCloseEdit,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    toaster,
  ]);

  return (
    <div>
      <Modal
        size="lg"
        open={isOpenEdit}
        onClose={handleCloseEdit}
        backdrop={"static"}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-sm font-semibold ">
              Edit Product Information
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleUpdateProduct)} className="px-1">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {/* left */}
                <div className="col-span-2 space-y-2">
                  {/* Product Name */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Name
                    </label>
                    <Controller
                      name="productName"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.productName}
                            placeholder="Enter Product Name.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productName &&
                                !!errors?.productName?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productName?.message}
                            </span>
                          </Form.ErrorMessage>
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
                      name="productPrice"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.productPrice}
                            placeholder="Enter Product Price.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productPrice &&
                                !!errors?.productPrice?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productPrice?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Product Description(optional) */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Description
                    </label>
                    <Controller
                      name="productDescription"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as="textarea"
                            defaultValue={editData?.productDescription}
                            rows={3}
                            {...field}
                            placeholder="Write product Description..."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productDescription &&
                                !!errors?.productDescription?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productDescription?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* Product Image */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Image
                    </label>
                    <Controller
                      name="featuredImage"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <UpdateProductImageUpload
                            field={field}
                            defaultImage={editData?.featuredImage}
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.featuredImage &&
                                !!errors?.featuredImage?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.featuredImage?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
                {/* right */}
                <div className="col-span-2 space-y-2">
                  {/* select sub category */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Category
                    </label>
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            size="lg"
                            data={categoryEnums || []}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            defaultValue={
                              editData && editData.category
                                ? editData.category.categoryId
                                : ""
                            }
                            cleanable={false}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Item"
                            searchable={false}
                            renderMenu={(menu) =>
                              renderLoading(menu, categoryLoading)
                            }
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryId &&
                                !!errors?.categoryId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.categoryId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Product Status*/}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Status
                    </label>
                    <Controller
                      name="productStatus"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            size="lg"
                            data={["AVAILABLE", "UNAVAILABLE"].map((item) => {
                              return {
                                label: item,
                                value: item,
                              };
                            })}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            defaultValue={editData && editData.productStatus}
                            cleanable={false}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Product Status"
                            searchable={false}
                            // renderMenu={(menu) =>
                            //   renderLoading(menu, sizeLoading)
                            // }
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productStatus &&
                                !!errors?.productStatus?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productStatus?.message}
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
                  Update Product Information
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductEditModal;
