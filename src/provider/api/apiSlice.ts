import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import type { IAuth, IProduct, IReview } from "../../types";

const token = localStorage.getItem("token");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASEURL }),
  tagTypes: ["Book", "review", "status"],
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
      query: (data) => `/books?search=${data}`,
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `/books/${id}`,
    }),
    getProductsByUser: builder.query<IProduct[], string>({
      query: (email) => `/books/user/${email}`,
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
    getReviews: builder.query<IReview, string>({
      query: (id) => `/reviews/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["review"],
    }),
    getStatusByUser: builder.query<IProduct, string>({
      query: (email) => `/book/status/${email}`,
    }),
    postStatus: builder.mutation({
      query: ({id, body}) => ({
      url: `/status/${id}`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["status"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByUserQuery,
  useGetReviewsQuery,
  useGetStatusByUserQuery,
  usePostStatusMutation,
  usePostReviewMutation,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
