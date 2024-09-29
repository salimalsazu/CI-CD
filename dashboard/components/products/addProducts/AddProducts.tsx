"use client";
import { Controller, useForm } from "react-hook-form";
import Variants from "./Variants";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Message,
  SelectPicker,
  useToaster,
} from "rsuite";
import { useEffect, useState } from "react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useDebounced } from "@/redux/hook";
import AddProductUpload from "./AddProductUpload";
import { FileType } from "rsuite/esm/Uploader";
import { useAddProductMutation } from "@/redux/features/productsApi";
import AddFeaturedImage from "./AddFeaturedImage";
import { useRouter } from "next/navigation";

const AddProductsSection = () => {
  const query: Record<string, any> = {};
  const [basePrice, setBasePrice] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = 200;

  //
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) query["searchTerm"] = debouncedTerm;

  const { data: categories } = useGetCategoryQuery({ ...query });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const { productVariants: allVariants } = watch();

  const [
    addProduct,
    {
      data: addProductData,
      isLoading: isLoadingAdd,
      isSuccess: isSuccessAdd,
      isError: isErrorAdd,
      error: errorAdd,
      reset: resetAdd,
    },
  ] = useAddProductMutation();

  // ! submit
  const handleAddProduct = async (data: any) => {
    const formData = new FormData();
    // Map productVariations data and format it
    const productVariationData = data?.productVariants?.map(
      ({ image, ...items }: any) => {
        return {
          ...items,
          // variantPrice: parseFloat(items?.variantPrice),
          stock: parseInt(items?.stock),
        };
      }
    );
    // Construct the product object
    const product = {
      productName: data.title,
      productDescription: data.description,
      categoryId: data.category,
      productPrice: parseFloat(data.productPrice),
      productVariations: productVariationData,
    };
    // Convert product object to JSON string
    const productJSON = JSON.stringify(product);
    // Append product images to formData
    data?.productImages?.forEach((file: FileType) => {
      formData.append("files", file.blobFile as Blob);
    });

    // if featured image exist
    if (data?.featuredImage?.blobFile) {
      const { blobFile, name } = data?.featuredImage ?? {};
      const [baseName, extension] = name?.split(".") ?? [];

      formData.append(
        "files",
        blobFile as Blob,
        `featured-image_${baseName}.${extension}`
      );
    }
    // Append variant photos to formData
    data?.productVariants?.forEach(({ image, ...others }: any) => {
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

    await addProduct(formData);
  };

  // ! side effect
  const toaster = useToaster();
  const router = useRouter();

  useEffect(() => {
    if (isSuccessAdd && !isErrorAdd && !isLoadingAdd) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {addProductData?.message || "Successfully Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetAdd();
      router.push("/products");
    }
    if (!isSuccessAdd && isErrorAdd && !isLoadingAdd && errorAdd) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              errorAdd?.message || "Failed to Create"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    addProductData?.message,
    errorAdd,
    isErrorAdd,
    isLoadingAdd,
    isSuccessAdd,
    resetAdd,
    router,
    toaster,
  ]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="md:flex md:items-start  md:gap-5">
          <section className="md:w-[55%]">
            <h1 className="text-xl mb-1 font-medium">Product information</h1>
            <div className="bg-white border border-[#d1d5db] rounded-xl p-4">
              {/* product title */}
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-medium">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Product Title is Required !!" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        {...field}
                        type="text"
                        id="title"
                        className="!w-full border focus:outline-none py-1 px-3 rounded-md border-[#d1d5db]"
                        placeholder="Active Band"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.title && !!errors?.title?.message) || false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.title?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* product description */}
              <div className="flex flex-col gap-2 w-full mt-3">
                <label htmlFor="title" className="font-medium">
                  Description
                </label>
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required: "Product Description is Required !!",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper  w-full">
                      <Input
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                        value={field.value}
                        className="!w-full"
                        onChange={(value) => field.onChange(value)}
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.description &&
                            !!errors?.description?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.description?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* product category */}

              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is Required !!" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <SelectPicker
                        className="w-full"
                        data={
                          categories?.data?.map((item: any) => ({
                            label: item?.categoryName,
                            value: item?.categoryId,
                          })) || []
                        }
                        onSearch={(e) => setSearchTerm(e)}
                        label={undefined}
                        loading={undefined}
                        caretAs={undefined}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.category && !!errors?.category?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.category?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* product  price */}
              <div className="mt-2">
                <label htmlFor="" className="font-medium">
                  Product price
                </label>
                <Controller
                  control={control}
                  name="productPrice"
                  rules={{
                    required: "Base Price is required !!",
                    min: {
                      value: 0,
                      message: "Base Price must be greater than 0",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <div>
                        <InputNumber
                          value={field.value}
                          min={1}
                          formatter={(value) => `€ ${value}`}
                          onChange={(value) => {
                            field.onChange(value);
                            setBasePrice(parseFloat(value as string));
                          }}
                        />
                      </div>
                      <Form.ErrorMessage
                        show={!!errors?.productPrice}
                        placement="topEnd"
                      >
                        <span>{errors?.productPrice?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* Pricing */}
            {/* <h1 className="text-xl mt-3 mb-2 font-medium">Pricing</h1> */}
          </section>
          {/* media */}
          <section className="md:w-[45%]">
            {/* product featured image */}
            <div>
              <h1 className="text-xl mb-1 font-medium max-md:my-2">
                Featured Image
              </h1>
              <div>
                <Controller
                  control={control}
                  name="featuredImage"
                  rules={{
                    required: "Featured Image is Required !!",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper  w-full">
                      <AddFeaturedImage label="featuredImage" field={field} />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.featuredImage &&
                            !!errors?.featuredImage?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.featuredImage?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* product  gallery*/}
            <div>
              <h1 className="text-xl mb-1 font-medium max-md:my-2">
                Product Gallery
              </h1>
              <aside className="bg-white p-4 border border-[#d1d5db] rounded-xl">
                <div className="">
                  <Controller
                    rules={{ required: "Product Image is Required" }}
                    name="productImages"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <AddProductUpload field={field as any} />
                        <Form.ErrorMessage
                          show={!!errors?.productImages}
                          placement="topEnd"
                        >
                          <span>
                            {errors?.productImages?.message as string}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </aside>
            </div>
          </section>
        </div>
        {/*  Variants*/}
        <div>
          <h1 className="text-xl mt-3 mb-2 font-medium">Variants</h1>
          <Variants errors={errors} control={control} basePrice={basePrice} />
        </div>
        <div className="flex justify-end mt-10">
          <Button
            disabled={!allVariants?.length}
            loading={isLoadingAdd}
            type="submit"
            className="!px-5 !py-3 !bg-primary !text-white !font-medium !rounded-lg "
          >
            Add product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductsSection;
