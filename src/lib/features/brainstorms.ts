import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@/utils/storage";
import {
  IGetBrainstormGroupsResponse,
  IGetGroupMembers,
  IGroupMessagesResponse,
} from "@/interface/brainstorms";

export const brainstormsApi = createApi({
  reducerPath: "brainstorms",
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
    getGroups: build.query<IGetBrainstormGroupsResponse, string>({
      query: (id) => {
        const userId = getCookie("id");
        return { url: `/users/groups/idea/${id}?userId=${userId}` };
      },
    }),
    createGroup: build.mutation<
      unknown,
      {
        ideaId: string;
        name: string;
        userId: string;
        text: string
      }
    >({
      query: (body) => ({
        url: "/groups/groups",
        method: "POST",
        body,
      }),
    }),
    inviteMember: build.mutation<
      unknown,
      {
        groupId: string;
        userId: string;
        invitedBy: string;
      }
    >({
      query: (body) => ({
        url: `/groups/invite`,
        method: "POST",
        body,
      }),
    }),
    requestToJoinGroup: build.mutation<
      unknown,
      {
        groupId: string;
        userId: string;
      }
    >({
      query: (body) => ({
        url: `/groups/groups/request-to-join`,
        method: "POST",
        body,
      }),
    }),
    respondToRequest: build.mutation<
      unknown,
      {
        memberId: string;
        status: "accepted" | "rejected";
        userId: string;
      }
    >({
      query: (body) => ({
        url: "/groups/groups/respond-to-request",
        method: "POST",
        body,
      }),
    }),
    acceptInvite: build.mutation<
      unknown,
      {
        userId: string;
        groupId: string;
      }
    >({
      query: (body) => ({
        url: "/groups/accept",
        method: "POST",
        body,
      }),
    }),
    getGroupMembers: build.query<IGetGroupMembers[], string>({
      query: (id) => `/groups/groups/${id}/members`,
    }),
    getGroupMessages: build.query<
      {
        messages: IGroupMessagesResponse[];
      },
      string
    >({
      query: (roomId) => `/groups/messages/${roomId}`,
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useRequestToJoinGroupMutation,
  useLazyGetGroupsQuery,
  useGetGroupMembersQuery,
  useRespondToRequestMutation,
  useLazyGetGroupMessagesQuery,
} = brainstormsApi;
