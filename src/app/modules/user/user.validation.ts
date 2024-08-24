import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, 'Password can not be more than 20 characters'),
    phone: z.string(),
    role: z.enum(['admin', 'user']),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
