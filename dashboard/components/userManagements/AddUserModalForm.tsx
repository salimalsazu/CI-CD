"use client";

import { useCreateUserMutation } from "@/redux/features/authApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, Modal, useToaster } from "rsuite";

type ICreateUser = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const AddUserModalForm = ({ open, handleClose }: any) => {
  const toaster = useToaster();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateUser>();
  const [
    createUser,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useCreateUserMutation();

  const handleCreateHall = async (userDetails: ICreateUser) => {
    await createUser({ data: { ...userDetails, role: "ADMIN" } });
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      formReset();
      handleClose();
      resetReq();
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold text-2xl">
            {data?.message || "Successfully Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        <Message bordered centered showIcon type="error" closable>
          <h4 className="font-semibold text-2xl">
            {
              // @ts-ignore
              error?.message ?? "User Creation Failed !"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    isSuccess,
    isLoading,
    isError,
    data,
    toaster,
    formReset,
    error,
    resetReq,
    handleClose,
  ]);

  return (
    <div>
      <Modal size="lg" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" border p-3 border-stroke  rounded-md ">
            <form onSubmit={handleSubmit(handleCreateHall)}>
              <div className="grid md:grid-cols-2 gap-5">
                {/* full Name */}
                <div className="col-span-1">
                  <label htmlFor="fullName">Full Name</label>

                  <Controller
                    name="fullName"
                    control={control}
                    rules={{
                      required: "Name is Required ",
                    }}
                    render={({ field }) => (
                      <div className="mt-1 rs-form-control-wrapper">
                        <Input
                          id="name"
                          size="lg"
                          autoComplete="false"
                          autoSave="false"
                          {...field}
                          placeholder="Enter Full Name..."
                          className="!w-full !py-3 "
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.fullName &&
                              !!errors?.fullName?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.fullName?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* Email */}
                <div className="1">
                  <label htmlFor="email">Email</label>

                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Please provide valid email",
                      },
                    }}
                    render={({ field }) => (
                      <div className="mt-1 rs-form-control-wrapper">
                        <Input
                          id="name"
                          size="lg"
                          autoComplete="false"
                          autoSave="false"
                          {...field}
                          placeholder="Enter Email..."
                          className="!w-full !py-3 "
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.email && !!errors?.email?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.email?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>{" "}
                {/* phoneNumber */}
                <div className="1">
                  <label htmlFor="email">Phone Number</label>

                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: "Phone Number is Required ",
                    }}
                    render={({ field }) => (
                      <div className="mt-1 rs-form-control-wrapper">
                        <Input
                          id="phoneNumber"
                          size="lg"
                          autoComplete="false"
                          autoSave="false"
                          {...field}
                          placeholder="Enter Phone Number..."
                          className="!w-full !py-3 "
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.phoneNumber &&
                              !!errors?.phoneNumber?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.phoneNumber?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* password */}
                <div className="1">
                  <label htmlFor="email">Password</label>

                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is Required ",
                    }}
                    render={({ field }) => (
                      <div className="mt-1 rs-form-control-wrapper">
                        <Input
                          id="password"
                          size="lg"
                          type="password"
                          autoComplete="false"
                          autoSave="false"
                          {...field}
                          placeholder="Enter Password..."
                          className="!w-full !py-3 "
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.password &&
                              !!errors?.password?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.password?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* role */}
                {/* <div className="1">
                  <label htmlFor="email">User Role</label>

                  <Controller
                    name="role"
                    control={control}
                    rules={{
                      required: "Role is Required ",
                    }}
                    render={({ field }) => (
                      <div className="mt-1 rs-form-control-wrapper">
                        <SelectPicker
                          size="lg"
                          searchable={false}
                          {...field}
                          className="!w-full"
                          data={["ADMIN", "SUPERADMIN"].map((item: string) => {
                            return {
                              label: item,
                              value: item,
                            };
                          })}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.password &&
                              !!errors?.password?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.password?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div> */}
              </div>

              <div className="mt-3 flex justify-end">
                <Button
                  type="submit"
                  loading={isLoading}
                  size="lg"
                  className="!bg-primary !rounded-full !text-white !px-6"
                >
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserModalForm;
