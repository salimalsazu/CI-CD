import { useUpdateOrderStatusMutation } from "@/redux/features/orderApi";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { Button, InputPicker, Modal } from "rsuite";

const OrderEditModal = ({ open, handleClose, order }: any) => {
  const orderStatusOptions = [
    "PENDING",
    "CONFIRMED",
    "CANCELED",
    "DELIVERED",
    "REJECTED",
  ].map((status) => ({
    label: status,
    value: status,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<any>();

  const [orderStatusChange, { isLoading }] = useUpdateOrderStatusMutation();

  const handleChangeStatus: SubmitHandler<any> = async (data: any) => {
    await orderStatusChange({ data, orderId: order.orderId });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title className="!font-extrabold">Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              className="flex justify-start items-center gap-2"
              onSubmit={handleSubmit(handleChangeStatus)}
            >
              <div className="flex justify-start item-center gap-2">
                <label
                  htmlFor="orderStatus"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Order Status
                </label>
                <Controller
                  defaultValue={order?.orderStatus}
                  name="orderStatus"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        data={orderStatusOptions}
                        block
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        size="sm"
                      />
                    </div>
                  )}
                />
              </div>
              <Button
                loading={isLoading}
                className="!bg-primary !text-white"
                type="submit"
              >
                Change Status
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderEditModal;
