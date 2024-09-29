"use client";

import Image from "next/image";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Button,
  Checkbox,
  DateRangePicker,
  Dropdown,
  Input,
  InputGroup,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
import { fileUrlKey, getClientUrl } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import { FaPlus } from "react-icons/fa";
import { LiaFileExportSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { predefinedRanges } from "@/helpers/constant";
import {
  useGetBarcodeForPrintQuery,
  useUpdateBarcodeStatusMutation,
} from "@/redux/features/barCodeApi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import BarcodeDeleteModal from "../modal/BarcodeDeleteModal";
import { barCodeStatus } from "@/helpers/selectPickerVars/ProductSelectVars";
import BarCodeDelete from "../barcode-list/BarCodeDelete";
import moment from "moment";
import { saveExcel } from "@/utils/ExportToExcel";
import { barCodeColumns } from "@/constants/exportColumns.const";
import { saveCSV } from "@/utils/ExportToCSV";

const ProductBarcode = () => {
  const router = useRouter();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [barcodeStatus, setBarcodeStatus] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  // Modal
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);
  const cleanSelectedKeys = () => setCheckedKeys([]);
  // !

  // for queries
  query["barcodeStatus"] = barcodeStatus;
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // ! fetching data
  const {
    data: allBarCodeList,
    isLoading,
    isFetching,
  } = useGetBarcodeForPrintQuery({ ...query });

  // Filter date
  const handleFilterDate = (date: Date[] | null) => {
    if (!date?.length) {
      setSelectedDate({
        startDate: "",
        endDate: "",
      });
    }

    if (date) {
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);

      // Set the start time to 00:00:00 (12:00 AM)
      startDate.setHours(0, 0, 0, 0);

      // Set the end time to 23:59:59 (11:59 PM)
      endDate.setHours(23, 59, 59, 999);

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      if (startDate !== null && endDate !== null) {
        setSelectedDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  // export render menu
  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };

    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          {/* Export to Excel */}
          <Dropdown.Item
            disabled={!isLoading && !allBarCodeList?.data?.length}
            onClick={() =>
              saveExcel({
                allBarCodeList,
                checkedBoxData,
                columns: barCodeColumns,
              })
            }
            eventKey={1}
          >
            Export to Excel Sheet
          </Dropdown.Item>

          {/* Export to CSV */}
          <Dropdown.Item
            disabled={!isLoading && !allBarCodeList?.data?.length}
            onClick={() =>
              saveCSV({
                allBarCodeList,
                checkedBoxData,
                columns: barCodeColumns,
              })
            }
            eventKey={2}
          >
            Export to CSV
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const checkedBoxData = allBarCodeList?.data?.filter((obj: any) =>
    checkedKeys.includes(obj.barcodeId)
  );

  // ! export to excel -------------------------------------------------

  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === allBarCodeList?.data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < allBarCodeList?.data?.length
  ) {
    indeterminate = true;
  }

  //! check box

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? allBarCodeList?.data?.map((item: any) => item.barcodeId)
      : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value: any, check: any) => {
    const keys = check
      ? [...checkedKeys, value]
      : checkedKeys.filter((item: any) => item !== value);
    setCheckedKeys(keys);
  };

  const CheckCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }: any) => {
    return (
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    );
  };

  //BarCode Status Change

  const [barcodeStatusChange] = useUpdateBarcodeStatusMutation();

  const barCodeStatusChange = async (eventKey: string, rowData: any) => {
    const objData = {
      barcodeStatus: eventKey,
    };

    await barcodeStatusChange({
      barcodeId: rowData?.barcodeId,
      data: objData,
    });
  };

  //

  return (
    <>
      <div className="mb-3 flex gap-2 justify-between">
        <h2 className="text-sm font-semibold ">
          Barcode List | {allBarCodeList?.meta?.total}
        </h2>
        <div>
          <Whisper
            placement="bottomEnd"
            speaker={renderMenu}
            trigger={["click"]}
          >
            <button
              type="button"
              className="border w-full flex justify-center items-center gap-2  border-primary py-1  rounded-lg   text-primary font-medium hover:bg-primary/10 duration-300"
            >
              <span>
                <LiaFileExportSolid size={25} />
              </span>
              <span>Export</span>
            </button>
          </Whisper>
        </div>
      </div>

      <div className="rounded-sm px-2 border border-stroke bg-white pt-6 pb-2.5 shadow-default xl:pb-1">
        <div className="grid grid-cols-4 items-center mb-5">
          <div>
            {barcodeStatus === "INACTIVE" && checkedKeys?.length > 0 && (
              <BarCodeDelete
                barcodeIds={checkedKeys}
                cleanSelectedKeys={cleanSelectedKeys}
              />
            )}
          </div>

          {/* filters */}
          <div>
            <InputGroup inside>
              <Input
                onChange={(e) => setSearchTerm(e)}
                placeholder="Search by barcode..."
              />
              <InputGroup.Addon>
                <BiSearch />
              </InputGroup.Addon>
            </InputGroup>
          </div>

          {/* status filter */}
          <div className="w-full">
            <SelectPicker
              className="w-full"
              placeholder="Product Filter By Status"
              data={barCodeStatus}
              searchable={false}
              onChange={(value: any) => {
                setBarcodeStatus(value);
              }}
            />
          </div>
          {/* date range */}
          <div className="w-full">
            <DateRangePicker
              className="w-full"
              // @ts-ignore
              ranges={predefinedRanges}
              placement="bottomEnd"
              onChange={(value: Date[] | null): void => {
                handleFilterDate(value);
              }}
              onClean={() =>
                setSelectedDate({
                  startDate: "",
                  endDate: "",
                })
              }
              style={{ width: "100%" }}
              size="md"
              placeholder="Filter By Product Created Date"
            />
          </div>
          {/*  */}
        </div>
        <div className="col-span-2 flex justify-center items-center gap-3">
          {/* Generate File */}

          <div className="w-full">
            {/*  add product button */}

            {/* <button
                onClick={() => {
                  router.push("/products/add-products");
                }}
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-primary py-1 rounded-lg text-white"
              >
                <span>
                  <FaPlus />
                </span>
                <span>Add Product</span>
              </button> */}
          </div>
        </div>

        {/*  */}
        <div className="rounded-sm bg-white   ">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allBarCodeList?.data}
          >
            <Column width={50} align="center" verticalAlign="middle">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: "40px" }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>

              <Cell>
                {(rowData) => (
                  <div>
                    <CheckCell
                      dataKey="barcodeId"
                      rowData={rowData}
                      checkedKeys={checkedKeys}
                      onChange={handleCheck}
                    />
                  </div>
                )}
              </Cell>
            </Column>

            {/*img*/}
            <Column width={70}>
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
                              rowData?.variant?.image
                                ? `${fileUrlKey()}/${rowData?.variant?.image}`
                                : "/images/no-image.png"
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
                          rowData?.variant?.image
                            ? `${fileUrlKey()}/${rowData?.variant?.image}`
                            : "/images/no-image.png"
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>
            {/* product name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.product.productName"
              />
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Variant Price</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.variantPrice"
              />
            </Column>
            {/* product short summary */}
            <Column flexGrow={1} minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                ProductColor
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.color.name"
              />
            </Column>

            {/* Barcode */}
            <Column flexGrow={3}>
              <HeaderCell style={headerCss}>QR Code Link</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="code">
                {(rowData) => `${getClientUrl()}/tag/${rowData.code}`}
              </Cell>
            </Column>

            {/* Barcode */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>QR Code Status</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <div className="flex items-center justify-between   gap-3 !w-full">
                    <div className="w-[80px]">{rowData.barcodeStatus} </div>
                    <div>
                      <Whisper
                        placement="bottomStart"
                        controlId="control-id-with-dropdown"
                        trigger="click"
                        speaker={
                          <Popover full>
                            <Dropdown.Menu
                              onSelect={(eventKey) =>
                                barCodeStatusChange(eventKey as string, rowData)
                              }
                            >
                              <Dropdown.Item eventKey={"INACTIVE"}>
                                INACTIVE
                              </Dropdown.Item>
                              <Dropdown.Item eventKey={"AVAILABLE"}>
                                AVAILABLE
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Popover>
                        }
                      >
                        <Button>
                          <FiEdit2 />
                        </Button>
                      </Whisper>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Created At */}
            <Column width={115}>
              <HeaderCell style={headerCss}>Created</HeaderCell>
              <Cell
                // style={cellCss}
                verticalAlign="middle"
                dataKey="variant.size"
              >
                {(rowData) => ` ${moment(rowData.createdAt).format("ll")}`}
              </Cell>
            </Column>

            {/* Action */}

            <Column width={70}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
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
                )}
              </Cell>
            </Column>
          </Table>

          <div>
            <BarcodeDeleteModal
              isOpenDelete={isOpenDelete}
              handleCloseDelete={handleCloseDelete}
              deleteData={deleteData}
            />
          </div>

          <div style={{ padding: 20 }}>
            <Pagination
              total={allBarCodeList?.meta?.total}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="md"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[10, 20, 30, 50, 100, 150, 200, 500]}
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

export default ProductBarcode;
