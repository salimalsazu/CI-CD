import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const CATEGORY_API = "/category";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    // addCategory: builder.mutation({
    //   query: (data) => ({
    //     url: `${CATEGORY_API}`,
    //     method: "POST",
    //     data: data,
    //     contentType: "multipart/form-data",
    //   }),
    //   invalidatesTags: [tagTypes.category],
    // }),

    getCategory: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CATEGORY_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.category],
    }),

    // getSingleCategory: builder.query({
    //   query: (arg: Record<string, any>) => ({
    //     url: `${CATEGORY_API}/${arg.categoryName}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.category],
    // }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
