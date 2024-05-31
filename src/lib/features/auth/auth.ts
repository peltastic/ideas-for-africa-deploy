import config from "@/config/config";
import { IRegisterUser } from "@/interface/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      {
        message: string;
        token: string;
        userId: string;
        vscode: string;
      },
      IRegisterUser
    >({
      query: (body) => ({
        url: "/users/reg",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<
      {
        message: string;
        token: string;
      },
      IRegisterUser
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
