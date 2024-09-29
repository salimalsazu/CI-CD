import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const CONTACT_API = "/contact-us";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addContact: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.contact],
    }),

    getContact: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CONTACT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.contact],
    }),
  }),
});

export const { useAddContactMutation, useGetContactQuery } = contactApi;
