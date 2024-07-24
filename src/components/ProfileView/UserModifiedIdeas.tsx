import { useGetUserModifiedIdeasQuery } from "@/lib/features/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import React from "react";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import Idea from "../Ideas/Idea";

type Props = {};

const UserModifiedIdeas = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetUserModifiedIdeasQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="w-full lg:w-[80%] des:w-[70%]">
      {isFetching ? (
        <div className="">
          <IdeasSkeleton />
          <IdeasSkeleton />
          <IdeasSkeleton />
          <IdeasSkeleton />
        </div>
      ) : ( 
        <div className="">
          {data?.modifiedIdeas ? (
            <>
              {data?.modifiedIdeas.map((el) => (
                <Idea
                  id={el._id}
                  key={el._id}
                  description={el.summary}
                  title={el.headline}
                  modified
                  fname={el.fname}
                  lname={el.lname}
                  ppicture={el.ppicture}
                  userId={el.userId}
                  ideaId={el.originalIdeaId}
                />
              ))}
            </>
          ) : (
            <p>Yellooo</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserModifiedIdeas;
