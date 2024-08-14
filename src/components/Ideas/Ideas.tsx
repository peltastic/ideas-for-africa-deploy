import React, { useEffect } from "react";
import Idea from "./Idea";
import ProfileFilters from "../Profile/ProfileFilters";
import { useLazyGetUserIdeasQuery } from "@/lib/features/ideas";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import { getCookie } from "@/utils/storage";
import { useParams } from "next/navigation";
import NoIdea from "/public/assets/no-idea.svg";
import Image from "next/image";
import Link from "next/link";

type Props = {
  hideFilter?: boolean;
};

const Ideas = (props: Props) => {
  const { id } = useParams();
  const userId = getCookie("id");
  // const { data, isFetching } = useGetIdeasQuery();
  const [getUserIdeas, { isFetching, data }] = useLazyGetUserIdeasQuery();

  useEffect(() => {
    getUserIdeas((id as string) || userId);
  }, []);

  return (
    <div className="">
      {props.hideFilter ? null : (
        <ProfileFilters
          subtitle="All your ideas for all the time"
          title="Ideas"
        />
      )}
      <div className="">
        {isFetching ? (
          <div className="mt-4 w-full lg:w-[80%] des:w-[60%]">
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
          </div>
        ) : data?.ideasWithDetails ? (
          <div className="w-full lg:w-[80%] des:w-[60%]">
            {data?.ideasWithDetails.map((el) => (
              <Idea
                id={el._id}
                banner={el.banner}
                key={el._id}
                description={el.summary}
                title={el.headline}
                likes={el.likes}
                createdAt={el.createdAt}
                count={el.count}
              />
            ))}
          </div>
        ) : (
          <div className="pt-[5rem] pb-[10rem]">
            <Image src={NoIdea} alt="no-idea" className="mx-auto w-[20rem]" />
            <p className="text-center">No Ideas Posted Yet? <span><Link href={"/share-idea"} className="text-primary underline">Share an Idea</Link></span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;
