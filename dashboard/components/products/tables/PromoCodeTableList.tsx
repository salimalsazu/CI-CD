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
  Tag,
  TagGroup,
  Whisper,
} from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import { RiDeleteBinFill } from "react-icons/ri";

import { useGetPromoQuery } from "@/redux/features/promoCodeApi";
import PromoCodeDeleteConfirmationModal from "../modal/PromoCodeDeleteConfirmationModal";
import PromoCodeEditModal from "../modal/PromoCodeEditModal";
import moment from "moment";

const PromoCodeTableList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productFilter, setProductFilter] = useState<string>("");

  query["productName"] = productFilter;

  //   const router = useRouter();
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  //Filter By Product

  //Data Fetch for testimonial

  const {
    data: allPromo,
    isLoading,
    isFetching,
  } = useGetPromoQuery({
    ...query,
  });

  console.log("allPromo", allPromo?.data?.data?.promotions);

  const [editData, setEditData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // close modal
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark px-3 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Promo Code | {allPromo?.meta?.total}
            </h2>
          </div>
          <div className="flex max-md:justify-between gap-10 items-center">
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
                  placeholder="Search by Promo Code..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={90}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allPromo?.data?.data?.promotions}
          >
            {/*  Promotion Name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Promotion Name</HeaderCell>
              <Cell
                className="m-2"
                style={cellCss}
                verticalAlign="middle"
                dataKey="clientName"
              >
                {(rowData: any) => {
                  return rowData.promotionName;
                }}
              </Cell>
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Code</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="promoCode"
              />
            </Column>
            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Type</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="type" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Start</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="startDate">
                {(rowData: any) => {
                  return moment(rowData.startDate)?.format("MM/DD/YYYY");
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>End</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="endDate">
                {(rowData: any) => {
                  return moment(rowData.endDate)?.format("MM/DD/YYYY");
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Purchase Product</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="buy">
                {(rowData: any) => {
                  return rowData.buyItemGetItemPromotion
                    ? rowData.buyItemGetItemPromotion?.requiredItem?.productName
                    : "N/A";
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Purchase Product Qty</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="buy">
                {(rowData: any) => {
                  return rowData.buyItemGetItemPromotion
                    ? rowData.buyItemGetItemPromotion?.requiredQuantity
                    : "N/A";
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Reward Product</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="get">
                {(rowData: any) => {
                  return rowData.buyItemGetItemPromotion
                    ? rowData.buyItemGetItemPromotion?.rewardItem?.productName
                    : "N/A";
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Reward Product Qty</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="buy">
                {(rowData: any) => {
                  return rowData.buyItemGetItemPromotion
                    ? rowData.buyItemGetItemPromotion?.rewardQuantity
                    : "N/A";
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Active</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="threshold">
                {(rowData: any) => {
                  return rowData.isActive === true ? "True" : "False";
                }}
              </Cell>
            </Column>
            {/* Action */}

            <Column width={100}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <div className="flex items-center gap-1">
                    <Whisper
                      placement="topEnd"
                      speaker={
                        <Popover
                          className="border !bg-[#614ae4] text-white font-semibold rounded-full !py-1.5 !px-5"
                          arrow={false}
                        >
                          Edit
                        </Popover>
                      }
                    >
                      <IconButton
                        onClick={() => {
                          setIsOpenEdit(true);
                          setEditData(rowData);
                        }}
                        circle
                        icon={<MdModeEdit size={20} />}
                      />
                    </Whisper>
                    {/* Delete */}
                    <Whisper
                      placement="topEnd"
                      speaker={
                        <Popover
                          className=" font-semibold rounded-full !py-1.5 "
                          arrow={false}
                        >
                          Delete
                        </Popover>
                      }
                    >
                      <button
                        className="  hover:text-[#eb0712db] "
                        onClick={() => {
                          setIsOpenDelete(true);
                          setDeleteData(rowData);
                        }}
                      >
                        <RiDeleteBinFill size={20} />
                      </button>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>

          {/* delete confirmation */}
          <PromoCodeDeleteConfirmationModal
            isOpenDelete={isOpenDelete}
            handleCloseDelete={handleCloseDelete}
            deleteData={deleteData}
          />

          <div style={{ padding: 20 }}>
            <Pagination
              total={allPromo?.meta?.total}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="md"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[5, 20, 30, 50, 100, 150, 200]}
              limit={size}
              onChangeLimit={(limitChange) => setSize(limitChange)}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <PromoCodeEditModal
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default PromoCodeTableList;
