import { z } from 'zod';

const addPromoCode = z.object({
  body: z.object({
    productId: z.string().nonempty(),
    promotionName: z.string().nonempty(),
    promoCode: z.string().nonempty(),
    type: z.string().nonempty(),
    expireDate: z.string().nonempty(),
    threshold: z.number().optional(),
    discount: z.number().optional(),
    buy: z.number().optional(),
    get: z.number().optional(),
  }),
});

export const PromoCodeValidation = {
  addPromoCode,
};
