"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Message,
  Modal,
  SelectPicker,
  TagPicker,
  useToaster,
} from "rsuite";

import { useEffect, useState } from "react";

import { isActiveBoolean, promoTypeEnums } from "@/helpers/constant";

import { useGetProductQuery } from "@/redux/features/productsApi";
import { useUpdatePromoMutation } from "@/redux/features/promoCodeApi";
import { IUpdateProductPromo } from "@/types/forms/product";

const PromoCodeEditModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  const query: Record<string, any> = {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateProductPromo>();

  const { data: allProducts } = useGetProductQuery({ ...query });

  const productEnum =
    allProducts?.data?.map((single: any) => {
      return {
        label: single?.productName,
        value: single?.productId,
      };
    }) || [];

  const toaster = useToaster();
  const [
    updateProductPromo,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdatePromoMutation();

  const handleUpdateProductPromo = async (updatedData: IUpdateProductPromo) => {
    const objData = {
      promotionName: updatedData.promotionName,
      promoCode: updatedData.promoCode,
      type: updatedData.type,
      startDate: updatedData.startDate,
      endDate: updatedData.endDate,
      isActive: updatedData.isActive,
      buyItemGetItemPromotionInfo: {
        requiredItemId: updatedData.buyItemGetItemPromotion?.requiredItemId,
        requiredQuantity: updatedData.buyItemGetItemPromotion?.requiredQuantity
          ? Number(updatedData.buyItemGetItemPromotion?.requiredQuantity)
          : undefined,
        rewardItemId: updatedData.buyItemGetItemPromotion?.rewardItemId,
        rewardQuantity: updatedData.buyItemGetItemPromotion?.rewardQuantity
          ? Number(updatedData.buyItemGetItemPromotion?.rewardQuantity)
          : undefined,
      },
    };

    console.log("objData", objData);

    await updateProductPromo({
      data: objData,
      id: editData?.promotionId,
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
            <span className="text-sm font-semibold ">Edit Promo Code</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(handleUpdateProductPromo)}
              className="px-1"
            >
              <div className="my-3 grid grid-cols-3 items-center gap-3">
                <div>
                  <label className="block font-medium text-black ">
                    Select Promo Type
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          size="lg"
                          defaultValue={editData?.type}
                          data={promoTypeEnums}
                          value={field.value}
                          // onChange={(value: string | null) => field.onChange(value)}
                          onChange={(value: string | null) => {
                            field.onChange(value);
                          }}
                          style={{
                            width: "100%",
                          }}
                          placeholder="Select Promo Offer"
                          searchable={false}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.type && !!errors?.type?.message) || false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.type?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                {/* Promo Name */}
                <div>
                  <label className="block font-medium text-black ">
                    Promotion Name
                  </label>
                  <Controller
                    name="promotionName"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          defaultValue={editData?.promotionName}
                          placeholder="Write promo Name"
                          className="!w-full !text-capitalize"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.promotionName &&
                              !!errors?.promotionName?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.promotionName?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-black ">
                    Promo Code
                  </label>
                  <Controller
                    name="promoCode"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          defaultValue={editData?.promoCode}
                          placeholder="Write promo Code like ET2024"
                          className="!w-full !text-capitalize"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.promoCode &&
                              !!errors?.promoCode?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.promoCode?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4  items-center gap-3 my-3">
                {/* Product Name */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Purchase Product
                  </label>
                  <Controller
                    name="buyItemGetItemPromotion.requiredItemId"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          size="lg"
                          defaultValue={
                            editData?.buyItemGetItemPromotion?.requiredItem
                              ?.productId
                          }
                          value={field.value}
                          data={productEnum || []}
                          onChange={(value: string | null) =>
                            field.onChange(value)
                          }
                          style={{
                            width: "100%",
                          }}
                          placeholder="Select Product "
                          searchable={false}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.buyItemGetItemPromotion
                              ?.requiredItemId &&
                              !!errors?.buyItemGetItemPromotion?.requiredItemId
                                ?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {
                              errors?.buyItemGetItemPromotion?.requiredItemId
                                ?.message
                            }
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Required Qty
                  </label>
                  <Controller
                    name="buyItemGetItemPromotion.requiredQuantity"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          defaultValue={
                            editData?.buyItemGetItemPromotion?.requiredQuantity
                          }
                          value={field.value}
                          placeholder="Number of get"
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.buyItemGetItemPromotion
                              ?.requiredQuantity &&
                              !!errors?.buyItemGetItemPromotion
                                ?.requiredQuantity.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {
                              errors?.buyItemGetItemPromotion?.requiredQuantity
                                ?.message
                            }
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                {/* Product Name */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Reward Product
                  </label>
                  <Controller
                    name="buyItemGetItemPromotion.rewardItemId"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          size="lg"
                          defaultValue={
                            editData?.buyItemGetItemPromotion?.rewardItem
                              ?.productId
                          }
                          data={productEnum || []}
                          value={field.value}
                          onChange={(value: string | null) =>
                            field.onChange(value)
                          }
                          style={{
                            width: "100%",
                          }}
                          placeholder="Select Product "
                          searchable={false}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.buyItemGetItemPromotion?.rewardItemId &&
                              !!errors?.buyItemGetItemPromotion?.rewardItemId
                                ?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {
                              errors?.buyItemGetItemPromotion?.rewardItemId
                                ?.message
                            }
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Reward Qty
                  </label>
                  <Controller
                    name="buyItemGetItemPromotion.rewardQuantity"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          defaultValue={
                            editData?.buyItemGetItemPromotion?.rewardQuantity
                          }
                          value={field.value}
                          placeholder="Order Amount "
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.buyItemGetItemPromotion
                              ?.rewardQuantity &&
                              !!errors?.buyItemGetItemPromotion?.rewardQuantity
                                ?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {
                              errors?.buyItemGetItemPromotion?.rewardQuantity
                                ?.message
                            }
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-3 my-3">
                {/* Expire Date */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Start Date
                  </label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full">
                        <DatePicker
                          defaultValue={new Date(editData?.startDate)}
                          block
                          placement="auto"
                          size="lg"
                          editable={false}
                          className="!w-full"
                          onChange={(value: Date | null): void => {
                            if (value) {
                              const isoString = value.toISOString();
                              field.onChange(isoString);
                            } else {
                              field.onChange(null);
                            }
                          }}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.startDate &&
                              !!errors?.startDate?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.startDate?.message as string}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    End Date
                  </label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full">
                        <DatePicker
                          defaultValue={new Date(editData?.endDate)}
                          block
                          placement="auto"
                          size="lg"
                          editable={false}
                          className="!w-full"
                          onChange={(value: Date | null): void => {
                            if (value) {
                              const isoString = value.toISOString();
                              field.onChange(isoString);
                            } else {
                              field.onChange(null);
                            }
                          }}
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.endDate && !!errors?.endDate?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.endDate?.message as string}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Active
                  </label>
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          size="lg"
                          defaultValue={editData?.isActive}
                          data={isActiveBoolean}
                          onChange={(value: string | null) =>
                            field.onChange(value)
                          }
                          style={{
                            width: "100%",
                          }}
                          placeholder="Select Product "
                          searchable={false}
                        />
                        {/* <Form.ErrorMessage
                          show={
                            (!!errors?.buyItemGetItemPromotion?.requiredItem
                              ?.productName &&
                              !!errors?.buyItemGetItemPromotion?.requiredItem
                                ?.productName?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {
                              errors?.buyItemGetItemPromotion?.requiredItem
                                ?.productName?.message
                            }
                          </span>
                        </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
                  size="lg"
                >
                  Edit Promo Code
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PromoCodeEditModal;
