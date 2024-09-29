/* eslint-disable no-useless-escape */
import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z
      .enum(['USER', 'ADMIN', 'SUPERADMIN'])
      .or(z.string().refine(value => ['USER', 'ADMIN', 'SUPERADMIN'].includes(value)))
      .optional(),
  }),
});

export const AuthValidation = {
  createUser,
};
