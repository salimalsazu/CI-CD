"use client";
import { useDebounced } from "@/redux/hook";
import { useState } from "react";
import { Input, InputGroup, Pagination, Popover, Table, Whisper } from "rsuite";
import { BiSearch } from "react-icons/bi";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DeleteBlogConfirmationModal from "@/components/blogs/DeleteBlogConfirmationModal";
import { useGetAllCommentsQuery } from "@/redux/features/blogs/commentApi";
import DeleteCommentConfirmationModal from "@/components/blogs/DeleteCommentConfirmationModal";
const { Cell, Column, HeaderCell } = Table;
// !

const AllCommentsPage = () => {
  const router = useRouter();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
    data: allComments,
    isLoading,
    isFetching,
  } = useGetAllCommentsQuery({ ...query });
  // ! for deleting blog
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default    sm:px-7.5 xl:pb-1">
        <div className="flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Comments | {allComments?.meta?.total}
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
                  placeholder="Search here..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        <div className="rounded-sm mb-5 bg-white  ">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            rowExpandedHeight={160}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allComments?.data}
          >
            {/* Blog Title */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Blog Title</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="blog.title"
              />
            </Column>
            {/* Category name */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Comment</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="comment" />
            </Column>
            {/* name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Name</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="name" />
            </Column>
            {/* email */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Email</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="email" />
            </Column>

            {/* Action */}

            <Column width={100} align="center">
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <div className="flex gap-3">
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

          <div style={{ padding: 20 }}>
            <Pagination
              total={allComments?.meta?.total}
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

      {/* delete confirmation */}
      <DeleteCommentConfirmationModal
        isOpenDelete={isOpenDelete}
        handleCloseDelete={handleCloseDelete}
        deleteData={deleteData}
      />
    </>
  );
};

export default AllCommentsPage;
