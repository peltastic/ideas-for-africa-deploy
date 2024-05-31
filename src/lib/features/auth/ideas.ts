import config from "@/config/config";
import { ICreateIdeaPayload } from "@/interface/idea";
import { formDataHandler } from "@/utils/helperfunctions";
import { getCookie } from "@/utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ideasApi = createApi({
    reducerPath: "ideasApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("token") 
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (build) => ({
        createIdea: build.mutation<unknown, ICreateIdeaPayload>({
            query: (body) => {
                const payload = formDataHandler(body)
                return {
                    url: "/api/users/ideas",
                    method: "POST",
                    body: payload
                }
            }
        })
    })
})