"use client";
import { Form, Input, Message, Modal, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { Button } from "rsuite";
import { ICreateCategory } from "@/types/forms/category";
import { useUpdateCategoryMutation } from "@/redux/features/categoryApi";
import { useEffect } from "react";
import UpdateCategoryImageUpload from "./UpdateCategoryImageUpload";

const EditCategoryModal = ({ isOpenEdit, handleClose, editData }: any) => {
  console.log("editData", editData);

  const [
    updateCategory,
    { data, isSuccess, isError, isLoading, error, reset },
  ] = useUpdateCategoryMutation();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateCategory>();

  const handleLogin = async (newData: ICreateCategory) => {
    const formData = new FormData();

    if (newData?.categoryImage?.blobFile) {
      formData.append("file", newData?.categoryImage?.blobFile);
    }
    const obj = {
      categoryName: newData.categoryName,
    };

    const categoryData = JSON.stringify(obj);

    formData.append("data", categoryData);

    await updateCategory({
      data: formData,
      categoryId: editData?.categoryId,
    });
  };

  console.log(editData);

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Category Updated"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      handleClose();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Category Creation Failed"
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
    handleClose,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);

  const handleModalClose = () => {
    handleClose();
    reset();
    formReset();
  };
  return (
    <div>
      <Modal
        backdrop="static"
        open={isOpenEdit}
        onClose={handleModalClose}
        overflow={false}
      >
        <Modal.Header>
          <Modal.Title>Edit Category Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-1">
            <form onSubmit={handleSubmit(handleLogin)}>
              {/* Category Name */}
              <div className="space-y-1">
                {/* category Name */}
                <div>
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Category Name
                    </label>
                    <Controller
                      name="categoryName"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            defaultValue={editData?.categoryName}
                            {...field}
                            placeholder="Enter Category Name..."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryName &&
                                !!errors?.categoryName?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.categoryName?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* category Description */}

                <div>
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Category Description
                    </label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as={"textarea"}
                            defaultValue={editData?.description}
                            {...field}
                            placeholder="Description..."
                            className="!w-full !h-30"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryName &&
                                !!errors?.description?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.description?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* category Image */}
                <div>
                  {/* Product Image */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Category Image
                    </label>
                    <Controller
                      name="categoryImage"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <UpdateCategoryImageUpload
                            defaultImage={editData.categoryImage}
                            field={field as any}
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryImage &&
                                !!errors?.categoryImage?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.categoryImage?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-3 ">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="!bg-[#3c50e0] !px-5 !text-sm !text-white  !font-semibold"
                  size="lg"
                >
                  Edit Category
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditCategoryModal;
