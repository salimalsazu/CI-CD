import { baseApi } from "./api/baseApi";
import { reducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { setCartFromLocalStorage } from "./slice/cartSlice";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Dispatch action to retrieve data from local storage and populate the Redux state
store.dispatch(setCartFromLocalStorage(null));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
