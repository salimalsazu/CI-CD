import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 email:"",
 firstName:"",
 lastName:"",
 address:"",
 city:"",
 state:"",
 postalCode:"",
 phone:""
};

const deliveryInfoSlice = createSlice({
  name: "deliveryInfo",
  initialState,
  reducers: {
    updateDeliveryInfo:(state, action)=>{
        return {
            ...state,
            [action.payload.field]:action.payload.value,
        }
    },
    resetDeliveryInfo:(state, payload)=>{
      return initialState
    },
    
  },
});

export const { updateDeliveryInfo, resetDeliveryInfo } = deliveryInfoSlice.actions;

export default deliveryInfoSlice.reducer;
