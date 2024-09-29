import { z } from 'zod';

const addHall = z.object({
  body: z.object({
    hallName: z
      .string()
      .min(1, { message: 'Hall name should be at least 1 character' })
      .max(255, { message: 'Hall name should be at most 255 characters' }),
    description: z.string().min(1).max(1000).optional(),
    addressLine1: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    state: z.string().min(1).max(255).optional(),
    country: z.string().min(1).max(255).optional(),
    postalCode: z.string().min(1).max(20).optional(),
  }),
});

export const HallValidation = {
  addHall,
};
