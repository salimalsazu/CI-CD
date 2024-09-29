import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const KID_API = "/tag";

export const BarCodeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAvailableBarCode: build.query({
      query: (code) => ({
        url: `${KID_API}/barcode`,
        method: "GET",
        params: code,
      }),
      providesTags: [tagTypes.kids],
    }),
  }),
});

export const { useGetAvailableBarCodeQuery } = BarCodeApi;
