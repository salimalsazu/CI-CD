import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const TESTIMONIAL_API = "/testimonial";

const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addTestimonial: builder.mutation({
      query: ({ data }) => ({
        url: `${TESTIMONIAL_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
    updateTestimonial: builder.mutation({
      query: ({ data, testimonialId }) => ({
        url: `${TESTIMONIAL_API}/${testimonialId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),

    getTestimonial: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${TESTIMONIAL_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.testimonial],
    }),

    deleteTestimonial: builder.mutation({
      query: ({ testimonialId }) => ({
        url: `${TESTIMONIAL_API}/${testimonialId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useGetTestimonialQuery,
  useDeleteTestimonialMutation,
} = testimonialApi;
