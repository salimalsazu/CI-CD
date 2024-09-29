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
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { RiDeleteBinFill } from "react-icons/ri";

import TestimonialEditTable from "./TestimonialEditModal";
import { useGetTestimonialQuery } from "@/redux/features/testimonialApi";
import DeleteTestimonialModal from "./DeleteTestimonialModal";

const TestimonialTableSection = () => {
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
    data: allTestimonial,
    isLoading,
    isFetching,
  } = useGetTestimonialQuery({
    ...query,
  });

  console.log(allTestimonial);

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
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Testimonial | {allTestimonial?.meta?.total}
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
                  placeholder="Search by Client name..."
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
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allTestimonial?.data}
          >
            {/*img*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Image</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <Whisper
                    placement="auto"
                    speaker={
                      <Popover>
                        <div>
                          <Image
                            width={270}
                            height={270}
                            alt=""
                            src={
                              rowData?.clientImage
                                ? `${fileUrlKey()}/${rowData?.clientImage}`
                                : noImage
                            }
                            className="object-cover"
                          />
                        </div>
                      </Popover>
                    }
                  >
                    <div>
                      <Image
                        width={120}
                        height={120}
                        alt=""
                        src={
                          rowData?.clientImage
                            ? `${fileUrlKey()}/${rowData?.clientImage}`
                            : noImage
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>
            {/* Item Description */}
            <Column flexGrow={1} minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Client Name
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="clientName"
              />
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Testimonial Title</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="testimonialTitle"
              />
            </Column>
            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Description</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="testimonialDescription"
              />
            </Column>
            <Column width={100}>
              <HeaderCell style={headerCss}>Rating</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="rating" />
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
          <DeleteTestimonialModal
            isOpenDelete={isOpenDelete}
            handleCloseDelete={handleCloseDelete}
            deleteData={deleteData}
          />

          <div style={{ padding: 20 }}>
            <Pagination
              total={allTestimonial?.meta?.total}
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
      <TestimonialEditTable
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default TestimonialTableSection;
