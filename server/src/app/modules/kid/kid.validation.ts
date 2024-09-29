import { z } from 'zod';

export const IRelationSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  relation: z.string(),
  phoneNo: z.string(),
});

export const addKid = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string(),
  password: z.string(),
  kidAge: z.string(),
  code: z.string(),
  relations: z.array(IRelationSchema).optional(),
});
export const updateKid = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  kidAge: z.string().optional(),
  relations: z.array(IRelationSchema),
});

export const KidValidation = {
  addKid,
  updateKid,
};
