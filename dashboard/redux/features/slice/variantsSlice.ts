import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productVariations: [],
};

// Create the slice
export const variantsSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {
    addVariant: (state: any, action: any) => {
      state.productVariations.push(action.payload);
    },
  },
});

// Export the actions and reducer
export const { addVariant } = variantsSlice.actions;
export default variantsSlice.reducer;
