import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const BLOG_API = "/blogs";

const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BLOG_API}/all-blogs`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs, tagTypes.blogs],
    }),

    getSingleBlogByHref: builder.query({
      query: ({ blogHref }) => ({
        url: `${BLOG_API}/get-single-by-href/${blogHref}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetSingleBlogByHrefQuery } = BlogApi;
