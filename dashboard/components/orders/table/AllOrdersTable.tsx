"use client";
import icons8Edit from "@/public/images/icon/icons8-edit.svg";
import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Accordion,
  Input,
  InputGroup,
  Loader,
  Pagination,
  SelectPicker,
} from "rsuite";
import { BiSearch } from "react-icons/bi";
import { useGetAllOrdersQuery } from "@/redux/features/orderApi";
import OrderEditModal from "./OrderEditModal";
import OrderEditShippingInformation from "./OrderEditShippingInformation";
import ProductListTable from "./ProductListTable";

const AllOrderList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("");

  query["orderStatus"] = orderStatus;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  //data Format

  const formatDate = (dateString: any) => {
    const options: any = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const { data: allOrders, isLoading } = useGetAllOrdersQuery(query);

  const orderStatusFilter = [
    "PENDING",
    "CONFIRMED",
    "CANCELED",
    "REJECTED",
    "DELIVERED",
  ].map((item) => ({ label: item, value: item }));

  // Status Modal Open and Close

  const [open, setOpen] = useState<any>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Shipping Information Modal

  const [shippingInfo, setShippingInfo] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [placement, setPlacement] = useState();

  const shippingEdit = (key: any) => {
    setOpenDrawer(true);
    setPlacement(key);
    console.log("key", key);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0 p-5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Orders
          </h4>

          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div>
              <SelectPicker
                placeholder="Order Filter By Status"
                data={orderStatusFilter}
                className="w-60"
                searchable={false}
                onChange={(value: any) => {
                  setOrderStatus(value);
                }}
              />
            </div>

            <div>
              <InputGroup
                inside
                style={{
                  width: 300,
                }}
              >
                <Input
                  style={{
                    width: 300,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by order Id..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 p-2">
          {isLoading && (
            <div className="flex justify-center items-center">
              {" "}
              <Loader size="md" content="Loading..." />
            </div>
          )}

          {allOrders?.data?.data?.length > 0 ? (
            allOrders?.data?.data?.map((order: any, index: any) => (
              // Place your code for rendering each order here
              // For example:
              <div key={index}>
                {
                  <Accordion bordered>
                    <Accordion.Panel
                      header={
                        <div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-2 lg:gap-0 ">
                          <div className="flex flex-col justify-start">
                            <h1 className="text-lg font-bold">
                              Order No : {order?.orderId}
                            </h1>
                            <p className="text-sm font-medium">
                              Created: {formatDate(order?.createdAt)}
                            </p>
                          </div>
                          <div className="flex flex-col justify-start items-start w-46">
                            <p className="text-lg font-bold">
                              <span>$</span>  {order?.paymentInfo?.amountPaid}
                            </p>
                            <p className="text-xs">
                              Order Status :{" "}
                              <span
                                className={`${
                                  order?.orderStatus === "PENDING" &&
                                  "text-[#CA8A04] px-2 py-1 bg-[#FEF9C3] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "CONFIRMED" &&
                                  "text-success px-2 py-1 bg-[#BBF7D0] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "REJECTED" &&
                                  "text-danger px-2 py-1 bg-[#FEE2E2] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "CANCELED" &&
                                  "text-[#475569] px-2 py-1 bg-[#CBD5E1] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "DELIVERED" &&
                                  "text-[#0284C7] px-2 py-1 bg-[#BAE6FD] font-semibold rounded-full"
                                }`}
                              >
                                {order?.orderStatus}
                              </span>
                            </p>
                          </div>
                        </div>
                      }
                    >
                      <div className="">
                        <div>
                          <div className="mb-5">
                            <button
                              className="text-primary flex gap-[2px] items-center font-semibold"
                              onClick={handleOpen}
                            >
                              <Image
                                src={icons8Edit}
                                width={20}
                                height={20}
                                alt="icons8Edit"
                              />
                              Edit Status
                            </button>
                            <OrderEditModal
                              open={open}
                              order={order}
                              handleClose={handleClose}
                            />
                          </div>
                        </div>
                        {/* Client Info */}
                        <section className="md:flex gap-3 max-md:space-y-3">
                          {/* shipping information */}
                          <div className=" w-full p-3 rounded-md border-2  border-[#CBD5E1] ">
                            <div className="flex items-center justify-between">
                              <h1 className="text-xl font-semibold">
                                Shipping Information
                              </h1>
                              <div
                                className="flex gap-[2px] cursor-pointer"
                                onClick={() => {
                                  shippingEdit("right");
                                  setShippingInfo(order?.deliveryInfo);
                                }}
                              >
                                <Image
                                  src={icons8Edit}
                                  width={20}
                                  height={20}
                                  alt="icons8Edit"
                                />
                                <span className="font-bold text-primary">
                                  Edit
                                </span>
                              </div>
                            </div>
                            <div>
                              <p>
                                Name:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.firstName}
                                </span>
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.lastName}
                                </span>
                              </p>
                              <p>
                                email:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.email}
                                </span>
                              </p>
                              <p>
                                phone:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.phone}
                                </span>
                              </p>
                              <p>
                                Address:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.address}
                                </span>
                              </p>
                              <p>
                                City:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.city}
                                </span>
                              </p>
                              <p>
                                State:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.state}
                                </span>
                              </p>
                              <p>
                                Postal Code:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.postalCode}
                                </span>
                              </p>
                              <p>
                                Note:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.deliveryInfo?.note}
                                </span>
                              </p>
                            </div>
                          </div>
                        </section>
                        {/* Delivery & Product */}
                        <div className=" border-[#CBD5E1] border-2 shadow-2 rounded-md my-4">
                          <div className="flex flex-col gap-1">
                            <div className="grid grid-cols-1 gap-2 !bg-gray-50">
                              <div className="px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col">
                                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle">
                                      <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                                        <table className="min-w-full divide-y divide-gray-300">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                              >
                                                Product Name
                                              </th>
                                              <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                              >
                                                Quantity
                                              </th>
                                              <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                              >
                                                Price
                                              </th>
                                              <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                              >
                                                Total Price
                                              </th>
                                            </tr>
                                          </thead>
                                          {order?.cartItems?.map(
                                            (product: any, index: any) => (
                                              <ProductListTable
                                                key={index}
                                                product={product}
                                              />
                                            )
                                          )}
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Payment Info */}
                        <div className="px-4">
                          <div className="flex justify-end">
                            <div className="w-1/4">
                              <p className="flex justify-between">
                                Total Grand:{" "}
                                <span className="text-black font-medium">
                                  ${" "}
                                  {order?.paymentInfo?.amountPaid}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                Total Vat:{" "}
                                <span className="text-black font-medium">
                                  ${" "}
                                  {order?.paymentInformation?.taxes.toFixed(2)}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                Total Gross:{" "}
                                <span className="text-black font-medium">
                                  ${" "}
                                  {order?.paymentInformation?.total.toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                }
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <h1>No Orders Found</h1>
            </div>
          )}
        </div>

        <div>
          <OrderEditShippingInformation
            placement={placement}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            order={shippingInfo}
          />
        </div>
        <div style={{ padding: 20 }}>
          <Pagination
            total={allOrders?.meta?.total}
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="md"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            limitOptions={[10, 20, 30, 50, 100, 150, 200]}
            limit={size}
            onChangeLimit={(limitChange) => setSize(limitChange)}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default AllOrderList;
