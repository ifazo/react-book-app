import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import { api } from "./api/apiSlice";
import { auth } from "./api/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [auth.reducerPath]: auth.reducer,
    products: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
