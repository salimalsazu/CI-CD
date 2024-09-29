import React from "react";
import { Button, Drawer } from "rsuite";

const ProductVariantTable = ({ productVariant, size, open, setOpen }: any) => {
  console.log("productVariant", productVariant);

  return (
    <div>
      <Drawer
        size="md"
        placement="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Product Variant List</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#64748b3f]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Product Barcode
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Product Color
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Product Size
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Product Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Product Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#64748b3f] text-center">
                {productVariant?.productVariations?.length > 0 &&
                  productVariant?.productVariations?.map(
                    (variant: any, idx: number) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">
                            {variant?.product?.productName}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">
                            {variant?.product?.category?.categoryName}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">
                            {variant?.barcodeCode}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p>{variant?.color}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <p>{variant?.size}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <p>{variant?.variantPrice}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {/* <p>{variant?.stock}</p> */}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            {/* if loading */}
            {/* {isLoading && (
              <div className="flex justify-center items-center min-h-[40vh]">
                <Loader size="lg" content="Loading..." />
              </div>
            )} */}
            {/* if no data found */}
            {!productVariant?.productVariations?.length && (
              <div className="flex justify-center items-center min-h-[40vh]">
                <h3 className="font-semibold">No Product Variants Found!</h3>
              </div>
            )}
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default ProductVariantTable;
