import { baseApi } from "@/redux/api/baseApi";

export const stripePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientSecret: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-stripe/create-payment-intent`,
        method: "POST",
        data: JSON.stringify(paymentInfo),
        contentType: "application/json",
      }),
      //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),
    updatePaymentIntent: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-stripe/update-payment-intent`,
        method: "POST",
        data: JSON.stringify(paymentInfo),
        contentType: "application/json",
      }),
      //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),

    retrivePaymentInfo: builder.mutation({
      query: (data) => ({
        url: `/payment-stripe/retrieve-payment-info`,
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      }),
      // invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),
  }),
});

export const {
  useGetClientSecretMutation,
  useUpdatePaymentIntentMutation,
  useRetrivePaymentInfoMutation,
} = stripePaymentApi;
