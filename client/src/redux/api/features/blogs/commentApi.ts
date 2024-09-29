import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const COMMENT_API = "/comments";

const CommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewComment: builder.mutation({
      query: ({ data, blogHref }) => ({
        url: `${COMMENT_API}/${blogHref}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.blogs, tagTypes.comments],
    }),

    // for client

    getAllCommentsFromBlog: builder.query({
      query: ({ blogHref }: { blogHref: string }) => ({
        url: `${COMMENT_API}/from-blog/${blogHref}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs, tagTypes.comments],
    }),
  }),
});

export const { useAddNewCommentMutation, useGetAllCommentsFromBlogQuery } =
  CommentApi;
