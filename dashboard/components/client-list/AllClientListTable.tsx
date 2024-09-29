"use client";

import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { Input, InputGroup, Pagination, Popover, Table, Whisper } from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { BiSearch } from "react-icons/bi";
import { useGetAllClientsQuery } from "@/redux/features/userApi";
import moment from "moment";
const { Column, HeaderCell, Cell } = Table;

const AllClientListTable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["role"] = "USER";
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: getAllUsers,
    isLoading,
    isFetching,
  } = useGetAllClientsQuery({ ...query });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center   pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Client List | {getAllUsers?.data?.meta?.total}
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
          data={getAllUsers?.data?.data}
        >
          {/* Full Name */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Full Name</HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="profile.fullName"
            />
          </Column>

          {/* Email */}
          <Column flexGrow={1} minWidth={105}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Email
            </HeaderCell>
            <Cell style={cellCss} verticalAlign="middle" dataKey="email" />
          </Column>
          {/* phone number */}
          <Column flexGrow={1} minWidth={105}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Phone Number
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="profile.phoneNumber"
            />
          </Column>
          {/* Address 1 */}
          <Column flexGrow={1}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Address 1
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="profile.addressLine1"
            />
          </Column>
          {/* companyName */}
          <Column flexGrow={1}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Company
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="profile.companyName"
            />
          </Column>
          {/* Total Orders */}
          <Column width={100} align="center">
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Total Orders
            </HeaderCell>
            <Cell
              align="center"
              style={cellCss}
              verticalAlign="middle"
              dataKey="_count.order"
            />
          </Column>
          {/* Registered */}
          <Column width={110} align="center">
            <HeaderCell style={headerCss}>Registered</HeaderCell>
            <Cell
              style={cellCss}
              align="center"
              verticalAlign="middle"
              dataKey="createdAt"
            >
              {(rowData) => <p>{moment(rowData?.createdAt).format("l")}</p>}
            </Cell>
          </Column>
        </Table>
        {/* Pagination */}
        <div style={{ padding: 20 }}>
          <Pagination
            total={getAllUsers?.data?.meta?.total}
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="md"
            layout={["-", "limit", "|", "pager", "skip"]}
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

export default AllClientListTable;
