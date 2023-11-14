import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
  blacklist: ["api"],
};

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userSlice.reducer,
  products: productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
