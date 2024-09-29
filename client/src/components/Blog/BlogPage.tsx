import SingleBlogLeftSideContent from "./SingleBlogLeftSideContent";
import SingleBlogSidebar from "./SingleBlogSidebar";

const BlogPage = () => {
  return (
    <div className="flex flex-col">
      <div className="py-8">
        <div className="mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Blog Title Here
          </h1>
          <p className="text-gray-600">Published on April 4, 2023</p>
        </div>
      </div>
      <div className="bg-white py-8">
        <div className="container mx-auto  flex flex-col md:flex-row">
          <SingleBlogLeftSideContent />
          <div className="w-full md:w-1/3 md:pl-4 md:mt-0 mt-8">
            <SingleBlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
