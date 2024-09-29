"use client";
import { Form, Input, Message, Modal, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { Button } from "rsuite";
import { ICreateCategory } from "@/types/forms/category";
import AddCategoryImageUpload from "./AddCategoryImageUpload";
import { useAddCategoryMutation } from "@/redux/features/categoryApi";
import { useEffect } from "react";

const AddCategoryModalForm = ({ open, handleClose }: any) => {
  const [addCategory, { data, isSuccess, isError, isLoading, error, reset }] =
    useAddCategoryMutation();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateCategory>();

  const handleCreateCategory = async (newData: ICreateCategory) => {
    const formData = new FormData();

    if (newData?.categoryImage?.blobFile) {
      formData.append("file", newData?.categoryImage?.blobFile);
    }
    const obj = {
      categoryName: newData.categoryName,
      description: newData.description,
    };

    const categoryData = JSON.stringify(obj);

    formData.append("data", categoryData);

    await addCategory({
      data: formData,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">Category Created Successfully</h4>
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
      <Modal backdrop="static" open={open} onClose={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-1">
            <form onSubmit={handleSubmit(handleCreateCategory)}>
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
                      rules={{
                        required: "Category Name is Required",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
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
                      rules={{
                        required: "Description is Required",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as={"textarea"}
                            {...field}
                            rows={3}
                            placeholder="Description..."
                            className="!w-full "
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
                      rules={{
                        required: "Category Image is Required",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <AddCategoryImageUpload field={field as any} />
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
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCategoryModalForm;
