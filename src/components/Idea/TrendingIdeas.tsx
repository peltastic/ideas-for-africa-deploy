import Image from "next/image";
import React, { useEffect } from "react";
import ArrowFoward from "/public/assets/arrow_forward.svg";
import Trending from "/public/assets/trending.png";
import {
  useGetTopLikedIdeasQuery,
  useLazyGetTopLikedIdeasQuery,
} from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";
import TailwindSpinner from "../Spinner/TailwindSpinner";
import { AspectRatio } from "@mantine/core";
import { useRouter } from "next/navigation";
import { formatNameRoute } from "@/utils/helperfunctions";

type Props = {};

const TrendingIdeas = (props: Props) => {
  const router = useRouter()
  const id = getCookie("id");
  const [getTopLikedIdeas, { isFetching, data }] =
    useLazyGetTopLikedIdeasQuery();
  useEffect(() => {
    getTopLikedIdeas({
      id,
      limit: "3",
    });
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-lg">Trending ideas</h1>
      {isFetching ? (
        <div className="my-6">
          <TailwindSpinner />
        </div>
      ) : (
        <>
          {data?.ideas.map((el) => (
            <div onClick={ () => {
              router.push(`/idea/${el._id}/${formatNameRoute(el.headline)}`)
            }} className="border-gray3 cursor-pointer hover:bg-gray3 transition-all border py-4 px-4 rounded-lg my-4">
              <div className="flex items-center">
                <div className="w-[15%] rounded-md overflow-hidden mr-6">
                  <AspectRatio ratio={1080 / 720} mx="auto">
                    <Image
                      src={el.thumbPath as string}
                      width={100}
                      height={100}
                      alt="avatar"
                      className="w-full"
                    />
                  </AspectRatio>
                </div>
                <div className="mr-auto w-[70%]">
                  <p className="font-semibold text-sm">{el.headline}</p>
                  <p className="text-xs text-gray1">
                    {el.fname} {el.lname}
                  </p>
                </div>
                <div className="">
                  <Image
                    src={ArrowFoward}
                    alt="avatar"
                    className="w-[1.1rem]"
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TrendingIdeas;
