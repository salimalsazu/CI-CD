import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const PRODUCT_QA_API = "/qa";

export const productQAApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProductQA: build.mutation({
      query: (data: any) => ({
        url: `${PRODUCT_QA_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.qa],
    }),
    getProductQA: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_QA_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.qa],
    }),

    updateProductQA: build.mutation({
      query: ({ data, productQaId }) => ({
        url: `${PRODUCT_QA_API}/${productQaId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.qa],
    }),

    deleteProductQA: build.mutation({
      query: ({ productQaId }) => ({
        url: `${PRODUCT_QA_API}/${productQaId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.qa],
    }),
  }),
});

export const {
  useAddProductQAMutation,
  useGetProductQAQuery,
  useUpdateProductQAMutation,
  useDeleteProductQAMutation,
} = productQAApi;
