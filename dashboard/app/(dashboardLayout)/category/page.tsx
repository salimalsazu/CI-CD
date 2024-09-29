import AllCategoryList from "@/components/category/AllCategoryList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category | Dashboard",
};

const CategoryPage = () => {
  return (
    <div>
      <AllCategoryList />
    </div>
  );
};

export default CategoryPage;
