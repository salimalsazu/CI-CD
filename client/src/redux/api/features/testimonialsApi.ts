import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const TESTIMONIALS_API = "/testimonial";

const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => ({
        url: `${TESTIMONIALS_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonials],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialsApi;
