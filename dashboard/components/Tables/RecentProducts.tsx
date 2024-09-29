"use client";
import { fileUrlKey } from "@/helpers/envConfig";
import noImage from "@/public/images/no-image.png";
import { useGetProductQuery } from "@/redux/features/productsApi";
import moment from "moment";
import Image from "next/image";
import { Placeholder, Popover, Whisper } from "rsuite";

const RecentProducts = () => {
  let query: any = {};
  query["limit"] = 20;
  const { data: recentProducts, isLoading } = useGetProductQuery({
    ...query,
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-2 pt-3 pb-2.5 shadow-default     sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-medium text-black  ">Recent Products</h4>

      <div className="flex flex-col">
        <div>
          {isLoading && (
            <div className="pb-5">
              <Placeholder.Grid rowHeight={30} active rows={10} columns={6} />
            </div>
          )}
        </div>

        {!isLoading && (
          <>
            <div className="grid grid-cols-4 rounded-sm bg-gray-2   sm:grid-cols-5">
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase ">Image</h5>
              </div>
              <div className="p-2.5 text-start xl:p-5">
                <h5 className="text-sm font-medium uppercase ">Product Name</h5>
              </div>

              <div className="p-2.5 sm:text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase ">
                  Product Price
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase ">Category</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase ">Created</h5>
              </div>
            </div>
            {/* loading */}
            <div>
              {!isLoading && !recentProducts?.data?.length && (
                <div className="flex justify-center items-center h-[40vh]">
                  <h2 className="text-3xl font-medium ">
                    No Product Available !
                  </h2>
                </div>
              )}
            </div>
            {/* all data */}

            {!isLoading &&
              recentProducts?.data?.length > 0 &&
              recentProducts?.data?.map(
                (singleProduct: any, idx: number) => (
                  console.log("singleProduct", singleProduct),
                  (
                    <div
                      className={`grid grid-cols-4 sm:grid-cols-5 ${
                        idx === recentProducts?.data?.length - 1
                          ? ""
                          : "border-b border-stroke dark:border-strokedark"
                      }`}
                      key={idx}
                    >
                      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                        <div className="flex-shrink-0">
                          <Whisper
                            enterable
                            placement="auto"
                            speaker={
                              <Popover>
                                <div>
                                  <Image
                                    width={300}
                                    height={300}
                                    alt=""
                                    src={
                                      singleProduct?.featuredImage
                                        ? `${fileUrlKey()}/${
                                            singleProduct?.featuredImage
                                          }`
                                        : noImage
                                    }
                                    className="object-cover"
                                  />
                                </div>
                              </Popover>
                            }
                          >
                            <div className="aspect-video">
                              <Image
                                width={70}
                                height={70}
                                alt=""
                                src={
                                  singleProduct?.featuredImage
                                    ? `${fileUrlKey()}/${
                                        singleProduct?.featuredImage
                                      }`
                                    : noImage
                                }
                                className="object-center  object-cover"
                              />
                            </div>
                          </Whisper>
                        </div>
                      </div>

                      <div className="flex items-center justify-start p-2.5 xl:p-5">
                        <p className="text-black dark:text-white font-medium">
                          {singleProduct?.productName}
                        </p>
                      </div>

                      <div className="  items-center sm:justify-center p-2.5 flex xl:p-5">
                        <p className="text-black dark:text-white font-medium">
                          $ {singleProduct?.productPrice}
                        </p>
                      </div>
                      <div className=" items-center sm:justify-center p-2.5 flex xl:p-5">
                        <p className="text-black dark:text-white font-medium">
                          {singleProduct?.category?.categoryName}
                        </p>
                      </div>
                      <div className=" items-center sm:justify-center p-2.5 flex xl:p-5">
                        <p className="text-black dark:text-white font-medium">
                          {singleProduct?.createdAt
                            ? moment(singleProduct.createdAt).format("LL")
                            : ""}
                        </p>
                      </div>
                    </div>
                  )
                )
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecentProducts;
