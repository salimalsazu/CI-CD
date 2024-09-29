"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { useGetAllBlogsQuery } from "@/redux/api/features/blogs/blogApi";
import { useDebounced } from "@/redux/hooks";
import moment from "moment";
import { fileUrlKey } from "@/helpers/config/envConfig";

const SingleBlogSidebar = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: recentBlogs,
    isLoading,
    isError,
  } = useGetAllBlogsQuery({ ...query });

  return (
    <>
      <div className="md:px-4">
        {/* <InputGroup inside style={styles} className="!w-full" size="lg">
          <AutoComplete
            data={data}
            size="lg"
            placeholder="Type and hit enter..."
          />
          <InputGroup.Button tabIndex={-1}>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup> */}
      </div>
      <div className="md:pl-4 pt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2">
          Recent 15 Posts
        </h2>
        <div className="">
          {!isLoading &&
            recentBlogs?.data?.map((recentBlog: any) => (
              <div
                key={recentBlog?.blogId}
                className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105"
              >
                <Link
                  href={`/blogs/${recentBlog?.blogHref}`}
                  className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                >
                  {recentBlog?.title}
                  <br />
                  <small className="text-gray-400">
                    {moment(recentBlog.createdAt).format("LL")}
                  </small>
                </Link>

                <Link href={`/blogs/${recentBlog?.blogHref}`}>
                  <Image
                    className="shadow-md rounded-lg bg-slate-50 "
                    src={`${fileUrlKey()}/${recentBlog?.blogImage}`}
                    alt=""
                    width={80}
                    height={80}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SingleBlogSidebar;
