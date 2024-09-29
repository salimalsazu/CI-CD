import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const ORDER_API = "/orders";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_API}/create-order`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),
    updateOrder: builder.mutation({
      query: ({ data, orderId }) => ({
        url: `${ORDER_API}/${orderId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),
  }),
});

export const { useCreateOrderMutation, useUpdateOrderMutation } = orderApi;
