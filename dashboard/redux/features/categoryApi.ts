import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const CATEGORY_API = "/category";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addCategory: builder.mutation({
      query: ({ data }) => ({
        url: `${CATEGORY_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
    updateCategory: builder.mutation({
      query: ({ data, categoryId }) => ({
        url: `${CATEGORY_API}/${categoryId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    getCategory: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CATEGORY_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.categories],
    }),

    getSingleCategory: builder.query({
      query: (categoryHref: string | undefined) => ({
        url: `${CATEGORY_API}/${categoryHref}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),

    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `${CATEGORY_API}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
