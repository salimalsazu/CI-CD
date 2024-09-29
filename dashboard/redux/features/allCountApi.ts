import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const COUNT_URL = "/dashboard/get-total-counts";

export const allCountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCounts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${COUNT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user, tagTypes.product, tagTypes.orders],
    }),
  }),
});

export const { useGetAllCountsQuery } = allCountApi;
