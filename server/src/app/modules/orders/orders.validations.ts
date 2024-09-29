import { z } from 'zod';

// const addOrder = z.object({
//   body: z.object({
//     state: z.string().nonempty(),
//     tax: z.number().min(0).max(100),
//   }),
// });

// const shippingInformationSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   address: z.string(),
//   city: z.string(),
//   state: z.string(),
//   postcode: z.string(),
//   email: z.string().email(),
//   phone: z.string(),
// });

const paymentInformationSchema = z.object({
  subtotal: z.number(),
  taxes: z.number(),
  total: z.number(),
});

// const colorSchema = z.object({
//   name: z.string(),
//   code: z.string(),
// });

const cartItemSchema = z.object({
  productName: z.string(),
  productId: z.string(),
  variantId: z.string(),
  price: z.number(),
  quantity: z.number().int().min(1),
  // color: colorSchema,
});

const orderRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  email: z.string().email(),
  phone: z.string(),
  orderStatus: z.string(),
  paymentInformation: paymentInformationSchema,
  cartItems: z.array(cartItemSchema),
});

// Example usage
const addOrder = z.object({
  body: orderRequestSchema,
});

export const OrderValidation = {
  addOrder,
};
