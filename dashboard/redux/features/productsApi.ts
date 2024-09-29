import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const PRODUCT_API = "/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.categories],
    }),
    addMoreVariant: builder.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_API}/add-more-variants/${productId}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.categories],
    }),
    updateProduct: builder.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_API}/${productId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.categories, tagTypes.tag],
    }),

    getProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product, tagTypes.categories, tagTypes.tag],
    }),

    getVariant: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}/variant`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product, tagTypes.categories, tagTypes.tag],
    }),

    getSingleProduct: builder.query({
      query: (productId: string) => ({
        url: `${PRODUCT_API}/${productId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product, tagTypes.tag, tagTypes.categories],
    }),
    getSingleVariant: builder.query({
      query: (arg: { variantId: string } | null) => {
        if (!arg) return { url: "/tag/get-single-variant", method: "GET" };
        const { variantId, ...rest } = arg;
        return {
          url: `/tag/get-single-variant/${variantId}`,
          method: "GET",
          params: rest,
        };
      },
      providesTags: [tagTypes.product, tagTypes.tag, tagTypes.categories],
    }),

    updateProductVariation: builder.mutation({
      query: ({ data, variantId }) => ({
        url: `${PRODUCT_API}/variant/${variantId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.tag, tagTypes.categories],
    }),

    deleteProduct: builder.mutation({
      query: ({ productId }: any) => ({
        url: `${PRODUCT_API}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.categories, tagTypes.tag],
    }),

    deleteProductVariant: builder.mutation({
      query: ({ variantId }: any) => ({
        url: `${PRODUCT_API}/variant/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.categories, tagTypes.tag],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useGetSingleVariantQuery,
  useUpdateProductVariationMutation,
  useDeleteProductMutation,
  useDeleteProductVariantMutation,
  useGetVariantQuery,
  useAddMoreVariantMutation,
} = productApi;
