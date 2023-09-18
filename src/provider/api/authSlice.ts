import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAuth } from "../types/Types";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Auth"],
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
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = auth;
