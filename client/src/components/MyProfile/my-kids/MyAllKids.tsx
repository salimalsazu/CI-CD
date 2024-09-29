"use client";

import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetMyAllKidsQuery } from "@/redux/api/features/kids/kidApi";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Pagination, Placeholder, Popover, Whisper } from "rsuite";
import DeleteKidConfirmationModal from "./DeleteKidConfirmationModal";
import { useState } from "react";
import { formatDuration } from "@/utils/kids/kidsAgeFormatDuration";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaInfo, FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import { GrLinkNext } from "react-icons/gr";

const MyAllKids = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetMyAllKidsQuery({});

  // ! delete kid
  const [deleteData, setDeleteData] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleClose = () => setIsOpenDelete(false);
  const router = useRouter();
  return (
    <section>
      <div>
        <h2 className="text-lg text-center font-semibold">
          My All Bands | {data?.data?.length || 0}
        </h2>
      </div>
      <div className="py-5 md:py-0 md:mt-5   ">
        {/*  */}
        <div className="my-2">
          {/* if loading */}
          {isLoading && (
            <div>
              <Placeholder.Graph active height={450} />
            </div>
          )}
          {/* if no data */}
          {!isLoading && !data?.data?.length && (
            <div className="flex justify-center items-center min-h-[50vh]">
              <h2>No Data Available</h2>
            </div>
          )}

          {/*   if data retrieved */}
          <div className="space-y-5 md:space-y-6">
            {!isLoading &&
              data?.data?.length > 0 &&
              data?.data?.map((singleKid: any) => (
                <div
                  key={singleKid?.id}
                  className="border relative shadow-md border-gray-200 rounded-lg md:rounded-3xl   "
                >
                  <div className="absolute top-2 right-5">
                    <Whisper
                      placement="auto"
                      trigger="click"
                      controlId="control-id-hover-enterable"
                      speaker={
                        <Popover title="Band Information">
                          <div className="w-[400px] border border-gray-200 rounded-xl overflow-hidden  transform transition duration-500  ">
                            {/* Card Header */}
                            <div className="bg-white p-4">
                              <div className=" justify-between items-center text-gray-600 text-sm font-bold space-y-2">
                                <h2 className="flex justify-between items-center">
                                  <p>Created: </p>
                                  <p>
                                    {moment(singleKid?.createdAt).format("lll")}
                                  </p>
                                </h2>
                                <h2 className="flex justify-between items-center">
                                  <p>Last Updated: </p>
                                  <p>
                                    {moment(singleKid?.updatedAt).format("lll")}
                                  </p>
                                </h2>
                              </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-3 border-t bg-white space-y-3">
                              {/* Product Name and Price */}
                              <div className="flex justify-between items-end">
                                <div className=" space-y-2">
                                  {singleKid?.barCode?.variant?.product
                                    ?.featuredImage && (
                                    <Image
                                      width={1000}
                                      height={1000}
                                      alt="Kid Photo"
                                      src={`${fileUrlKey()}/${
                                        singleKid?.barCode?.variant?.product
                                          ?.featuredImage
                                      }`}
                                      className="h-[70px] w-[70px] object-cover object-center rounded-full"
                                    />
                                  )}
                                  <h2 className="text-xl font-bold text-gray-800 tracking-wide">
                                    {singleKid?.barCode?.variant?.product
                                      ?.productName || "N/A"}
                                  </h2>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-xl font-semibold text-gray-700 mt-2">
                                      <span className="text-sm font-medium">
                                        Current Price:
                                      </span>{" "}
                                      $
                                      {singleKid?.barCode?.variant?.product
                                        ?.productPrice || "N/A"}
                                    </p>
                                  </div>
                                  {/* Product Status */}
                                  <div className="flex items-center space-x-2 justify-end">
                                    {singleKid?.barCode?.variant?.product
                                      ?.productStatus !== "AVAILABLE" ? (
                                      <FaTimesCircle className="text-red-500 text-2xl" />
                                    ) : (
                                      <FaCheckCircle className="text-green-600 text-2xl" />
                                    )}
                                    <p
                                      className={`${
                                        singleKid?.barCode?.variant?.product
                                          ?.productStatus !== "AVAILABLE"
                                          ? "text-red-500"
                                          : "text-green-600"
                                      } font-semibold text-lg`}
                                    >
                                      {singleKid?.barCode?.variant?.product
                                        ?.productStatus !== "AVAILABLE"
                                        ? "Out of Stock"
                                        : "In Stock"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                {/* Category Link */}

                                <h2 className="inline-block text-white bg-primary py-2 px-4 rounded-full font-medium tracking-wide transition-colors  ">
                                  {singleKid?.barCode?.variant?.product
                                    ?.category?.categoryName || "N/A"}
                                </h2>
                                {singleKid?.barCode?.variant?.product?.category
                                  ?.categoryHref ? (
                                  <Link
                                    href={`/category/${singleKid?.barCode?.variant?.product?.category?.categoryHref}`}
                                    className="text-primary hover:text-blue-600 hover:border-blue-600 border-b-[3px] border-primary text-base font-semibold    tracking-wide transition-colors  "
                                  >
                                    <span className="flex gap-2 items-center">
                                      Product Link
                                      <GrLinkNext />
                                    </span>
                                  </Link>
                                ) : (
                                  "Link not available"
                                )}
                              </div>
                            </div>
                          </div>
                        </Popover>
                      }
                      enterable
                    >
                      <button className="hover:bg-primary focus-within:bg-primary focus-within:text-white hover:text-white  p-1.5 rounded-full  border hover:border-transparent focus-within:border-transparent transition-all duration-300  ">
                        <FaInfo size={15} />
                      </button>
                    </Whisper>
                  </div>
                  <div className="p-1 space-y-3">
                    {/* Image */}
                    <div className="flex justify-center items-center p-1 md:p-4">
                      <Image
                        width={1000}
                        height={1000}
                        alt="Kid Photo"
                        src={
                          singleKid?.kidImage
                            ? `${fileUrlKey()}/${singleKid?.kidImage}`
                            : "/images/defaultPhoto.webp"
                        }
                        className="h-[350px] w-[350px] object-cover object-center rounded-full"
                      />
                    </div>

                    <div className="space-y-2 md:pt-3 md:pb-5 ">
                      {/* Name */}
                      <div className="flex justify-center items-center text-center  ">
                        <h2 className="text-3xl md:text-5xl font-bold">
                          {singleKid?.firstName} {singleKid?.lastName}
                        </h2>
                      </div>

                      {/* Age */}
                      <div className="flex justify-center items-center text-center  ">
                        <h2 className="text-lg md:text-2xl font-semibold">
                          {formatDuration(singleKid?.kidAge)}
                        </h2>
                      </div>

                      {/* Contacts */}
                      <div className="flex  justify-center items-center text-center  ">
                        <h2 className="md:text-xl font-semibold">
                          Total Contacts: {singleKid?.relations?.length}
                        </h2>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-center border-t  items-center p-2 md:py-5 md:px-5">
                      <div className="flex justify-between  w-full items-center gap-2 md:gap-5">
                        {/* View */}
                        <div>
                          <button
                            className="text-green-600 hover:bg-green-600 hover:text-white rounded-full p-2 duration-300 transition-all"
                            onClick={() =>
                              router.push(`/tag/${singleKid?.barCode?.code}`)
                            }
                          >
                            <LuEye size={30} />
                          </button>
                        </div>
                        {/* Edit */}
                        <div>
                          <button
                            className="text-blue-600 hover:bg-blue-600 hover:text-white rounded-full p-2 duration-300 transition-all"
                            onClick={() =>
                              router.push(
                                `/my-account/edit/${singleKid?.barCode?.code}`
                              )
                            }
                          >
                            <FiEdit size={30} />
                          </button>
                        </div>
                        {/* Delete */}
                        <div>
                          <button
                            className="text-[#eb0712db] hover:bg-red-600 hover:text-white rounded-full p-2 duration-300 transition-all"
                            onClick={() => {
                              setIsOpenDelete(true);
                              setDeleteData(singleKid);
                            }}
                          >
                            <RiDeleteBin5Line size={30} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* table */}

        <div className="pb-10">
          <div className="mt-10 bg-white shadow-lg p-5 border rounded-2xl ">
            <Pagination
              total={data?.data?.length || 0}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="md"
              layout={["total", "-", "limit", "skip"]}
              limitOptions={[10, 20, 50]}
              limit={10}
              // onChangeLimit={(limitChange) => setSize(limitChange)}
              // activePage={page}
              // onChangePage={setPage}
            />
          </div>
        </div>
        <>
          {/* delete kid modal */}
          <DeleteKidConfirmationModal
            handleClose={handleClose}
            open={isOpenDelete}
            deleteData={deleteData}
          />
        </>
      </div>
    </section>
  );
};

export default MyAllKids;
