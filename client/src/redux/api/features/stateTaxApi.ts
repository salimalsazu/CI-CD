import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const TAX_API = "/tax";

export const taxApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTax: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${TAX_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tax],
    }),
  }),
});

export const { useGetTaxQuery } = taxApi;
