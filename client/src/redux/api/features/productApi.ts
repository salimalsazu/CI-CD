import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const PRODUCT_API = "/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),

    getSingleProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}/${arg.id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
  }),
});

export const { useGetProductQuery, useGetSingleProductQuery } = productApi;
