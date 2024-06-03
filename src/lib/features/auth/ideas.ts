import config from "@/config/config";
import { ICreateIdeaPayload, IGetIdeasResponse } from "@/interface/idea";
import { formDataHandler } from "@/utils/helperfunctions";
import { getCookie } from "@/utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ideasApi = createApi({
  reducerPath: "ideasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    createIdea: build.mutation<
      unknown,
      {
        headline: string;
        summary: string;
        category: string;
        body: string;
        pitches: string;
        minbud: string;
        maxbud: string;
        userId?: string;
        banner: File | null;
        files?: File | null;
      }
    >({
      query: (body) => {
        const payload = formDataHandler(body);
        return {
          url: "/users/ideas",
          method: "POST",
          body: payload,
        };
      },
    }),
    getIdeas: build.query<{ideas:IGetIdeasResponse[], }, void>({
      query: () => "/users/ideas"
    })
  }),
});

export const { useCreateIdeaMutation, useGetIdeasQuery } = ideasApi;
