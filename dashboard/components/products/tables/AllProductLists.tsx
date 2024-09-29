"use client";

import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Button,
  ButtonToolbar,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdKeyboardArrowRight, MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import Link from "next/link";
import ProductEditModal from "../modal/ProductEditModal";
import { RiDeleteBinFill } from "react-icons/ri";
import ProductDeleteModal from "../modal/ProductDeleteModal";

const AllProductList = () => {
  const router = useRouter();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  // Drawer
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  // for queries
  query["categoryName"] = categoryFilter;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // fetching all products
  const {
    data: allProductsList,
    isLoading,
    isFetching,
  } = useGetProductQuery({ ...query });
  // fetching all categories
  const { data: allCategories } = useGetCategoryQuery({});

  // close modal function
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  const categoryFilterForProduct = allCategories?.data?.map(
    (category: any) => ({
      label: category.categoryName,
      value: category.categoryName,
    })
  );

  //Delete Modal

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  return (
    <>
      <div className="flex items-center mb-2 text-sm text-[#2563eb]">
        <Link href={"/"} className="underline">
          Dashboard
        </Link>

        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />

        <p className="font-bold">All products</p>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Products | {allProductsList?.meta?.total}
            </h2>
          </div>

          <div className="flex max-md:justify-between gap-10 items-center">
            <div>
              <SelectPicker
                placeholder="Product Filter By Category"
                data={categoryFilterForProduct}
                className="w-60"
                searchable={false}
                onChange={(value: any) => {
                  setCategoryFilter(value);
                }}
                style={{
                  width: 300,
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
                  placeholder="Search by product name..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>

            <button
              onClick={() => {
                router.push("/products/add-products");
              }}
              className="  px-3 py-2 rounded-xl  flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </div>

        {/*  */}
        <div className="rounded-sm bg-white      ">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allProductsList?.data || []}
          >
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
                              rowData?.featuredImage
                                ? `${fileUrlKey()}/${rowData?.featuredImage}`
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
                          rowData?.featuredImage
                            ? `${fileUrlKey()}/${rowData?.featuredImage}`
                            : noImage
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
                dataKey="productName"
              />
            </Column>

            {/* Item Description */}
            <Column flexGrow={1} minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Product Description
              </HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <p className="line-clamp-3"> {rowData.productDescription}</p>
                )}
              </Cell>
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Category Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="category.categoryName"
              />
            </Column>

            {/* Price */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Price</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => `$ ${rowData.productPrice}`}
              </Cell>
            </Column>

            {/* Product Status */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Status</HeaderCell>

              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => `${rowData.productStatus} `}
              </Cell>
            </Column>

            {/* Product variant */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Variant</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData: any) => (
                  <div>
                    <Link
                      className="font-bold text-primary hover:underline-offset-4 hover:underline"
                      href={`/products/variants?productId=${rowData?.productId}`}
                    >
                      See Variant
                    </Link>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Action */}

            <Column width={100}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <div className="flex items-center gap-1 ">
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

          {/* product delete confirmation modal */}
          <div>
            <ProductDeleteModal
              isOpenDelete={isOpenDelete}
              handleCloseDelete={handleCloseDelete}
              deleteData={deleteData}
            />
          </div>

          {/* pagination */}

          <div style={{ padding: 20 }}>
            <Pagination
              total={allProductsList?.meta?.total}
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
      {/* product edit modal */}
      <ProductEditModal
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default AllProductList;
