import { z } from 'zod';

const addCategory = z.object({
  categoryName: z.string().nonempty({ message: 'Category name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
});

const editCategory = z.object({
  categoryName: z.string().optional(),
  description: z.string().optional(),
});

export const CategoryValidation = {
  addCategory,
  editCategory,
};
