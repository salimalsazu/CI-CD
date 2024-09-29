import AddProductsSection from "@/components/products/addProducts/AddProducts";
import { Metadata } from "next";

export const metadata:Metadata ={
  title:"Add New Product"
}

const AddProductsPage = () => {
  return (
    <div>
      <AddProductsSection />
    </div>
  );
};

export default AddProductsPage;
