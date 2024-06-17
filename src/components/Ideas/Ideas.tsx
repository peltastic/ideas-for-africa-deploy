import React from "react";
import Idea from "./Idea";
import ProfileFilters from "../Profile/ProfileFilters";
import { useGetIdeasQuery } from "@/lib/features/ideas";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";

type Props = {
  hideFilter?: boolean;
};

const Ideas = (props: Props) => {
  const { data, isFetching } = useGetIdeasQuery();
  return (
    <div className="">
      {props.hideFilter ? null : (
        <ProfileFilters
          subtitle="All your ideas for all the time"
          title="Ideas"
        />
      )}
      <div className="w-full lg:w-[80%] des:w-[60%]">
        {isFetching ? (
          <div className="mt-4 w-full">

          <IdeasSkeleton />
          <IdeasSkeleton />
          <IdeasSkeleton />
          <IdeasSkeleton />
          </div>
        ) : (
          <>
           {data?.ideas.map(el => <Idea id={el._id} banner={el.banner} key={el.headline} description={el.summary}  title={el.headline}  />)}
          </>
        )}  
      </div>
    </div>
  );
};

export default Ideas;
