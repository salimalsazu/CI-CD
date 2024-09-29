// async function getData() {
//   const url = getBaseUrl();
//   const res = await fetch(`${url}/blogs/all-blogs`, {
//     next: {
//       tags: ["blogs"],
//       revalidate: 100,
//     },
//   });

//   return res.json();
// }
//
import { fileUrlKey, getBaseUrl } from "@/helpers/config/envConfig";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  // const allBlogs = await getData();
  const allBlogs = { data: [] };
  return (
    <div
      suppressHydrationWarning={true}
      className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start my-10">
        {allBlogs?.data?.map((singleBlog: any) => (
          <div
            key={singleBlog?.blogId}
            className="relative  flex flex-col sm:flex-row xl:flex-col items-start"
          >
            <div className="order-1 sm:ml-6 xl:ml-0">
              <h3 className="mb-1 text-slate-900 font-semibold ">
                <span className="mb-1 block text-sm leading-6 text-indigo-500">
                  {singleBlog?.categoryName}
                </span>
              </h3>
              <Link href={`/blogs/${singleBlog?.blogHref}`}>
                <h1 className="text-xl font-semibold">{singleBlog?.title}</h1>
              </Link>
              <div className="prose prose-slate prose-sm text-slate-600 ">
                <p
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{
                    __html: singleBlog?.description ?? "",
                  }}
                />
              </div>
              <Link
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500     mt-6"
                href={`/blog/${"blog.id"}`}
              >
                Learn more
                <svg
                  className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 "
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path>
                </svg>
              </Link>
              {/*  */}
              <div className="prose prose-slate mt-2 flex justify-between items-center prose-sm text-slate-600 ">
                <p>{moment(singleBlog?.createdAt).format("LL")}</p>
                <p>Jacob Kennedy</p>
              </div>
            </div>
            <Image
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
              src={`${fileUrlKey()}/${singleBlog?.blogImage}`}
              alt={singleBlog?.title ?? "Blog Image"}
              width={1216}
              height={640}
            />
          </div>
        ))}
      </div>

      {/* if no data */}
      <div>
        {!allBlogs?.data?.length && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h2 className="text-xl font-semibold">No Blogs Available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
