import AllProductList from "@/components/products/tables/AllProductLists";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products | Dashboard",
  creator: "Developed by CodeQuivers",
};
const ProductsPage = () => {
  return (
    <div>
      <AllProductList />
    </div>
  );
};

export default ProductsPage;
