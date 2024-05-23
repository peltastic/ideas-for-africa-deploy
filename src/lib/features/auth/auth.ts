import config from "@/config/config";
import { IRegisterUser } from "@/interface/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<{
      message: string
    }, IRegisterUser>({
      query: () => ({
        url: "/users/reg",
        method: "POST",
      }),
    }),
    loginUser: builder.mutation<unknown, IRegisterUser>({
        query: () => ({
            url: "/users/login",
            method: "POST"
        })
    })
  }),
});

export const {useLoginUserMutation, useRegisterUserMutation} = authApi;
