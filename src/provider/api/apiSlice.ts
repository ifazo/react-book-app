import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import type { IAuth, IProduct, IReview, IStatus } from "../../types";

const token = localStorage.getItem("token");
console.log(token)

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    signUp: builder.mutation<IAuth, IAuth>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation<IAuth, IAuth>({
      query: (body) => ({
        url: "/auth/sign-in",
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
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
        body: { id },
        headers: {
          Authorization: `Bearer ${token}`,
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
    getReview: builder.query<IReview, string>({
      query: (id) => `/reviews/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getStatusByUser: builder.query<IProduct, string>({
      query: (email) => `/book/status/${email}`,
    }),
    postStatus: builder.mutation<IStatus, IStatus>({
      query: (body) => ({
        url: "/status",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
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
