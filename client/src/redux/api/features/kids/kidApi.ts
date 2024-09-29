import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";
const KID_API = "/kid";

export const kidApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addKid: build.mutation({
      query: (data: any) => ({
        url: `${KID_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.kids],
    }),
    getKidProfile: build.query({
      query: ({ code }: { code: string }) => ({
        url: `/tag/${code}`,
        method: "GET",
      }),
      providesTags: [tagTypes.kids],
    }),
    getMyAllKids: build.query({
      query: () => ({
        url: `/${KID_API}/my-kids`,
        method: "GET",
      }),
      providesTags: [tagTypes.kids],
    }),
    updateKid: build.mutation({
      query: ({ data, kidId }: { data: any; kidId: string }) => ({
        url: `${KID_API}/update/${kidId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.kids],
    }),
    deleteKid: build.mutation({
      query: ({ kidId }: { kidId: string }) => ({
        url: `${KID_API}/delete/${kidId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.kids],
    }),
  }),
});

export const {
  useAddKidMutation,
  useGetKidProfileQuery,
  useGetMyAllKidsQuery,
  useUpdateKidMutation,
  useDeleteKidMutation,
} = kidApi;
