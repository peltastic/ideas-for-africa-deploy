import config from "@/config/config";
import {
  IGetIdeasResponse,
  IGetSingleIdeaResponse,
  IModifyIdeaPayload,
} from "@/interface/idea";
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
        minbud?: string;
        maxbud?: string;
        userId?: string;
        banner: File | null;
        files?: File[] | null;
      }
    >({
      query: (body) => {
        const formData = new FormData();
        for (const key in body) {
          if (key === "files") {
            continue;
          }
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
      {
        modiId: string;
      },
      { body: IModifyIdeaPayload; ideaId: string }
    >({
      query: ({ body, ideaId }) => {
        const formData = new FormData();

        for (const key in body) {
          if (key === "files") {
            continue;
          }
          if (body.hasOwnProperty(key)) {
            formData.append(key, body[key as keyof typeof body] as string);
          }
        }
        if (body.files && body.files.length > 0) {
          for (const el of body.files) {
            formData.append("files", el);
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
    getSingleIdea: build.query<
      IGetSingleIdeaResponse,
      { id: string; userId?: string }
    >({
      query: ({ id, userId }) => {
        let query = "";
        if (userId) {
          query = `?userId=${userId}`;
        }
        return { url: `/users/ideas/${id}${query}` };
      },
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
    getTopLikedIdeas: build.query<
      {
        ideas: IGetIdeasResponse[];
      },
      {
        id?: string;
        category?: string;
        limit?: string;
      }
    >({
      query: ({ category, limit }) => {
        let query = "";
        if (category) {
          query = `&category=${category}`;
        }
        return {
          url: `/users/liked/ideas/?limit=${limit || "10"}${query}`,
        };
      },
    }),
    getTopViewedIdeas: build.query<
      { ideas: IGetIdeasResponse[] },
      {
        id?: string;
        category?: string;
        limit?: string;
      }
    >({
      query: ({ category, limit }) => {
        let query = "";
        if (category) {
          query = query + `&category=${category}`;
        }

        return {
          url: `/users/viewed/ideas/?limit=${limit || "10"}${query}`,
        };
      },
    }),
    getAllIdeas: build.query<
      {
        ideas: IGetIdeasResponse[];
        currentPage: number
        totalPages: number
      },
      {
        category: string;
        type: "filter" | "search";
        search?: string;
        filterType?: "views" | "likes" | string;
        page?: number 
      }
    >({
      query: ({ category, type, filterType, search, page }) => {
        let query = "";
        if (type === "filter") {
          query = `/search/${filterType || "likes"}?limit=${8}&page=${page || 1}`;
          if (category) {
            query += `&category=${category}`;
          }
        } else {
          query = `/search/search?query=${search}&limit=${30}&page=${page || 1}`
        }
        return {
          url: query,
        };
      },
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
  useLazyGetTopLikedIdeasQuery,
  useLazyGetTopViewedIdeasQuery,
  useGetTopLikedIdeasQuery,
  useLazyGetAllIdeasQuery,
} = ideasApi;
