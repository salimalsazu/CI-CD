"use client";

import { Controller, useForm } from "react-hook-form";
import { UpdateBlog } from "@/types/blogs/blogType";
import { Button, Form, Input, Message, useToaster } from "rsuite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  useGetSingleBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/features/blogs/blogsApi";
import UpdateDescriptionEditor from "@/components/blogs/UpdateDescriptionEditor";
import UpdateUploadBlogImage from "@/components/blogs/UpdateBlogImageUpload";

const EditBlogPage = ({
  params,
}: {
  params: {
    blogId: string;
  };
}) => {
  //

  const {
    data: blogData,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
    error: errorBlog,
  } = useGetSingleBlogByIdQuery(
    {
      blogId: params?.blogId,
    },
    {
      skip: !params?.blogId,
    }
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: formReset,
  } = useForm<UpdateBlog>();

  //

  const [
    updateBlog,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateBlogMutation();

  const handleCreateBlog = async ({ blogImage, ...blogData }: UpdateBlog) => {
    const formData = new FormData();

    const blogJson = JSON.stringify(blogData);
    formData.append("data", blogJson);
    if (blogImage?.blobFile)
      formData.append("file", blogImage.blobFile as Blob);

    await updateBlog({ data: formData, blogId: params?.blogId });
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
    <div>
      {" "}
      <section
        className="rounded-sm border border-stroke bg-white px-2
     pt-6 pb-2.5 shadow-default    sm:px-7.5 xl:pb-1"
      >
        <form onSubmit={handleSubmit(handleCreateBlog)}>
          {/* image and title */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-5">
            {/* blog image */}
            <div className="flex md:col-span-2 lg:col-span-1 flex-col gap-2">
              <label htmlFor="title" className="font-medium">
                Featured Image
              </label>
              <Controller
                name="blogImage"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <UpdateUploadBlogImage
                      defaultImage={blogData?.data?.blogImage}
                      field={field}
                      label="blogImage"
                    />

                    <Form.ErrorMessage
                      show={
                        (!!errors?.blogImage && !!errors?.blogImage?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span>{errors?.blogImage?.message as string}</span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* others */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-3 gap-5">
              {/* blog title */}
              <div className="flex flex-col   gap-2">
                <label htmlFor="title" className="font-medium">
                  Blog Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        {...field}
                        size="lg"
                        as="textarea"
                        rows={6}
                        defaultValue={blogData?.data?.title}
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
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        {...field}
                        size="lg"
                        defaultValue={blogData?.data?.categoryName}
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
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <UpdateDescriptionEditor
                      field={field}
                      defaultValue={blogData?.data?.description ?? ""}
                    />
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
    </div>
  );
};

export default EditBlogPage;
