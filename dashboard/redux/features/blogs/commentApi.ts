import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";
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

    // for dashboard
    getAllComments: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${COMMENT_API}/get-all-comments`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs, tagTypes.comments],
    }),
    // for client

    getAllCommentsFromBlog: builder.query({
      query: ({
        blogHref,
      }: {
        arg: Record<string, any>;
        blogHref: string;
      }) => ({
        url: `${COMMENT_API}/from-blog/${blogHref}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs, tagTypes.comments],
    }),

    getSingleBlogById: builder.query({
      query: ({ blogId }) => ({
        url: `${COMMENT_API}/get-single-by-id/${blogId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs, tagTypes.comments],
    }),

    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `${COMMENT_API}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs, tagTypes.comments],
    }),
  }),
});

export const {
  useAddNewCommentMutation,
  useGetAllCommentsQuery,
  useDeleteCommentMutation,
  useGetSingleBlogByIdQuery,
  useGetAllCommentsFromBlogQuery,
} = CommentApi;
