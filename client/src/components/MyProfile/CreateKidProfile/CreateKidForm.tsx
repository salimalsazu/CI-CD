"use client";

import { Button, DatePicker, Form, Message, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import MyContacts from "./MyContacts";
import { FileType } from "rsuite/esm/Uploader";
import UploadKidPhoto from "./UploadKidPhoto";
import { useAddKidMutation } from "@/redux/api/features/kids/kidApi";
import { useRouter } from "next/navigation";

// type definition
type IRelations = {
  firstName: string;
  lastName?: string;
  relation: string;
  phoneNo: string;
};

type ICreateKid = {
  firstName: string;
  lastName?: string;
  age: Date;
  email: string;
  password: string;
  kidImage: FileType;
  relations: IRelations[];
};
//From component
const CreateKidForm = ({ tag }: { tag: string }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ICreateKid>({
    defaultValues: {
      relations: [
        {
          firstName: "",
          lastName: "",
          relation: "",
          phoneNo: "",
        },
      ],
    },
  });

  const { relations } = watch();

  // submit
  const [
    addKid,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useAddKidMutation();

  const handleCreateKid = async (kidInfo: ICreateKid) => {
    // creating form data
    const formData = new FormData();

    // Construct the  object
    const kidData = {
      code: tag,
      firstName: kidInfo?.firstName,
      lastName: kidInfo?.lastName,
      email: kidInfo?.email,
      password: kidInfo?.password,
      kidAge: kidInfo?.age,
      relations: kidInfo?.relations,
    };

    // Convert kid object to JSON string
    const kidJSON = JSON.stringify(kidData);
    // Append image to formData
    if (kidInfo?.kidImage && kidInfo?.kidImage?.blobFile) {
      formData.append("file", kidInfo?.kidImage?.blobFile as Blob);
    }

    // appending all data to formData
    formData.append("data", kidJSON);

    await addKid(formData);
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
    }
  }, [
    data?.message,
    error,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    router,
    toaster,
  ]);

  return (
    <div className="text-center py-10">
      <h2 className="text-center text-4xl font-bold">Create New Band</h2>
      {/* <p className="pt-2 text-lg text-gray-500 w-3/4 md:w-3/6 mx-auto">
        Step two: Enter information.
      </p> */}
      <form
        onSubmit={handleSubmit(handleCreateKid)}
        className="max-w-4xl mx-auto px-5"
      >
        {/* kid name and pet age */}
        <div className="w-full flex justify-center mb-5">
          {/* product featured image */}
          <div className="space-y-4">
            <h1 className="text-xl mb-1 font-medium max-md:my-2">
              Upload Photo
            </h1>
            <div>
              <Controller
                control={control}
                name="kidImage"
                render={({ field }) => (
                  <div className="rs-form-control-wrapper w-full">
                    <UploadKidPhoto field={field} />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.kidImage && !!errors?.kidImage?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span>{errors?.kidImage?.message as string}</span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        {/* name and age */}
        <div className="grid md:grid-cols-12 gap-3">
          {/* first name */}
          <div className="md:col-span-4 flex flex-col w-full gap-2">
            <label className="text-start block ">First name</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is Required !!" }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="name"
                    type="text"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-2.5 outline-none rounded-lg "
                    placeholder="Enter kid name"
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.firstName && !!errors?.firstName?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span>{errors?.firstName?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
          {/* last name */}
          <div className="md:col-span-4 flex flex-col w-full gap-2">
            <label htmlFor="lastName" className="text-start block ">
              Last name{" "}
              <span className="text-sm text-slate-500">(optional)</span>
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    id="lastName"
                    type="text"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-2.5 outline-none rounded-lg "
                    placeholder="Enter kid name"
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.lastName && !!errors?.lastName?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span>{errors?.lastName?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>

          {/* Kid Age */}
          <div className="md:col-span-4 flex flex-col w-full gap-2">
            <label className="text-base text-start block">Date of birth</label>
            <Controller
              name="age"
              control={control}
              rules={{
                required: "Date of Birth is Required !!",
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <DatePicker
                    {...field}
                    shouldDisableDate={(date) => date > new Date()}
                    size="lg"
                    className="w-full bg-transparent text-sm outline-none rounded-lg "
                    placeholder="DOB"
                  />
                  <Form.ErrorMessage
                    show={(!!errors?.age && !!errors?.age?.message) || false}
                    placement="topEnd"
                  >
                    <span>{errors?.age?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>

          {/* email */}

          <div className="md:col-span-6 flex flex-col w-full gap-2">
            <label className="text-start block">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="email"
                    type="text"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg "
                    placeholder="Enter Your Email"
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
              )}
            />
          </div>

          {/* Password */}

          <div className="md:col-span-6 flex flex-col w-full gap-2">
            <label className="text-start block ">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is Required !!" }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="password"
                    type="password"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg "
                    placeholder="Password"
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.password && !!errors?.password?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span>{errors?.password?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>
        {/* Contact person Information */}
        <div className="text-center pt-10 pb-5">
          <h2 className="text-xl font-semibold pb-2">My Contacts</h2>
          <p className="text-[15px] text-gray-500">Add unlimited contacts</p>
        </div>
        {/* contacts */}
        <div>
          <MyContacts errors={errors} control={control} />
        </div>

        {/*  */}

        <div className="flex justify-end">
          <Button
            loading={isLoading}
            disabled={!relations?.length}
            type="submit"
            className="!bg-primary !text-white
          px-4 py-2 font-bold transition-all duration-300 ease-in-out delay-0"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateKidForm;
