import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscribeApi = createApi({
    reducerPath: "subscribeAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.ideasafrica.org"
    }),
    endpoints: (build) => ({
        subscribeEmailNotification: build.mutation<unknown, string>({
            query: (email) => ({
              url: "/subscribe",
              method: "POST",
              body: { email },
            }),
          }),
    })
})


export const {useSubscribeEmailNotificationMutation} = subscribeApi