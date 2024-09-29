"use client";

import { IUpdateProductQA } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputPicker,
  Message,
  Modal,
  SelectPicker,
  useToaster,
} from "rsuite";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/productsApi";
import { useEffect } from "react";
import { useUpdateProductQAMutation } from "@/redux/features/productQAApi";

const ProductQAModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  const { data: productList } = useGetProductQuery({});

  const productEnum = productList?.data?.map((item: any) => {
    return {
      label: item.productName,
      value: item.productId,
    };
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateProductQA>();
  const toaster = useToaster();
  const [
    updateProductQA,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateProductQAMutation();

  const handleUpdateProductQA = async (updatedData: IUpdateProductQA) => {
    const objData = {
      productId: updatedData?.productId,
      question: updatedData?.question,
      answer: updatedData?.answer,
    };

    await updateProductQA({
      data: objData,
      productQaId: editData?.productQaId,
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
            <span className="text-sm font-semibold ">
              Edit Product QA Information
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(handleUpdateProductQA)}
              className="px-1"
            >
              <div className="grid grid-cols-1 gap-5">
                {/* left */}
                <div>
                  {/* Product Name */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Name
                    </label>
                    <Controller
                      name="productId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <InputPicker
                            size="lg"
                            {...field}
                            data={productEnum || []}
                            defaultValue={editData?.product?.productId}
                            placeholder="Enter Product Name.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productId &&
                                !!errors?.productId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Product Price */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Question
                    </label>
                    <Controller
                      name="question"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as="textarea"
                            size="lg"
                            {...field}
                            defaultValue={editData?.question}
                            placeholder="Enter Product Question.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.question &&
                                !!errors?.question?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.question?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Product Description(optional) */}
                  <div className="space-y-1 ">
                    <label className="block font-medium text-black ">
                      Product Answer
                    </label>
                    <Controller
                      name="answer"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as="textarea"
                            defaultValue={editData?.answer}
                            rows={3}
                            {...field}
                            placeholder="Write product Answer..."
                            className="!w-full !h-40"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.answer && !!errors?.answer?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.answer?.message}
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
                  Update Product QA Information
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductQAModal;
