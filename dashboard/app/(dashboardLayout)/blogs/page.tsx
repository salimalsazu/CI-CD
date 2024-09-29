import AllBlogPage from "@/components/blogs/AllBlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Dashboard",
};

const BlogPage = () => {
  return <AllBlogPage />;
};

export default BlogPage;
