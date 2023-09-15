import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types/Types";

export interface ProductState {
  product: IProduct[];
}

const initialState: ProductState = {
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.product.push(action.payload);
    },
    postProduct: (state, action: PayloadAction<IProduct[]>) => {
      state.product = action.payload;
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.product.findIndex(
        (product) => product._id === action.payload._id
      );
      state.product[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const index = state.product.findIndex(
        (product) => product._id === action.payload
      );
      state.product.splice(index, 1);
    },
  },
});

export const { addProduct,postProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
