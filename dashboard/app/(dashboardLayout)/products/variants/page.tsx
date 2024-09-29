import ProductVariants from "@/components/products/variants-list/ProductVariants";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product Variants",
};

const VariantPage = () => {
  return (
    <div>
      <ProductVariants />
    </div>
  );
};

export default VariantPage;
