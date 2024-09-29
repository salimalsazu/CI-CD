import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventInformation: {},
  delivery: [],
  shippingInformation: {},
  payAmount: {},
};

export const addDeliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryFromLocalStorage: (state, action) => {
      // Retrieve existing delivery items from local storage
      const storedDelivery = getFromLocalStorage("delivery");
      const existingDelivery = storedDelivery ? JSON.parse(storedDelivery) : [];

      // Update state with the data from local storage
      state.delivery = existingDelivery;
      // updated event information from local storage
      const getEventInformation = getFromLocalStorage("eventInformation");
      const existingEventInformation = getEventInformation
        ? JSON.parse(getEventInformation)
        : {};
      state.eventInformation = existingEventInformation;

      // updated shipping information from local storage
      const getShippingInformation = getFromLocalStorage("shippingInformation");
      const existingShippingInformation = getShippingInformation
        ? JSON.parse(getShippingInformation)
        : {};
      state.shippingInformation = existingShippingInformation;
      // updated pay amount from local storage
      const getPayAmount = getFromLocalStorage("payAmount");
      const existingPayAmount = getPayAmount ? JSON.parse(getPayAmount) : {};
      state.payAmount = existingPayAmount;
    },
    addToDelivery: (state: any, action: any) => {
      // Add new delivery item to the existing items
      state.delivery.push(action.payload);

      // Save updated delivery items to local storage
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
    },
    // Add event information to delivery
    addEventToDelivery: (state: any, action: any) => {
      const previousEventName = state.eventInformation?.eventName
        ? state.eventInformation.eventName
        : "";
      if (
        previousEventName !== "" && // handle previews state
        previousEventName !== action.payload.eventName && // handle new state
        action.payload?.eventName // handle empty state
      ) {
        const confirmed = window.confirm(
          "If you choose another event now, all your deliveries and shopping cart will be lost."
        );
        if (confirmed) {
          setToLocalStorage("eventInformation", JSON.stringify({}));
          state.delivery = [];
          setToLocalStorage("delivery", JSON.stringify(state.delivery));
        }
      }

      if (action.payload.eventName) {
        state.eventInformation = { ...action.payload };
      } else {
        state.eventInformation = {
          ...state.eventInformation,
          ...action.payload,
        };
      }
      console.log(previousEventName, "previousEventName");
      setToLocalStorage(
        "eventInformation",
        JSON.stringify(state.eventInformation)
      );
    },
    removeFromDelivery: (state: any, action: any) => {
      // Remove delivery item based on its index
      const updatedDelivery = state.delivery.filter(
        (delivery: any, index: number) => index !== action.payload
      );

      // Update state with the updated delivery items
      state.delivery = updatedDelivery;

      // Save updated delivery items to local storage
      setToLocalStorage("delivery", JSON.stringify(updatedDelivery));

      // Remove delivery item from the existing items
      // state.delivery = state.delivery.filter(
      //   (delivery: any, index: any) => index !== action.payload
      // );
    },
    updatedAddToDelivery: (state: any, action: any) => {
      const newDelivery = action?.payload?.updatedDelivery;
      const updatedDelivery = newDelivery?.map((delivery: any) => {
        let totalNetPrice = 0;
        let totalNetVat = 0;
        for (const productId in delivery?.products) {
          const product = delivery?.products[productId];
          totalNetPrice +=
            product?.quantity * product?.productBatch?.batchPrice;
          totalNetVat += product?.totalPriceWithVat - product?.totalPrice;
        }
        return {
          ...delivery,
          totalNet:
            totalNetPrice === 0 ? 0 : totalNetPrice + delivery?.deliveryCharge,
          vat: totalNetVat,
        };
      });

      state.delivery = updatedDelivery;
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
    },
    // remove orderItem from cart
    removeItemFromCart: (state: any, action: any) => {
      // console.log(action.payload, "action.payload");
      const findDelivery = state.delivery.find(
        (element: any) => element.id === action.payload.deliveryId
      );
      const productKeys = Object.keys(findDelivery.products);
      productKeys.forEach((key) => {
        if (
          findDelivery.products[key].orderItemId === action.payload.orderItemId
        ) {
          delete findDelivery.products[key];
        }
      });
      // console.log(productKeys, "productKeys");
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
      // console.log(findDelivery.products, "findDelivery");
    },
    resetEventDelivery: (state: any, action: any) => {
      state.delivery = [];
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
      state.eventInformation = {};
      setToLocalStorage(
        "eventInformation",
        JSON.stringify(state.eventInformation)
      );
    },

    resetAll: (state: any, action: any) => {
      state.delivery = [];
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
      state.eventInformation = {};
      setToLocalStorage(
        "eventInformation",
        JSON.stringify(state.eventInformation)
      );
      state.shippingInformation = {};
      setToLocalStorage(
        "shippingInformation",
        JSON.stringify(state.shippingInformation)
      );
      state.payAmount = {
        totalGrandNet: 0,
        vat: 0,
        totalGross: 0,
      };
      setToLocalStorage("payAmount", JSON.stringify(state.payAmount));
    },
    // updated quantity of product in delivery
    updatedQuantity: (state: any, action: any) => {
      const findDelivery = state.delivery.find(
        (element: any) => element.id === action.payload.deliveryId
      );
      console.log(findDelivery?.products, "findDelivery.products");
      const productKeys = Object?.keys(findDelivery?.products);
      productKeys?.forEach((key) => {
        if (
          findDelivery.products[key].orderItemId === action.payload.orderItemId
        ) {
          // console.log(findDelivery.products[key], "findDelivery.products[key]");
          findDelivery.products[key].quantity = Number(
            action.payload.updatedQuantity
          );
          findDelivery.products[key].totalPrice =
            Number(action.payload.updatedQuantity) *
            Number(findDelivery.products[key]?.productBatch?.batchPrice);
          findDelivery.products[key].totalPriceWithVat =
            Number(action?.payload?.updatedQuantity) *
            findDelivery?.products[key]?.productBatch?.batchPriceWithVat;
        }
        findDelivery.totalNet =
          findDelivery?.products[key]?.quantity > 0
            ? findDelivery?.products[key]?.totalPrice +
              findDelivery?.deliveryCharge
            : 0;
        findDelivery.vat =
          findDelivery?.products[key]?.totalPriceWithVat -
          findDelivery?.products[key]?.totalPrice;
      });
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
    },

    addShippingInformation: (state: any, action: any) => {
      state.shippingInformation = action.payload;
      setToLocalStorage(
        "shippingInformation",
        JSON.stringify(state.shippingInformation)
      );
    },
    // place order and store in local storage
    placeOrder: (state: any, action: any) => {
      state.delivery = action?.payload?.updatedDelivery;
      setToLocalStorage("delivery", JSON.stringify(state.delivery));
    },
    addPayAmount: (state: any, action: any) => {
      state.payAmount = action.payload;
      setToLocalStorage("payAmount", JSON.stringify(state.payAmount));
    },
  },
});

export const {
  addToDelivery,
  addEventToDelivery,
  addShippingInformation,
  addPayAmount,
  placeOrder,
  setDeliveryFromLocalStorage,
  removeFromDelivery,
  removeItemFromCart,
  resetEventDelivery,
  resetAll,
  updatedAddToDelivery,
  updatedQuantity,
} = addDeliverySlice.actions;
export default addDeliverySlice.reducer;
