import AddProductQAForm from "@/components/products/forms/AddProductQAForm";
import ProductQATable from "@/components/products/tables/ProductQATable";

const ProductQAPage = () => {
  return (
    <div>
      <div>
        <AddProductQAForm />
      </div>
      <div>
        <ProductQATable />
      </div>
    </div>
  );
};

export default ProductQAPage;
