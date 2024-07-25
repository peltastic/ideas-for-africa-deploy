import React from "react";

import Image from "next/image";
import Avatar from "/public/assets/avatar.png";
import NoProfilePic from "/public/assets/no-profile.jpg";
import { AspectRatio } from "@mantine/core";
import { formatNameRoute, truncateStr } from "@/utils/helperfunctions";
import { useRouter } from "next/navigation";

type Props = {
  headline: string;
  summaary: string;
  ppicture: string;
  banner: string;
  lname: string;
  pow: string;
  userId: string;
  id: string;
};

const CarouselCard = (props: Props) => {
  const router = useRouter();
  return (
    <div className=" relative h-[85%] overflow-hidden rounded-xl">
      <div className="relative">
        <div
          onClick={() =>
            router.push(`/idea/${props.id}/${formatNameRoute(props.headline)}`)
          }
          className=" cursor-pointer absolute top-0 left-0 bg-[#05050598] w-full h-full"
        ></div>
        <div className="hidden xxs:block">
          <AspectRatio ratio={900 / 1120}>
            <Image
              src={props.banner}
              layout="intrinsic"
              width={100}
              height={500}
              alt="image"
              className="h-full w-full"
              // objectFit="cover"
            />
          </AspectRatio>
        </div>
        <div className="block xxs:hidden">
          <AspectRatio ratio={800 / 1120}>
            <Image
              src={props.banner}
              layout="intrinsic"
              width={100}
              height={500}
              alt="image"
              className="h-full w-full"
              // objectFit="cover"
            />
          </AspectRatio>
        </div>
      </div>
      <div
        onClick={() =>
          router.push(`/idea/${props.id}/${formatNameRoute(props.headline)}`)
        }
        className="cursor-pointer absolute top-[40%] left-[50%] -translate-x-[47%] w-[90%] text-white"
      >
        <h2 className=" text-sm sm:text-base  font-semibold mb-4">
          {props.headline}
        </h2>
        <h3 className="text-xs sm:text-sm  text-gray2 font-light mb-4">
          {truncateStr(props.summaary, 120).text}{" "}
          {truncateStr(props.summaary, 120).status ? (
            <span className="font-semibold">read more...</span>
          ) : null}
        </h3>
      </div>
      <div
        onClick={() => router.push(`/profile/${props.userId}`)}
        className="cursor-pointer z-[100] absolute bottom-4 flex items-center left-[50%] -translate-x-[47%] w-[95%] text-white"
      >
        <div className="mr-4 rounded-full overflow-hidden w-[2rem]">
          <Image
            src={props.ppicture || NoProfilePic}
            width={100}
            height={100}
            alt="avatar"
          />
        </div>
        <div className="text-xs lg:text-sm ">
          <p className="font-semibold">{props.lname}</p>
          <p className="leading-5 text-gray2">{props.pow}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
