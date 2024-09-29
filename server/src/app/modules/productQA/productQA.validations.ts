import { z } from 'zod';

const addQA = z.object({
  body: z.object({
    question: z.string().nonempty(),
    answer: z.string().nonempty(),
  }),
});

export const QAValidation = {
  addQA,
};
