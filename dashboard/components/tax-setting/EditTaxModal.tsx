"use client";

import { IUpdateProductQA, IUpdateTaxSetting } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputPicker,
  Message,
  Modal,
  useToaster,
} from "rsuite";

import { useEffect } from "react";

import { useUpdateTaxMutation } from "@/redux/features/taxApi";

const EditTaxModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateTaxSetting>();
  const toaster = useToaster();
  const [
    updateTax,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateTaxMutation();

  const handleUpdateTax = async (updatedData: IUpdateTaxSetting) => {
    const objData = {
      state: updatedData?.state,
      tax: updatedData?.tax,
    };

    await updateTax({
      data: objData,
      taxId: editData?.taxId,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Product QA Updated"}
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
              error?.message || "Product QA Update Failed"
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
            <span className="text-sm font-semibold ">Edit Tax</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleUpdateTax)} className="px-1">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  {/* State */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      State
                    </label>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.state}
                            placeholder="Enter State Name.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.state && !!errors?.state?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.state?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Tax */}
                  <div className="space-y-1 ">
                    <label className="block font-medium text-black ">Tax</label>
                    <Controller
                      name="tax"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            defaultValue={editData?.tax}
                            {...field}
                            placeholder="Write Tax on State..."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.tax && !!errors?.tax?.message) || false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.tax?.message}
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
                  Update Tax Information
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditTaxModal;
