"use client";

import { IUpdateTestimonial } from "@/types/forms/product";
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

import { useEffect } from "react";
import { useUpdateTestimonialMutation } from "@/redux/features/testimonialApi";
import UpdateTestimonialClientImage from "./UpdateTestimonialClientImage";

const TestimonialEditTable = ({
  isOpenEdit,
  handleCloseEdit,
  editData,
}: any) => {
  console.log("editData", editData);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateTestimonial>();
  const toaster = useToaster();
  const [
    updateTestimonial,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateTestimonialMutation();

  const handleUpdateTestimonial = async (updatedData: IUpdateTestimonial) => {
    const formData = new FormData();

    if (updatedData?.clientImage?.blobFile) {
      formData.append("file", updatedData?.clientImage?.blobFile);
    }

    const objData = {
      clientName: updatedData.clientName,
      testimonialTitle: updatedData.testimonialTitle,
      testimonialDescription: updatedData.testimonialDescription,
      rating: updatedData.rating,
    };

    const updateData = JSON.stringify(objData);

    formData.append("data", updateData);

    await updateTestimonial({
      data: formData,
      testimonialId: editData?.testimonialId,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Updated"}
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
              Edit Testimonial Information
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-5 ">
            <form
              onSubmit={handleSubmit(handleUpdateTestimonial)}
              className="px-1"
            >
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
                            defaultValue={editData?.clientName}
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
                              defaultValue={editData?.testimonialTitle}
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
                            <UpdateTestimonialClientImage
                              defaultImage={editData?.clientImage}
                              field={field as any}
                            />
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
                    <label className="block font-medium text-black ">
                      Rating
                    </label>
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            {...field}
                            defaultValue={editData?.rating}
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
                            defaultValue={editData?.testimonialDescription}
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
                  Edit Testimonial
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TestimonialEditTable;
