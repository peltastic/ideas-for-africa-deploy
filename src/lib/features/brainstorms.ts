import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@/utils/storage";
import {
  IGetGroupMembers,
  IGetSearchBrainstormGroups,
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
    getGroups: build.query<IGetSearchBrainstormGroups, string>({
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
        text: string;
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
        status: "accepted" | "declined";
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
    getGroupInfo: build.query<
      {
        group: {
          name: string;
        };
        fname: string
        lname: string
        profilepic: string
        ideaheadline: string
      },
      { groupId: string; userId?: string }
    >({
      query: ({ groupId, userId }) => `/groups/groups/${groupId}`,
    }),
    searchBrainstorms: build.query<
      IGetSearchBrainstormGroups,
      {
        type: "idea" | "admin";
        searchValue: string;
        userId?: string;
      }
    >({
      query: ({ type, searchValue, userId }) => {
        let query;
        if (type === "admin") {
          query = `/search/groups-by-admin?search=${searchValue || ""}`;
        } else {
          query = `/search/groups-by-idea?search=${searchValue || ""}`;
        }
        if (userId) {
          query += `&userId=${userId}`;
        }

        return {
          url: query,
        };
      },
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
  useLazyGetGroupInfoQuery,
  useLazySearchBrainstormsQuery,
} = brainstormsApi;
