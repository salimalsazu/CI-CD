"use client";

import Image from "next/image";
import { useGetSingleProductQuery } from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { IconButton, Pagination, Popover, Table, Whisper } from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdKeyboardArrowRight, MdModeEdit } from "react-icons/md";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import VariantEditDrawer from "@/components/products/variants-list/VariantEditDrawer";
import { RiDeleteBinFill } from "react-icons/ri";
import ProductVariantDeleteModal from "@/components/products/modal/ProductVariantDeleteModal";
import VariantStockAddPopOver from "@/components/products/variants-list/VariantStockAddPopOver";
import { FaPlus } from "react-icons/fa";
import AddVariantDrawer from "./AddVariantDrawer";

const ProductVariants = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  //
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

  const [editData, setEditData] = useState(null);

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const {
    data: singleProduct,
    isLoading,
    isFetching,
  } = useGetSingleProductQuery(productId as string, {
    skip: !productId,
  });

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const VariantEdit = (key: any) => {
    setOpen(true);
    setPlacement(key);
  };

  // Modal
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenAddVariant, setIsOpenAddVariant] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);
  const handleCloseAddVariant = () => setIsOpenAddVariant(false);
  return (
    <>
      <div className="flex items-center mb-2 text-sm text-[#2563eb]">
        <Link href={"/"}>Dashboard</Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <Link href={`/products`}>All products</Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <p className="font-bold">Variants</p>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5  shadow-default   sm:px-7.5">
        <div className="py-5 flex justify-between items-center">
          <div>
            <h3 className="flex gap-3 items-center">
              Product Name :{" "}
              <span className="font-semibold">
                {singleProduct?.data?.productName}
              </span>{" "}
            </h3>
          </div>
          <div>
            <button
              onClick={() => setIsOpenAddVariant(true)}
              className="px-3 py-2 rounded-3xl flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add Variant
            </button>
          </div>
        </div>

        {/*  */}
        <div className="rounded-sm bg-white">
          <Table
            bordered={true}
            hover={false}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the
            autoHeight={true}
            data={singleProduct?.data?.productVariations}
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
                              rowData?.image
                                ? `${fileUrlKey()}/${rowData?.image}`
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
                          rowData?.image
                            ? `${fileUrlKey()}/${rowData?.image}`
                            : noImage
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>

            {/* color */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Color</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => `${rowData.color.name}`}
              </Cell>
            </Column>

            {/* price */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Price</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => `$${rowData.variantPrice}`}
              </Cell>
            </Column>
            {/* stock */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Stock</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <div className="flex gap-5 items-center">
                    <div>
                      <p>{rowData?._count?.barCodes}</p>
                    </div>
                    <div>
                      <VariantStockAddPopOver rowData={rowData} />
                    </div>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Qr Code */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Qr Code</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => (
                  <Link
                    href={`/products/variants/qr-code/?variantId=${rowData?.variantId}`}
                    className="font-bold text-primary hover:underline hover:underline-offset-4"
                  >
                    Qr Code List
                  </Link>
                )}
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
                          setEditData(rowData);
                          VariantEdit("right");
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

          {/* pagination */}
          <div style={{ padding: 20 }}>
            <Pagination
              total={singleProduct?.data?.productVariations?.length || 0}
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
      {/*  */}
      <div>
        <VariantEditDrawer
          open={open}
          setOpen={setOpen}
          // onClose={handleCloseEdit}
          editData={editData}
          placement={placement}
        />
      </div>

      <div>
        <ProductVariantDeleteModal
          isOpenDelete={isOpenDelete}
          handleCloseDelete={handleCloseDelete}
          deleteData={deleteData}
        />
      </div>

      {/* add variant drawer */}
      <AddVariantDrawer
        open={isOpenAddVariant}
        handleClose={handleCloseAddVariant}
        productId={productId as string}
        basePrice={singleProduct?.data?.productPrice}
      />
    </>
  );
};

export default ProductVariants;
