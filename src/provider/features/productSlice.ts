import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types/Types";

export interface ProductState {
  products: IProduct[];
  // status: "idle" | "loading" | "failed";
  // error: string | undefined | null;
}

const initialState: ProductState = {
  products: [],
  // status: "idle",
  // error: null,
};

// export const getProduct = createAsyncThunk("product/get", async () => {
//   const response = await axios.get("http://localhost:5000/api/products");
//   return response.data;
// });

// export const postProduct = createAsyncThunk(
//   "product/post",
//   async (product: IProduct) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/products",
//       product
//     );
//     return response.data;
//   }
// );

// export const updateProduct = createAsyncThunk(
//   "product/update",
//   async (product: IProduct) => {
//     const response = await axios.patch(
//       `http://localhost:5000/api/products/${product._id}`,
//       product
//     );
//     return response.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "product/delete",
//   async (id: string) => {
//     await axios.delete(`http://localhost:5000/api/products/${id}`);
//     return id;
//   }
// );

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getProduct.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(getProduct.fulfilled, (state, action) => {
  //     state.products = action.payload;
  //     state.status = "idle";
  //   });
  //   builder.addCase(getProduct.rejected, (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   });

  //   builder.addCase(postProduct.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(postProduct.fulfilled, (state, action) => {
  //     state.products.push(action.payload);
  //   });
  //   builder.addCase(postProduct.rejected, (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   });

  //   builder.addCase(updateProduct.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(updateProduct.fulfilled, (state, action) => {
  //     const index = state.products.findIndex(
  //       (product) => product._id === action.payload._id
  //     );
  //     state.products[index] = action.payload;
  //   });
  //   builder.addCase(updateProduct.rejected, (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   });

  //   builder.addCase(deleteProduct.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(deleteProduct.fulfilled, (state, action) => {
  //     const index = state.products.findIndex(
  //       (product) => product._id === action.payload
  //     );
  //     state.products.splice(index, 1);
  //   });
  //   builder.addCase(deleteProduct.rejected, (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   });
  //   // reducers: {
  //   //   addProduct: (state, action: PayloadAction<IProduct>) => {
  //   //     state.product.push(action.payload);
  //   //   },
  //   //   postProduct: (state, action: PayloadAction<IProduct[]>) => {
  //   //     state.product = action.payload;
  //   //   },
  //   //   updateProduct: (state, action: PayloadAction<IProduct>) => {
  //   //     const index = state.product.findIndex(
  //   //       (product) => product._id === action.payload._id
  //   //     );
  //   //     state.product[index] = action.payload;
  //   //   },
  //   //   deleteProduct: (state, action: PayloadAction<string>) => {
  //   //     const index = state.product.findIndex(
  //   //       (product) => product._id === action.payload
  //   //     );
  //   //     state.product.splice(index, 1);
  //   //   },
  //   // },
  // },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
