import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types";

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice;
