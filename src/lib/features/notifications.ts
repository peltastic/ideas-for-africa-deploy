import config from "@/config/config";
import { IGetProfileNotificationResponse } from "@/interface/notifications";

import { getCookie } from "@/utils/storage";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  endpoints: (build) => ({
    setFcmToken: build.mutation<
      unknown,
      {
        userId: string;
        fcmtoken: string;
      }
    >({
      query: (body) => ({
        url: "/users/profile/fcmtoken",
        body,
        method: "POST",
      }),
    }),
    returnFcmToken: build.query<
      {
        fcmtoken: string;
        message: string;
      },
      string
    >({
      query: (id) => `/users/profile/returnfcm/${id}`,
    }),
    getUserNotification: build.query<
      { notifications: IGetProfileNotificationResponse[] },
      string
    >({
      query: (id) => `/users/notifications/unread/${id}`,
    }),
    subscribeEmailNotification: build.mutation<unknown, string>({
      query: (email) => ({
        url: "/subscribe",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

// export function getAccessToken() {
//     const SCOPES  = "https://www.googleapis.com/auth/firebase.messaging"
//     return new Promise(function(resolve, reject) {
//     //   const key = require('../placeholders/service-account.json');
//       const jwtClient = new google.auth.JWT(
//         keys.client_email,
//         undefined,
//         keys.private_key,
//         SCOPES,
//         undefined
//       );
//       jwtClient.authorize(function(err, tokens) {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(tokens?.access_token);
//       });
//     });
//   }

// ;

export const {
  useSetFcmTokenMutation,
  useReturnFcmTokenQuery,
  useGetUserNotificationQuery,
  useLazyGetUserNotificationQuery,
  useSubscribeEmailNotificationMutation,
} = notificationApi;
