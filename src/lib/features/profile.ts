import config from "@/config/config";
import { IGetUserModifiedIdeasResponse, IGetUserProfileResponse, IUpdateProfilePayload } from "@/interface/profile";
import { getCookie } from "@/utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
    updateProfile: build.mutation<
      any,
      { userId: string; body: IUpdateProfilePayload }
    >({
      query: ({ body, userId }) => ({
        url: `/users/user/${userId}`,
        method: "PUT",
        body,
      }),
    }),
    getUserProfile: build.query<IGetUserProfileResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}/profile`,
      }),
    }),
    uploadProfilePicture: build.mutation<
      {
        ppicture: string;
      },
      { pfp: File; id: string }
    >({
      query: ({ pfp, id }) => {
        const body = new FormData();
        body.append("ppicture", pfp);
        return {
          url: `/users/upload/${id}`,
          method: "POST",
          body,
        };
      },
    }),
    changePassword: build.mutation<
      unknown,
      {
        userId: string;
        oldPassword: string;
        newPassword: string;
      }
    >({
      query: (body) => ({
        url: "/users/password",
        body,
        method: "POST",
      }),
    }),
    getUserModifiedIdeas: build.query<IGetUserModifiedIdeasResponse, string>({
      query: (userId) => `/users/modifiedIdeas/user/${userId}`,
    }),
    getUserBrainstormGroups: build.query<{
      groups: {
        _id: string
        ideaId: string
        text: string
        createdAt: string
        ideaTitle: string
        admin: string
        banner: string
      }[]
    }, string>({
      query: (userId) => `/groups/user/${userId}`
    })
  }),
});

export const {
  useUpdateProfileMutation,
  useLazyGetUserProfileQuery,
  useUploadProfilePictureMutation,
  useChangePasswordMutation,
  useGetUserModifiedIdeasQuery,
  useGetUserBrainstormGroupsQuery
} = profileApi;
