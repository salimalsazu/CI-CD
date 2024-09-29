"use client";

import { useAddNewCommentMutation } from "@/redux/api/features/blogs/commentApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Message, useToaster } from "rsuite";
type IAddComment = {
  comment: string;
  name: string;
  email: string;
};

const SingleBlogComment = ({ blogHref }: { blogHref: string }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset: formReset,
  } = useForm<IAddComment>();

  const [
    addNewComment,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useAddNewCommentMutation();

  const handleAddComment = async (data: IAddComment) => {
    await addNewComment({
      data,
      blogHref,
    });
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
    <div className=" flex justify-start items-center ">
      <div className="w-full">
        <form
          className=" w-full p-4 rounded shadow-md"
          onSubmit={handleSubmit(handleAddComment)}
        >
          <h2 className="text-xl mb-4 tracking-wider font-lighter text-gray-900 ">
            Leave a Comment
          </h2>
          <p className="text-gray-600 mb-4">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <div className="grid grid-cols-1 mt-8 md:grid-cols-3 gap-3">
            <div className="mb-4  col-span-3">
              {" "}
              <div className="rs-form-control-wrapper ">
                <textarea
                  id="comment"
                  {...register("comment", {
                    required: "Comment is Required !!",
                  })}
                  className="w-full px-3 py-2 
                 rounded-sm border  border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
                  placeholder="Type Comment...*"
                  rows={5}
                />
                <Form.ErrorMessage
                  show={
                    (!!errors?.comment && !!errors?.comment?.message) || false
                  }
                  placement="topEnd"
                >
                  <span>{errors?.comment?.message as string}</span>
                </Form.ErrorMessage>
              </div>
            </div>
            {/*  */}
            <div className="col-span-3 lg:flex gap-5">
              <div className="mb-4 w-full">
                <div className="rs-form-control-wrapper ">
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Name is Required !!",
                    })}
                    className="w-full px-3 py-2 
                 rounded-sm border 
                  border-gray-300 focus:outline-none border-solid focus:border-dashed"
                    placeholder="Name*"
                  />

                  <Form.ErrorMessage
                    show={(!!errors?.name && !!errors?.name?.message) || false}
                    placement="topEnd"
                  >
                    <span>{errors?.name?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              </div>
              <div className="mb-4 w-full">
                <div className="rs-form-control-wrapper ">
                  <input
                    type="text"
                    id="email"
                    {...register("email", {
                      required: "Email is Required !!",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-3 py-2 
                 rounded-sm border 
                  border-gray-300 focus:outline-none border-solid focus:border-dashed"
                    placeholder="Email*"
                  />

                  <Form.ErrorMessage
                    show={
                      (!!errors?.email && !!errors?.email?.message) || false
                    }
                    placement="topEnd"
                  >
                    <span>{errors?.email?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isLoading}
              className="!py-4 !px-6 !bg-blue-950 !text-white !rounded-sm hover:!bg-blue-900 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-800"
            >
              Post Comment →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleBlogComment;
