import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";
const BLOG_API = "/blogs";

const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addNewBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
    updateBlog: builder.mutation({
      query: ({ data, blogId }) => ({
        url: `${BLOG_API}/${blogId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    getAllBlogs: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BLOG_API}/all-blogs`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs, tagTypes.blogs],
    }),

    getSingleBlogById: builder.query({
      query: ({ blogId }) => ({
        url: `${BLOG_API}/get-single-by-id/${blogId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),
    getSingleBlogByHref: builder.query({
      query: ({ blogHref }) => ({
        url: `${BLOG_API}/get-single-by-href/${blogHref}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    deleteBlog: builder.mutation({
      query: ({ blogId }) => ({
        url: `${BLOG_API}/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useAddNewBlogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetSingleBlogByHrefQuery,
  useGetSingleBlogByIdQuery,
} = BlogApi;
