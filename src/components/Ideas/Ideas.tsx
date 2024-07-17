import React, { useEffect } from "react";
import Idea from "./Idea";
import ProfileFilters from "../Profile/ProfileFilters";
import {
  useGetIdeasQuery,
  useLazyGetUserIdeasQuery,
} from "@/lib/features/ideas";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import { getCookie } from "@/utils/storage";
import { useParams } from "next/navigation";

type Props = {
  hideFilter?: boolean;
};

const Ideas = (props: Props) => {
  const {id} = useParams()
  const userId = getCookie("id");
  // const { data, isFetching } = useGetIdeasQuery();
  const [getUserIdeas, { isFetching, data }] = useLazyGetUserIdeasQuery();

  useEffect(() => {
    getUserIdeas(id as string || userId);
  }, []);

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
          // <div className=""></div>
          <>
            {data?.ideasWithDetails.map((el) => (
              <Idea
                id={el._id}
                banner={el.banner}
                key={el._id}
                description={el.summary}
                title={el.headline}
                likes={el.likes}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Ideas;
