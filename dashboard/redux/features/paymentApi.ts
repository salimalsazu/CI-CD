import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const PAYMENT_API = "/payment";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PAYMENT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const { useGetAllPaymentsQuery } = orderApi;
