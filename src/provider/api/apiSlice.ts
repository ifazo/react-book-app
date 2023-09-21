import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import type { IAuth, IProduct, IReview } from "../types/Types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    createUser: builder.mutation<IAuth, IAuth>({
      query: (body) => ({
        url: "/auth/user/create",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<IAuth, IAuth>({
      query: (body) => ({
        url: "/auth/user/login",
        method: "POST",
        body,
      }),
    }),
    getProducts: builder.query<IProduct[], string>({
      query: () => "/books",
    }),
    postProduct: builder.mutation<IProduct, IProduct>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),
    getSearchProducts: builder.query<IProduct, string>({
      query: (data) => `/books/search?q=${data}`,
    }),
    getProductByUser: builder.query<IProduct, string>({
      query: (email) => `/books/user/${email}`,
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `/books/${id}`,
    }),
    postReview: builder.mutation<IReview, string>({
      query: (review) => ({
        url: "/book/reviews",
        method: "POST",
        body: review,
      }),
    }),
    getReview: builder.query<IReview, string>({
      query: (id) => `/reviews/${id}`,
    }),
    getStatusByUser: builder.query<IProduct, string>({
      query: (email) => `/book/status/${email}`,
    }),
    postStatus: builder.mutation<IProduct, IProduct>({
      query: (status) => ({
        url: "/book/status",
        method: "POST",
        body: status,
      }),
    }),
    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (body) => ({
        url: `/books/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteProduct: builder.mutation<IProduct, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetProductsQuery,
  useGetSearchProductsQuery,
  useGetProductByIdQuery,
  useGetProductByUserQuery,
  useGetReviewQuery,
  useGetStatusByUserQuery,
  usePostStatusMutation,
  usePostReviewMutation,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
