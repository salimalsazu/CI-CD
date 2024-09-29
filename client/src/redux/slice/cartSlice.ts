import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  payAmount: {},
  promoCode: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      const storedCart = getFromLocalStorage("cart");
      const existingCart = storedCart ? JSON.parse(storedCart) : [];
      state.cart = existingCart;

      const getPayAmount = getFromLocalStorage("payAmount");
      const existingPayAmount = getPayAmount ? JSON.parse(getPayAmount) : {};
      state.payAmount = existingPayAmount;

      const getPromoCode = getFromLocalStorage("promoCode");
      const existingPromoCode = getPromoCode ? JSON.parse(getPromoCode) : "";
      state.promoCode = existingPromoCode;
    },

    addToCart: (state: any, action: any) => {
      const itemInCart = state.cart.find(
        (item: any) => item.variantId === action?.payload?.product?.variantId
      );
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action?.payload?.quantity;
        itemInCart.totalPrice = itemInCart?.quantity * itemInCart?.price;
        setToLocalStorage("cart", JSON.stringify(state.cart));
      } else {
        state.cart.push({
          ...action?.payload?.product,
          quantity: action?.payload?.quantity,
          totalPrice:
            action?.payload?.quantity * action?.payload?.product?.price,
        });
        setToLocalStorage("cart", JSON.stringify(state.cart));
      }
    },

    incrementQuantity: (state: any, action: any) => {
      const itemInCart = state?.cart?.find(
        (item: any) => item.variantId === action.payload
      );
      itemInCart.quantity++;
      setToLocalStorage("cart", JSON.stringify(state.cart));
    },

    decrementQuantity: (state: any, action: any) => {
      const itemInCart = state?.cart?.find(
        (item: any) => item.variantId === action.payload
      );
      if (itemInCart.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart.quantity--;
      }
      setToLocalStorage("cart", JSON.stringify(state.cart));
    },

    removeItem: (state: any, action: any) => {
      const removeItem = state?.cart?.filter(
        (item: any) => item.variantId !== action.payload
      );
      state.cart = removeItem;
      setToLocalStorage("cart", JSON.stringify(state.cart));
    },

    addPayAmount: (state: any, action: any) => {
      state.payAmount = action.payload;
      setToLocalStorage("payAmount", JSON.stringify(state.payAmount));
    },
    applyPromoCode: (state: any, action: any) => {
      state.promoCode = action.payload.promoCode;
      state.cart.push({
        ...action.payload,
        quantity: action.payload.quantity,
        totalPrice: action.payload.quantity * action.payload.offerPrice,
      });
      setToLocalStorage("cart", JSON.stringify(state.cart));
      setToLocalStorage("promoCode", JSON.stringify(state.promoCode));
    },
    removeFreeProduct: (state: any, action: any) => {
      state.promoCode = "";
      const removeItem = state.cart.filter(
        (item: any) =>
          !(
            item.variantId === action?.payload?.variantId &&
            item.promoCode === action?.payload?.promoCode
          )
      );
      state.cart = removeItem;
      setToLocalStorage("cart", JSON.stringify(state.cart));
      setToLocalStorage("promoCode", JSON.stringify(state.promoCode));
    },
  },
});
export const {
  addToCart,
  applyPromoCode,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeFreeProduct,
  addPayAmount,
  setCartFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
