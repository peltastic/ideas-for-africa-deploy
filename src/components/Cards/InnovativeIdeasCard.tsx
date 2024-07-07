import React from "react";
import ClockIcon from "/public/assets/clock-icon.svg";
import Image from "next/image";
import { formatNameRoute, truncateStr } from "@/utils/helperfunctions";
import Avatar from "/public/assets/avatar.png";
import LikeImg from "/public/assets/like.svg";
import { IoShareSocialOutline } from "react-icons/io5";
import moment from "moment";
import { AspectRatio } from "@mantine/core";
import NoProfilePic from "/public/assets/no-profile.jpg";

import InnovativeImg from "/public/assets/innovative7.png";
import { useRouter } from "next/navigation";

type Props = {
  // image: string;
  data: {
    headline: string;
    summary: string;
    createdAt: string;
    category: string;
    banner: string;
    fname: string;
    lname: string;
    pow?: string;
    id: string;
    userId: string;
    ppicture?: string
  };
};

const InnovativeIdeasCard = (props: Props) => {
  const router = useRouter();
  return (
    <div className=" bg-white relative sm:h-[30rem] py-4 mb-6 px-4 shadow-[0_0px_10px_rgba(0,0,0,0.1)] w-full rounded-xl">
      <div
        onClick={() =>
          router.push(
            `/idea/${props.data.id}/${formatNameRoute(props.data.headline)}`
          )
        }
        className="cursor-pointer"
      >
        <div className=" relative rounded-lg overflow-hidden">
          <AspectRatio ratio={1280 / 720} mx={"auto"}>
            <Image
              src={props.data.banner || InnovativeImg}
              width={100}
              height={100}
              alt="innovative-idea-img"
              className="mx-auto  "
            />
          </AspectRatio>
          <p className="bg-white absolute left-4 bottom-4 py-1 px-2 rounded-full text-[.7rem] font-semibold text-black">
            {props.data.category}
          </p>
        </div>
        <div className="flex py-3 text-xs text-gray4 items-center">
          <Image src={ClockIcon} alt="clock-icon" className="mr-2" />
          <p className="mr-auto">10-15mins read</p>
          <p>{moment(props.data.createdAt).startOf("day").fromNow()}</p>
        </div>
        <div className="w-full">
          <h1 className="font-bold mt-2 text-black1">{props.data.headline}</h1>
          <h2 className="text-gray1 text-sm my-3">
            {truncateStr(props.data.summary, 150)}
          </h2>
        </div>
      </div>
      <div className="cursor-pointer bg-white sm:absolute w-[90%] bottom-4 flex mt-6 items-center">
        <div
          className="mr-4 w-[2rem] rounded-full overflow-hidden"
          onClick={() => router.push(`/profile/${props.data.userId}`)}
        >
          <Image src={props.data.ppicture || NoProfilePic } alt="avatar" width={100} height={100} />
        </div>
        <div
          onClick={() => router.push(`/profile/${props.data.userId}`)}
          className="text-xs mr-auto "
        >
          <p className="font-bold mb-[0.1rem]">
            {props.data.fname} {props.data.lname}
          </p>
          <p className="leading-5 text-gray1">{props.data.pow}</p>
        </div>

        <IoShareSocialOutline className="mr-3" />
        <Image src={LikeImg} alt="like-img" />
      </div>
    </div>
  );
};

export default InnovativeIdeasCard;
