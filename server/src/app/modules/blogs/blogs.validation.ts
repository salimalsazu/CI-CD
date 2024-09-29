import { z } from 'zod';

const addNewBlog = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  categoryName: z.string().nonempty(),
});

const updateBlog = z.object({
  title: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  categoryName: z.string().nonempty().optional(),
});

export const BlogsValidation = {
  addNewBlog,
  updateBlog,
};
