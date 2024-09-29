"use client";

import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetAllPaymentsQuery } from "@/redux/features/paymentApi";
import moment from "moment";
import { RiPaypalFill } from "react-icons/ri";

const PaymentListTable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allPayments,
    isLoading,
    isFetching,
  } = useGetAllPaymentsQuery({ ...query });

  console.log(allPayments, "allPayments");

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center   pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Payment List | {allPayments?.meta?.total}
            </h2>
          </div>

          <div className="flex max-md:justify-between gap-10 items-center">
            <div>
              <InputGroup
                inside
                style={{
                  width: 500,
                }}
              >
                <Input
                  style={{
                    width: 400,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by Order No / Transaction id / Platform id and customer email..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="rounded-sm mb-5 bg-white  shadow-default dark:border-strokedark dark:bg-boxdark">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={100}
            headerHeight={50}
            rowExpandedHeight={160}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            // autoHeight={true}
          
            height={500}
            hover={false}
            data={allPayments?.data}
          >
            {/* order information */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Order Information</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="id">
                {(rowData: any) => (
                  <div>
                    <div className="truncate w-[150px]">
                      <p className="text-bodydark2">Order no:</p>
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={
                          <Tooltip>{rowData?.order?.partyOrderId}</Tooltip>
                        }
                      >
                        <span> {rowData?.order.partyOrderId}</span>
                      </Whisper>
                    </div>
                    <div className="truncate w-[150px]">
                      <p className="text-bodydark2">Platform Id:</p>
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={<Tooltip>{rowData?.platformOrderId}</Tooltip>}
                      >
                        <span> {rowData?.platformOrderId}</span>
                      </Whisper>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Transaction info */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Transaction Info</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="id">
                {(rowData: any) => (
                  <div>
                    <div className="truncate w-[150px]">
                      <p className="text-bodydark2">Transaction id:</p>
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={
                          <Tooltip>{rowData?.platformTransactionId}</Tooltip>
                        }
                      >
                        <span> {rowData?.platformTransactionId}</span>
                      </Whisper>
                    </div>
                    <div className="truncate w-[150px]">
                      <p className="text-bodydark2">Payment id:</p>
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={<Tooltip>{rowData?.platformOrderId}</Tooltip>}
                      >
                        <span> {rowData?.platformOrderId}</span>
                      </Whisper>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Payer Info */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Payer Info</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="id">
                {(rowData: any) => (
                  <div>
                    <p>{rowData?.payerName}</p>
                    <div className="truncate w-[150px]">
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={
                          <Tooltip>{rowData?.payerEmailAddress}</Tooltip>
                        }
                      >
                        <span>{rowData?.payerEmailAddress}</span>
                      </Whisper>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Customer Info */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Customer Info</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="id">
                {(rowData: any) => (
                  <div>
                    <p>{rowData?.user?.profile?.fullName}</p>
                    <div className="truncate w-[150px]">
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={<Tooltip>{rowData?.user?.email}</Tooltip>}
                      >
                        <span>{rowData?.user?.email}</span>
                      </Whisper>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>
            {/* amount info */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Amount Info</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="id">
                {(rowData: any) => (
                  <div>
                    <p>
                      <span className="text-bodydark2">Pay: </span>
                      {rowData?.amountToPay} €
                    </p>
                    <p>
                      <span className="text-bodydark2">Paid: </span>
                      {rowData?.amountPaid} €
                    </p>
                    <p>
                      <span className="text-bodydark2">Fee: </span>
                      {rowData?.platformFee} €
                    </p>
                    <p>
                      <span className="text-bodydark2">Net: </span>
                      {rowData?.netAmount} €
                    </p>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Payment Status */}
            <Column flexGrow={1.2}>
              <HeaderCell style={headerCss}>Payment Status</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="id">
                {(rowData: any) => (
                  <div>
                    <p>
                      {/* Time:{" "} */}
                      {moment(rowData.createdAt)
                        .locale("de")
                        .format("ll, HH:mm [Uhr] ")}
                      <span></span>
                    </p>
                    <p className="">
                      <span className="text-[#16A34A] font-semibold py-[2px] bg-[#DCFCE7] marker:[9] px-2 rounded-full">
                        {rowData?.paymentStatus}
                      </span>
                    </p>
                    {rowData?.platform == "PAYPAL" ? (
                      <p className="text-primary mt-1">
                        <RiPaypalFill size={20} />
                      </p>
                    ) : null}
                    {/* <p>{rowData?.platform} </p> */}
                  </div>
                )}
              </Cell>
            </Column>
          </Table>

          <div style={{ padding: 20 }}>
            <Pagination
              total={allPayments?.meta?.total}
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
      </div>
    </>
  );
};

export default PaymentListTable;
