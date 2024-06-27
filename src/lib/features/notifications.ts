import config from "@/config/config";
import axios from "axios";

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
  }),
});

export const sendNotification = async (
  fcm_token: string,
  title: string,
  notification: string
) => {
  await axios.post("https://fcm.googleapis.com/fcm/send", {
    priority: "HIGH",
    data: {
      title,
      notification,
    },
    to: fcm_token,
  });
};

export const { useSetFcmTokenMutation } = notificationApi;
