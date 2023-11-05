import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  products: productSlice.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
