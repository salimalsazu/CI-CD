import SingleBlogTags from "./SingleBlogTags";
import SingleBlogComment from "./SingleBlogComment";
import Image from "next/image";
import { fileUrlKey } from "@/helpers/config/envConfig";

const SingleBlogLeftSideContent = ({ blogDetails }: any) => {
  return (
    <>
      <div className="w-full md:w-2/3">
        <Image
          className="mb-6 shadow-md rounded-lg bg-slate-50 w-full  sm:mb-0 xl:mb-6 xl:w-full"
          src={`${fileUrlKey()}/${blogDetails?.blogImage}`}
          alt={blogDetails?.title ?? "Blog Image"}
          width={1216}
          height={640}
        />
        <div className="prose max-w-none mt-5">
          <p
            dangerouslySetInnerHTML={{ __html: blogDetails?.description ?? "" }}
          />
        </div>
        <div className="mt-8">
          <SingleBlogTags />
        </div>
        <div className="mt-8">
          <SingleBlogComment blogHref={blogDetails?.blogHref} />
        </div>
      </div>
    </>
  );
};

export default SingleBlogLeftSideContent;
