import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    products: productSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
