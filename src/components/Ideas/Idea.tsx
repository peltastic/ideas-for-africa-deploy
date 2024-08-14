import React from "react";
import IdeaImg from "/public/assets/idea-img-1.png";
import Image from "next/image";
import ChatImg from "/public/assets/chat.svg";
import LikeImg from "/public/assets/like-img.svg";
import { formatNameRoute, truncateStr } from "@/utils/helperfunctions";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@mantine/core";
import NoProfilePic from "/public/assets/no-profile.jpg";
import moment from "moment";

type Props = {
  modified?: boolean;
  title: string;
  banner?: string;
  description?: string;
  id?: string;
  likes?: string;
  ppicture?: string;
  fname?: string;
  lname?: string;
  userId?: string;
  ideaId?: string;
  createdAt: string;
  count: number;
};

const Idea = (props: Props) => {
  const router = useRouter();
  return (
    <div className="sm:flex flex-wrap sm:flex-nowrap  my-10">
      <div
        onClick={() => {
          if (props.modified) {
            return router.push(
              `/idea/${props.ideaId}/${formatNameRoute(
                props.title
              )}/modified-idea/${props.id}`
            );
          }
          router.push(`/idea/${props.id}/${formatNameRoute(props.title)}`);
        }}
        className="w-[95%] xxs:w-[90%] sm:w-[30%] md:w-[20%] cursor-pointer mx-auto sm:mx-0   overflow-hidden rounded-md sm:mr-4 flex items-center"
      >
        <div className="hidden sm:block w-full">
          <AspectRatio ratio={1080 / 720} mx="auto">
            <Image
              src={
                props.banner ||
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
              props.banner ||
              "https://res.cloudinary.com/da9gqyswp/image/upload/v1717722025/xbvycbrxduhl5lvqewc5.jpg"
            }
            width={100}
            height={100}
            alt="idea-img"
            className="w-full"
          />
        </div>
      </div>
      <div
        className={` w-[95%] xxs:w-[90%] sm:w-[70%] flex flex-col justify-between md::w-[80%] mx-auto sm:mx-0 mt-3 sm:mt-0`}
      >
        <div className="flex items-center mb-2">
          <h1
            onClick={() => {
              if (props.modified) {
                return router.push(
                  `/idea/${props.ideaId}/${formatNameRoute(
                    props.title
                  )}/modified-idea/${props.id}`
                );
              }
              router.push(`/idea/${props.id}/${formatNameRoute(props.title)}`);
            }}
            className=" cursor-pointer font-semibold text-sm "
          >
            {props.title ||
              "Affiliate Mastery: Pathway to Seven-Figure Success"}
          </h1>
          {props.modified ? (
            <p className="text-gray1 bg-gray3 ml-4 py-1 px-4 rounded-full text-xs ">
              Modified
            </p>
          ) : null}
        </div>
        <p
          onClick={() => router.push(`/idea/${props.id}`)}
          className="text-xs mb-1 cursor-pointer"
        >
          {
            truncateStr(
              props.description ||
                "The ideal way to run a hydro plant involves maximizing efficiency by regulating water flow to match energy demand, while also considering environmental impacts to maintain ecological...",
              150
            ).text
          }
        </p>
        {props.modified ? (
          <div className="flex items-center mt-5">
            <div
              className="mr-2 w-[1.5rem]   rounded-full overflow-hidden"
              onClick={() => {
                if (!props.userId) {
                  return;
                }
                router.push(`/profile/${props.userId}`);
              }}
            >
              <AspectRatio ratio={1800/1800}>
                <Image
                  src={props.ppicture || NoProfilePic}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </AspectRatio>
            </div>
            <div
              onClick={() => router.push(`/profile/${props.ppicture}`)}
              className="text-xs mr-auto "
            >
              <p className="font-medium mb-[0.2rem]">
                {props.fname} {props.lname}
              </p>
              {/* <p className="leading-5 text-gray1">{props.data.pow}</p> */}
            </div>
          </div>
        ) : (
          <div className="flex items-center text-gray1 text-xs">
            <Image src={ChatImg} alt="chat-img" className="mr-1" />{" "}
            <p className="mr-2">{props.count}</p> •{" "}
            <Image src={LikeImg} alt="chat-img" className="mx-2" />{" "}
            <p className="mr-2">{props.likes}</p> •{" "}
            <p className="ml-2">{moment(props.createdAt).fromNow()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Idea;
