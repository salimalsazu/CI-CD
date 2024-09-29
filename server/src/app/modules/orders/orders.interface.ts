import { OrderStatus } from '@prisma/client';

export type IOrderFilterRequest = {
  searchTerm?: string | undefined;
  orderStatus?: OrderStatus | undefined;
};

export type IOrderRequest = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  orderStatus: OrderStatus;
  paymentInformation: paymentInformation;
  cartItems: cartItems[];
};

type paymentInformation = {
  subtotal: number;
  taxes: number;
  total: number;
};

type cartItems = {
  productName: string;
  productId: string;
  variantId: string;
  price: number;
  quantity: number;
  // color: {
  //   name: string;
  //   code: string;
  // };
};

export type IOrderUpdateRequest = {
  state?: string | undefined;
  tax?: string | undefined;
};

type IDeliveryInfo = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  notes?: string;
};
type ICartItems = {
  categoryId: string;
  productId: string;
  productName: string;
  variantId: string;
  price: number;
  color: {
    name: string;
    code: string;
  };
  image: string;
  quantity: number;
  totalPrice: number;
};
export type ICreateNewOrder = {
  deliveryInfo: IDeliveryInfo;
  cart: ICartItems[];
};
