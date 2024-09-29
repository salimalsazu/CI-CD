import { z } from 'zod';

const addTax = z.object({
  body: z.object({
    state: z.string().nonempty(),
    tax: z.number().min(0).max(100),
  }),
});

export const TaxValidation = {
  addTax,
};
