import { useUpdateOrderMutation } from "@/redux/features/orderApi";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { Button, Drawer, Input, Modal } from "rsuite";

const OrderEditShippingInformation = ({
  placement,
  openDrawer,
  setOpenDrawer,
  order,
}: any) => {
  console.log(order, "order");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<any>();

  const [changeShippingInformation, { isLoading }] = useUpdateOrderMutation();

  const handleChangeShippingInformation: SubmitHandler<any> = async (
    data: any
  ) => {
    const dataObj = {
      shippingAddress: data.shippingAddress,
      city: data.city,
      postalCode: data.postalCode,
      note: data.note,
    };

    await changeShippingInformation({ data: dataObj, orderId: order.orderId });
  };

  return (
    <div>
      <Drawer
        placement={placement}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title className="!font-extrabold">
            Shipping Information
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div>
            <form onSubmit={handleSubmit(handleChangeShippingInformation)}>
              <div className="grid grid-cols-1 items-center gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
                  <div>
                    <label className="block font-medium text-black ">
                      First Name{" "}
                    </label>
                    <Controller
                      defaultValue={order?.firstName}
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            {...field}
                            placeholder="First Name"
                            className="!w-full"
                          />
                          {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-black ">
                      Last Name{" "}
                    </label>
                    <Controller
                      defaultValue={order?.lastName}
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            {...field}
                            placeholder="Last Name"
                            className="!w-full"
                          />
                          {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-black ">Email</label>
                  <Controller
                    defaultValue={order?.email}
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Email..."
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-black ">Phone</label>
                  <Controller
                    defaultValue={order?.phone}
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Phone..."
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label className="block font-medium text-black ">City </label>
                  <Controller
                    defaultValue={order?.city}
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="City"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-black ">State</label>
                  <Controller
                    defaultValue={order?.state}
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="state..."
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-black ">Zip</label>
                  <Controller
                    defaultValue={order?.zip}
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Postal Code"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-black ">
                    Address
                  </label>
                  <Controller
                    defaultValue={order?.address}
                    name="shippingAddress"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          as="textarea"
                          rows={3}
                          {...field}
                          placeholder="Address"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-black ">Note </label>
                  <Controller
                    defaultValue={order?.note}
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="note"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
              </div>

              <Button
                loading={isLoading}
                className="!bg-primary !text-white mt-4"
                type="submit"
              >
                Change Information
              </Button>
            </form>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default OrderEditShippingInformation;
