import { useGetUserBrainstormGroupsQuery } from "@/lib/features/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const UserBrainstormGroups = (props: Props) => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data } = useGetUserBrainstormGroupsQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true
  });
  return <div>UserBrainstormGroups</div>;
};

export default UserBrainstormGroups;
