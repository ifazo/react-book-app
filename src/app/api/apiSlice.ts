import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
// console.log(token);
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Book", "review", "status"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
    }),
    getProducts: builder.query({
      query: () => "/books",
    }),
    getRecentProducts: builder.query({
      query: () => "/books/recent",
    }),
    getProductsBySearch: builder.query({
      query: (data) => `/books?search=${data}`,
    }),
    getProductById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    getProductsByUser: builder.query({
      query: (email) => `/books/user/${email}`,
    }),
    postProduct: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${token}`,
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
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
        body: { id },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Book"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["review"],
    }),
    getStatus: builder.query({
      query: ({user, status}) => `/status?user=${user}&status=${status}`,
    }),
    postStatus: builder.mutation({
      query: (body) => ({
        url: "/status",
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["status"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/status/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [ "status" ],
    }),
    deleteStatus: builder.mutation({
      query: (id) => ({
        url: `/status/${id}`,
        method: "DELETE",
        body: { id },
        headers: {
          authorization: `Bearer ${token}`,
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
  useGetRecentProductsQuery,
  useGetProductsBySearchQuery,
  useGetProductByIdQuery,
  useGetProductsByUserQuery,
  useGetReviewsQuery,
  useGetStatusQuery,
  usePostStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation,
  usePostReviewMutation,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
