import { variantsSlice } from "../features/slice/variantsSlice";
import { baseApi } from "./baseApi";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  variants: variantsSlice.reducer,
};
