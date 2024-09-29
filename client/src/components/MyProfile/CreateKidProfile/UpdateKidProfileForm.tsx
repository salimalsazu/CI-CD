"use client";

import { Button, DatePicker, Form, Message, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import MyContacts from "./MyContacts";
import { FileType } from "rsuite/esm/Uploader";
import { useUpdateKidMutation } from "@/redux/api/features/kids/kidApi";
import { useRouter } from "next/navigation";
import UpdateKidPhoto from "./UpdateKidPhoto";
import moment from "moment";

// type definition
type IRelations = {
  name: string;
  relation: string;
  phoneNo: string;
};

type ICreateKid = {
  firstName: string;
  lastName?: string;
  age?: Date;
  kidImage?: FileType;
  relations?: IRelations[];
};

const UpdateKidProfileForm = ({ kidDetails }: { kidDetails: any }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ICreateKid>({
    defaultValues: {
      relations: kidDetails?.relations,
    },
  });

  const { relations } = watch();

  // submit
  const [
    updateKid,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateKidMutation();

  const handleUpdateKid = async (kidInfo: ICreateKid) => {
    // creating form data
    const formData = new FormData();

    // Construct the  object
    const kidData = {
      firstName: kidInfo?.firstName,
      lastName: kidInfo?.lastName,
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
    await updateKid({ data: formData, kidId: kidDetails?.kidId });
  };
  // ! side effect
  const toaster = useToaster();
  const router = useRouter();

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
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Update"
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
      <h2 className="text-center text-4xl font-bold">Update Kid Information</h2>
      <p className="pt-2 text-lg text-gray-500 w-3/4 md:w-3/6 mx-auto">
        Step two: Enter information about your kid.
      </p>
      <form
        onSubmit={handleSubmit(handleUpdateKid)}
        className="mt-10 max-w-4xl mx-auto px-5"
      >
        {/* kid name and pet age */}
        <div className="w-full flex justify-center  my-10">
          {/* product featured image */}
          <div className="space-y-4">
            <h1 className="text-xl mb-1 font-medium max-md:my-2">
              Upload Kid Photo
            </h1>
            <div>
              <Controller
                control={control}
                name="kidImage"
                render={({ field }) => (
                  <div className="rs-form-control-wrapper  w-full">
                    {/* <UploadKidPhoto field={field} /> */}
                    <UpdateKidPhoto
                      defaultImage={kidDetails?.kidImage}
                      field={field as any}
                    />

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
        <div className="grid md:grid-cols-3 gap-3  ">
          {/* first name */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-start block">First name</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="firstName"
                    defaultValue={kidDetails?.firstName}
                    type="text"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-[11px] outline-none rounded-lg "
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
          {/* last Name */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-start block">
              Last Name{" "}
              <span className="text-xs  text-gray-600">(Optional)</span>
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="lastName"
                    defaultValue={kidDetails?.lastName}
                    type="text"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-[11px] outline-none rounded-lg "
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

          {/* Kid date of birth Age */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-base text-start block">Date of Birth</label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <DatePicker
                    cleanable={false}
                    defaultValue={
                      kidDetails?.kidAge ? new Date(kidDetails?.kidAge) : null
                    }
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    shouldDisableDate={(date) =>
                      moment(date).isAfter(moment(), "day")
                    }
                    size="lg"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:!border-cyan-400 !outline-none !ring-0  focus:!ring-0 focus:!outline-none rounded-lg "
                    placeholder="Kid Age"
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
        </div>
        {/* Contact person Information */}
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold pb-2">My Contacts</h2>
          <p className="text-sm text-gray-500">Add unlimited contacts</p>
        </div>
        {/* contacts */}
        <div>
          <MyContacts
            errors={errors}
            // relations={kidDetails?.relations}
            control={control}
          />
        </div>

        {/*  */}

        <div className="flex justify-end">
          <Button
            loading={isLoading}
            disabled={!relations?.length}
            type="submit"
            className="!bg-primary !text-white
          !px-4 !py-2 !font-bold "
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateKidProfileForm;
