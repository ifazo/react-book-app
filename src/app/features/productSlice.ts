import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../types";

interface ProductState {
  products: IBook[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IBook>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice;
