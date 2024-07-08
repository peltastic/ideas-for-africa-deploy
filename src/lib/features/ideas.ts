import config from "@/config/config";
import {
  ICreateIdeaPayload,
  IGetIdeasResponse,
  IGetSingleIdeaResponse,
  IModifyIdeaPayload,
} from "@/interface/idea";
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
        files?: File[] | null;
      }
    >({
      query: (body) => {
        const formData = new FormData();
        for (const key in body) {
          if (body.hasOwnProperty(key)) {
            formData.append(key, body[key as keyof typeof body] as string);
          }
        }
        if (body.files && body.files.length > 0) {
          for (const el of body.files) {
            formData.append("files", el);
          }
        }
        // const payload = formDataHandler(body);
        return {
          url: "/users/ideas",
          method: "POST",
          body: formData,
        };
      },
    }),
    modifyIdea: build.mutation<
      unknown,
      { body: IModifyIdeaPayload; ideaId: string }
    >({
      query: ({ body, ideaId }) => {
        const formData = new FormData();

        for (const key in body) {
          if (body.hasOwnProperty(key)) {
            formData.append(key, body[key as keyof typeof body] as string);
          }
        }

        return {
          url: `/users/ideas/${ideaId}/modify`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    getIdeas: build.query<{ ideas: IGetIdeasResponse[] }, void>({
      query: () => "/users/ideas",
    }),
    getSingleIdea: build.query<IGetSingleIdeaResponse, { id: string }>({
      query: ({ id }) => `/users/ideas/${id}`,
    }),
    getIdeaBycategory: build.query<{ ideas: IGetIdeasResponse[] }, string>({
      query: (category) => `/users/ideas/active/${category}`,
    }),
    getUserIdeas: build.query<
      {
        ideasWithDetails: IGetIdeasResponse[];
      },
      string
    >({
      query: (id) => `/users/idea/post?status=allowed&userId=${id}`,
    }),
    getModifiedIdeas: build.query<
      { modifiedIdeas: IGetIdeasResponse[] },
      string
    >({
      query: (ideaId) => `/users/modified-ideas/?ideaId=${ideaId}`,
    }),
    getSingleModifiedIdea: build.query<IGetSingleIdeaResponse, string>({
      query: (id) => `/users/mideas/${id}`,
    }),
    likeIdea: build.mutation<
      unknown,
      {
        ideaId: string;
        userId: string;
      }
    >({
      query: ({ userId, ideaId }) => ({
        url: `/users/ideas/${ideaId}/like`,
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
  }),
});

export const {
  useCreateIdeaMutation,
  useGetIdeasQuery,
  useLazyGetSingleIdeaQuery,
  useLikeIdeaMutation,
  useLazyGetIdeasQuery,
  useLazyGetIdeaBycategoryQuery,
  useModifyIdeaMutation,
  useLazyGetUserIdeasQuery,
  useLazyGetModifiedIdeasQuery,
  useLazyGetSingleModifiedIdeaQuery,
} = ideasApi;
