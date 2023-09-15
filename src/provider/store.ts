import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import { api } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    product: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch