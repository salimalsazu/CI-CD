import { z } from 'zod';

const addTestimonial = z.object({
  clientName: z.string().nonempty(),
  testimonialTitle: z.string().nonempty(),
  testimonialDescription: z.string().nonempty(),
  rating: z.string().nonempty(),
});

const editTestimonial = z.object({
  clientName: z.string().nonempty().optional(),
  testimonialTitle: z.string().nonempty().optional(),
  testimonialDescription: z.string().nonempty().optional(),
  rating: z.string().optional(),
});

export const TestimonialValidation = {
  addTestimonial,
  editTestimonial,
};
