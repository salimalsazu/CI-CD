import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const PROMO_CODE_CHECK_API = "/promotion/check";
const PROMOTION_OFFER_API = "/promotion/apply-promotion-code";

export const promoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPromo: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PROMO_CODE_CHECK_API}/${arg.promoCode}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.promo],
    }),
    applyPromotionalOffer: build.mutation({
      query: ({ code, data }) => ({
        url: `${PROMOTION_OFFER_API}/${code}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.promo, tagTypes.promotionalOffer],
    }),
  }),
});

export const { useLazyGetPromoQuery, useApplyPromotionalOfferMutation } =
  promoApi;
