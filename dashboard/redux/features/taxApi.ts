import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const TAX_API = "/tax";

export const taxApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTax: build.mutation({
      query: (data: any) => ({
        url: `${TAX_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.tax],
    }),
    getTax: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${TAX_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tax],
    }),

    updateTax: build.mutation({
      query: ({ data, taxId }) => ({
        url: `${TAX_API}/${taxId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.tax],
    }),

    deleteTax: build.mutation({
      query: ({ taxId }) => ({
        url: `${TAX_API}/${taxId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tax],
    }),
  }),
});

export const {
  useAddTaxMutation,
  useGetTaxQuery,
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} = taxApi;
