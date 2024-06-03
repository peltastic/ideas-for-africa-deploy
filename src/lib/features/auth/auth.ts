import config from "@/config/config";
import { ILoginUser, IRegisterUser } from "@/interface/auth";
import { getCookie } from "@/utils/storage";
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
      ILoginUser
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    checkSession: builder.query< {
      message: string
      user: {
        id: string
        email: string
      }
    }, void>({
      query: () => {
        const token = getCookie("token");
        return {
          url: "/users/check-session",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLazyCheckSessionQuery } = authApi;
