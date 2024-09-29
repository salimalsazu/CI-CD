import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const PAYPAL_API = "/paypal";

const PaypalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: `${PAYPAL_API}/payment`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.paypal],
    }),

    addCapture: builder.mutation({
      query: (data) => ({
        url: `${PAYPAL_API}/capture`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.paypal],
    }),
  }),
});

export const { useCreatePaymentMutation, useAddCaptureMutation } = PaypalApi;
