import config from "@/config/config";
import { IGetIdeaCommentResponse } from "@/interface/coments";
import { getCookie } from "@/utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
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
    commentOnIdea: build.mutation<
      unknown,
      {
        ideaId: string;
        body: {
          content: string;
          userId: string;
        };
      }
    >({
      query: ({ ideaId, body }) => ({
        url: `/comments/ideas/${ideaId}/comments`,
        method: "POST",
        body,
      }),
    }),
    getIdeaComments: build.query<
      {
        comments: IGetIdeaCommentResponse[];
      },
      string
    >({
      query: (id) => `/comments/ideas/${id}/getcomments`,
    }),
  }),
});

export const { useCommentOnIdeaMutation, useLazyGetIdeaCommentsQuery } =
  commentsApi;
