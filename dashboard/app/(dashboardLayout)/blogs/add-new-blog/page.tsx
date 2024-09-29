"use client";

import AddDescriptionEditor from "@/components/blogs/AddDescriptionEditor";
import UploadBlogImage from "@/components/blogs/UploadBlogImage";
import { useAddNewBlogMutation } from "@/redux/features/blogs/blogsApi";
import { AddBlog } from "@/types/blogs/blogType";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, useToaster } from "rsuite";

const AddNewBlogPage = () => {
  //

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: formReset,
  } = useForm<AddBlog>();

  //

  const [
    addNewBlog,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useAddNewBlogMutation();

  const handleCreateBlog = async ({ blogImage, ...blogData }: AddBlog) => {
    const formData = new FormData();

    const blogJson = JSON.stringify(blogData);
    formData.append("data", blogJson);
    if (blogImage?.blobFile)
      formData.append("file", blogImage.blobFile as Blob);

    await addNewBlog(formData);
  };

  // ! side effect
  const toaster = useToaster();
  const router = useRouter();
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
      resetReq();
      formReset();
      router.push("/blogs");
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Create"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetReq();
    }
  }, [
    data?.message,
    error,
    formReset,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    router,
    toaster,
  ]);

  return (
    <section
      className="rounded-sm border border-stroke bg-white px-2
     pt-6 pb-2.5 shadow-default    sm:px-7.5 xl:pb-1"
    >
      <form onSubmit={handleSubmit(handleCreateBlog)}>
        {/* image and title */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* blog image */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium">
              Featured Image
            </label>
            <Controller
              name="blogImage"
              control={control}
              rules={{ required: "Image is Required !!" }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <UploadBlogImage field={field} label="blogImage" />

                  <Form.ErrorMessage
                    show={
                      (!!errors?.title && !!errors?.title?.message) || false
                    }
                    placement="topEnd"
                  >
                    <span>{errors?.title?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
          <div className="col-span-2 space-y-3 gap-5">
            {/* blog title */}
            <div className="flex flex-col   gap-2">
              <label htmlFor="title" className="font-medium">
                Blog Title
              </label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Product Title is Required !!" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      {...field}
                      size="lg"
                      as="textarea"
                      rows={6}
                      type="text"
                      id="title"
                      className="!w-full border focus:outline-none py-1 px-3 rounded-md border-[#d1d5db]"
                      placeholder="Enter Blog Title..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.title && !!errors?.title?.message) || false
                      }
                      placement="topEnd"
                    >
                      <span>{errors?.title?.message as string}</span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            {/* category */}
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="category" className="font-medium">
                Category Name
              </label>
              <Controller
                name="categoryName"
                control={control}
                rules={{ required: "Category Name is Required !!" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      {...field}
                      size="lg"
                      type="text"
                      id="title"
                      className="!w-full border focus:outline-none py-1 px-3 rounded-md border-[#d1d5db]"
                      placeholder="Enter Category Name..."
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.categoryName &&
                          !!errors?.categoryName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span>{errors?.categoryName?.message as string}</span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        {/*  description */}
        <div>
          <div className="flex flex-col   gap-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is Required !!" }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <AddDescriptionEditor field={field} />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.description &&
                        !!errors?.description?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span>{errors?.description?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end pb-5">
          <Button
            loading={isLoading}
            type="submit"
            className="!bg-primary !text-white "
          >
            Submit
          </Button>
        </div>
      </form>
      {/*  */}
    </section>
  );
};

export default AddNewBlogPage;
