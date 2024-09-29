import { baseApi } from "./api/baseApi";
import { cartSlice } from "./slice/cartSlice";
import deliveryInfoSlice from "./slice/deliveryInfoSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  // field: employeeFiledSlice.reducer,
  cart: cartSlice.reducer,
  deliveryInfo: deliveryInfoSlice,
};
