"use client";

import { useGetAllCommentsFromBlogQuery } from "@/redux/api/features/blogs/commentApi";
import { Loader } from "rsuite";

const BlogComments = ({ blogHref }: { blogHref: string }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllCommentsFromBlogQuery({ blogHref });

  return (
    <div className="mt-10 pt-5 border-t">
      <div>
        <h2>Comments | {data?.data?._count?.comments ?? "0"}</h2>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader content="Loading Comments" size="lg" />
        </div>
      )}
      {!isLoading && isError && (
        <div className="flex justify-center items-center min-h-[300px]">
          <h4>
            {
              // @ts-ignore
              error?.message || "Something went wrong"
            }
          </h4>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-5 space-y-3">
          {data?.data?.comments?.map((comment: any) => (
            <div className="border p-5" key={comment?.commentId}>
              <h4>{comment?.comment}</h4>
              <h4>{comment?.name}</h4>
              <h4>{comment?.email}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComments;

// import { getBaseUrl } from "@/helpers/config/envConfig";

// async function getData(href: string) {
//   const url = getBaseUrl();
//   const res = await fetch(`${url}/comments/from-blog/${href}`, {
//     next: {
//       tags: ["blogs"],
//       revalidate: 100,
//     },
//   });
//   return res.json();
// }

// const BlogComments = async ({ blogHref }: { blogHref: string }) => {
//   const blogDetails = await getData(blogHref);
//   console.log(blogDetails);
//   return (
//     <div className="border-t">
//       <div>
//         <h2>Comments</h2>
//       </div>
//     </div>
//   );
// };

// export default BlogComments;
