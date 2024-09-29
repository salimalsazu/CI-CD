import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const BARCODE_API = "/tag";

export const barCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBarcode: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BARCODE_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tag],
    }),

    getBarcodeForPrint: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BARCODE_API}/barcode-print`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tag],
    }),

    getSingleBarcode: builder.query({
      query: (barcodeCode: string | undefined) => ({
        url: `${BARCODE_API}/${barcodeCode}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tag],
    }),

    updateBarcodeStatus: builder.mutation({
      query: ({ barcodeId, data }) => ({
        url: `${BARCODE_API}/status/${barcodeId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.tag],
    }),

    deleteBarcode: builder.mutation({
      query: ({ barcodeId }: any) => ({
        url: `${BARCODE_API}/${barcodeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tag],
    }),
    deleteMultipleBarcode: builder.mutation({
      query: ({ data }: any) => ({
        url: `${BARCODE_API}/delete-multiple-barcode`,
        method: "DELETE",
        data: { barcodeIds: data },
      }),
      invalidatesTags: [tagTypes.tag],
    }),
    addMoreStock: builder.mutation({
      query: ({ data }: any) => ({
        url: `${BARCODE_API}/add-more-barcode-stock`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [
        tagTypes.tag,
        tagTypes.product,
        tagTypes.tag,
        tagTypes.promotionalOffer,
      ],
    }),
    createQRCodeManually: builder.mutation({
      query: ({ data }: any) => ({
        url: `${BARCODE_API}/create-qr-code-manually`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [
        tagTypes.tag,
        tagTypes.product,
        tagTypes.tag,
        tagTypes.promotionalOffer,
      ],
    }),
  }),
});

export const {
  useGetBarcodeQuery,
  useGetSingleBarcodeQuery,
  useGetBarcodeForPrintQuery,
  useUpdateBarcodeStatusMutation,
  useDeleteBarcodeMutation,
  useDeleteMultipleBarcodeMutation,
  useAddMoreStockMutation,
  useCreateQRCodeManuallyMutation,
} = barCodeApi;
