"use client";
import {
  useGetSingleVariantQuery,
  useGetVariantQuery,
} from "@/redux/features/productsApi";
import { useEffect, useState } from "react";
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
  Tooltip,
  Whisper,
} from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdKeyboardArrowRight, MdModeEdit } from "react-icons/md";
const { Column, HeaderCell, Cell } = Table;
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RiDeleteBinFill } from "react-icons/ri";
import BarCodeDeleteModal from "@/components/products/barcode-list/BarCodeDeleteModal";
import BarCodeDelete from "@/components/products/barcode-list/BarCodeDelete";
import InfoIcon from "@rsuite/icons/legacy/Info";
import moment from "moment";
import { predefinedRanges } from "@/helpers/constant";
import { barCodeStatus } from "@/helpers/selectPickerVars/ProductSelectVars";
import { FiEdit2 } from "react-icons/fi";
import { useUpdateBarcodeStatusMutation } from "@/redux/features/barCodeApi";
import BarcodeCreatePopover from "@/components/products/barcode-list/BarcodeCreatePopover";

const AllProductList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [barcodeStatus, setBarcodeStatus] = useState<string>("");

  query["barcodeStatus"] = barcodeStatus;
  query["categoryName"] = categoryFilter;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId");

  const {
    data: singleVariant,
    isLoading,
    isFetching,
  } = useGetSingleVariantQuery(variantId ? { variantId, ...query } : null);

  const cleanSelectedKeys = () => setCheckedKeys([]);
  console.log(singleVariant, "singleVariant");
  //Variant Select As per Product
  const { data: allVariant } = useGetVariantQuery({});

  const findVariant = allVariant?.data?.find(
    (item: any) => item?.variantId === variantId
  );
  console.log(allVariant, "allVariant");
  console.log(findVariant, "findVariant");

  //Delete Modal
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  //checked box
  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === singleVariant?.data?.data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < singleVariant?.data?.data?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? singleVariant?.data?.data?.map((item: any) => item.barcodeId)
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

  return (
    <>
      <div className="grid grid-cols-2 mb-2">
        <div className="flex items-center mb-2 text-sm text-[#2563eb]">
          <Link href={"/"} className="underline-offset-8">
            Dashboard
          </Link>
          <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
          <Link href={`/products`}>All products</Link>
          <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
          <Link
            href={`/products/variants?productId=${findVariant?.product?.productId}`}
          >
            Variants
          </Link>
          <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
          <p className="font-bold">Qr Code</p>
        </div>

        <div>
          <p className="text-green-500 font-semibold text-sm">
            {`* Multiple deletes will work after choosing the product status 'INACTIVE' and select the checkbox.`}
          </p>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-3 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-5 mb-2">
            <p>
              Product Name:{" "}
              <span className="font-semibold">
                {findVariant?.product?.productName}
              </span>
            </p>
            <p>
              Color:{" "}
              <span className="font-semibold">{findVariant?.color?.name}</span>
            </p>
          </div>
          <div>
            <BarcodeCreatePopover variantId={findVariant?.variantId} />
          </div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            {barcodeStatus === "INACTIVE" && checkedKeys?.length > 0 && (
              <div>
                <BarCodeDelete
                  barcodeIds={checkedKeys}
                  cleanSelectedKeys={cleanSelectedKeys}
                />
              </div>
            )}

            {/* status filter */}
            <div>
              <SelectPicker
                placeholder="Product Filter By Status"
                data={barCodeStatus}
                searchable={false}
                onChange={(value: any) => {
                  setBarcodeStatus(value);
                }}
                style={{
                  width: 300,
                }}
              />
            </div>

            <div>
              <DateRangePicker
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
                size="md"
                // style={{ width: "30%" }}
                placeholder="Filter By Product Created Date"
              />
            </div>
            <div>
              <InputGroup
                inside
                style={{
                  width: 400,
                }}
              >
                <Input
                  style={{
                    width: 300,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by barcode..."
                />
                <InputGroup.Addon>
                  <Whisper
                    placement="top"
                    speaker={<Tooltip> Barcode Search</Tooltip>}
                  >
                    <InfoIcon />
                  </Whisper>
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
            data={singleVariant?.data?.data || []}
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

            {/* Qr Code */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Qr Code</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => `${rowData.code}`}
              </Cell>
            </Column>

            {/* Qr Code */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Status</HeaderCell>
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
                              <Dropdown.Item eventKey={"ACTIVE"}>
                                ACTIVE
                              </Dropdown.Item>
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
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Created</HeaderCell>
              <Cell
                // style={cellCss}
                verticalAlign="middle"
                dataKey="createdAt"
              >
                {(rowData) => ` ${moment(rowData.createdAt).format("ll")}`}
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

          <div>
            <BarCodeDeleteModal
              isOpenDelete={isOpenDelete}
              handleCloseDelete={handleCloseDelete}
              deleteData={deleteData}
            />
          </div>

          <div style={{ padding: 20 }}>
            <Pagination
              total={singleVariant?.data?.meta?.total || 0}
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

export default AllProductList;
