import { z } from 'zod';

export const createPaypalPayment = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    relation: z.string(),
    phoneNo: z.string(),
  }),
});

export const paypalPaymentValidation = {
  createPaypalPayment,
};
