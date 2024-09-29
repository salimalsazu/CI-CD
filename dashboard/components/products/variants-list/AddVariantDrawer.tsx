"use client";

import { IAddProductVariation } from "@/types/forms/product";
import { useForm } from "react-hook-form";
import { Button, Drawer, Message, useToaster } from "rsuite";
import { useAddMoreVariantMutation } from "@/redux/features/productsApi";
import { useEffect } from "react";
import AddMoreVariantsForm from "../addProducts/AddMoreVariantsForm";

type IAddVariantProps = {
  open: boolean;
  handleClose: any;
  productId: string;
  basePrice: number;
};

const AddVariantDrawer = ({
  open,
  handleClose,
  productId,
  basePrice,
}: IAddVariantProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<IAddProductVariation>();

  const { productVariants: allVariants } = watch();

  const [
    addMoreVariants,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useAddMoreVariantMutation();

  //  handle submit handler
  const handleUpdateProduct = async (newData: IAddProductVariation) => {
    const formData = new FormData();
    // Map productVariations data and format it
    const productVariationData = newData?.productVariants?.map(
      ({ image, ...items }: any) => {
        return {
          ...items,
          stock: parseInt(items?.stock),
        };
      }
    );

    // Construct the product object
    const product = {
      productVariations: productVariationData,
    };
    // Convert product object to JSON string
    const productJSON = JSON.stringify(product);
    // Append product images to formData

    // Append variant photos to formData
    newData?.productVariants?.forEach(({ image, ...others }: any) => {
      const { blobFile, name } = image ?? {};
      const [baseName, extension] = name?.split(".") ?? [];
      if (blobFile && baseName && extension) {
        formData.append(
          "files",
          blobFile as Blob,
          `${others?.id}_${baseName}.${extension}`
        );
      }
    });

    // appending all data to formData
    formData.append("data", productJSON);

    await addMoreVariants({
      data: formData,
      productId,
    });
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">{data?.message || "Variant Added"}</h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetReq();
      formReset({
        productVariants: [],
      });
      handleClose();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Add"
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
    handleClose,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    toaster,
  ]);

  return (
    <div>
      <Drawer
        backdrop="static"
        placement="right"
        size="md"
        open={open}
        onClose={() => {
          resetReq();
          formReset({
            productVariants: [],
          });
          handleClose();
        }}
      >
        <Drawer.Header>
          <Drawer.Title>
            <span className="text-sm font-semibold">Add Variant</span>
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div>
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <div>
                <AddMoreVariantsForm
                  errors={errors}
                  control={control}
                  basePrice={basePrice}
                />
              </div>

              {/* submit button */}
              <div className="flex justify-end mt-5">
                <Button
                  disabled={!allVariants?.length}
                  loading={isLoading}
                  type="submit"
                  className="!bg-primary !px-6 !text-white  !font-semibold"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddVariantDrawer;
