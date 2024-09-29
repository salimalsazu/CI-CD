import ProductBarcode from "@/components/products/tables/ProductTableForBarcode";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product Variant | Barcode",
};

const ProductBarcodePage = () => {
  return (
    <div>
      <ProductBarcode />
    </div>
  );
};

export default ProductBarcodePage;
