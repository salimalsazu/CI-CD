import { UserRoles } from '@prisma/client';
import { z } from 'zod';
import { ZodUserRoles } from './users.constants';

const createUser = z.object({
  fullName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First Name must be in string',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'email must be in string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be in string',
  }),
  role: z
    .enum([...ZodUserRoles] as [string, ...string[]], {
      required_error: 'Role is Required',
      invalid_type_error: 'role must be in string',
    })
    .default(UserRoles.USER),
});

const updateMyProfile = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mobileNumber: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    displayContactInfo: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUser,
  updateMyProfile,
};
