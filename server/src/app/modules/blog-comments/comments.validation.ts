import { z } from 'zod';

const addCommentOnBlog = z.object({
  body: z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    comment: z.string().nonempty(),
  }),
});

const editTestimonial = z.object({
  clientName: z.string().nonempty().optional(),
  testimonialTitle: z.string().nonempty().optional(),
  testimonialDescription: z.string().nonempty().optional(),
  rating: z.string().optional(),
});

export const BlogCommentValidation = {
  addCommentOnBlog,
  editTestimonial,
};
