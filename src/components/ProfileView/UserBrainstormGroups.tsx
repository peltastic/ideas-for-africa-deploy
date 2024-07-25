import { useGetUserBrainstormGroupsQuery } from "@/lib/features/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import React from "react";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import { AspectRatio } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { truncateStr } from "@/utils/helperfunctions";
import moment from "moment";

type Props = {};

const UserBrainstormGroups = (props: Props) => {
  const router = useRouter();
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isFetching } = useGetUserBrainstormGroupsQuery(
    id ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <div className="w-full lg:w-[80%] des:w-[70%]">
      {isFetching ? (
        <div className="">
          <div className="">
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
          </div>
        </div>
      ) : (
        <div className="">
          {data?.groups?.map((el) => (
            <div
              className="sm:flex flex-wrap sm:flex-nowrap items-center my-10"
              key={el._id}
            >
              <div className=" w-[95%] xss:w-[90%] sm:w-[30%] md:w-[15%] cursor-pointer mx-auto sm:mx-0   overflow-hidden rounded-md sm:mr-4 flex items-center">
                <div className="hidden sm:block w-full">
                  <AspectRatio ratio={1080 / 720} mx="auto">
                    <Image
                      src={
                        el.banner ||
                        "https://res.cloudinary.com/da9gqyswp/image/upload/v1717722025/xbvycbrxduhl5lvqewc5.jpg"
                      }
                      width={100}
                      height={100}
                      alt="idea-img"
                      className="w-full"
                    />
                  </AspectRatio>
                </div>
                <div className="block sm:hidden w-full">
                  <Image
                    src={
                      el.banner ||
                      "https://res.cloudinary.com/da9gqyswp/image/upload/v1717722025/xbvycbrxduhl5lvqewc5.jpg"
                    }
                    width={100}
                    height={100}
                    alt="idea-img"
                    className="w-full"
                  />
                </div>
              </div>
              <div className={` w-[95%] xxs:w-[90%] sm:w-[70%] md:w-[80%] mx-auto sm:mx-0 mt-3 sm:mt-0`}>
                <div className="flex items-center mb-2">
                  <h1
                    // onClick={() => router.push(`/idea/${props.id}`)}
                    className=" cursor-pointer font-semibold text-sm "
                  >
                    {el.admin.split(" ")[0]}&apos; brainstorm group on &lsquo;
                    {el.ideaTitle ||
                      "No text"}
                    &rsquo;
                  </h1>
                </div>
                <p
                  // onClick={() => router.push(`/idea/${props.id}`)}
                  className="text-sm mb-1 cursor-pointer"
                >
                  {
                    truncateStr(
                      el.text ||
                        "No text",
                      150
                    ).text
                  }{" "}
                  {truncateStr(el.text, 150).status ? " ..." : ""}
                </p>

                <p className="text-xs mt-2">{moment(el.createdAt).fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBrainstormGroups;
