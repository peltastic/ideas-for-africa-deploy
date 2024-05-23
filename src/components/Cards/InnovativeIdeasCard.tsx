import React from "react";
import ClockIcon from "/public/assets/clock-icon.svg";
import Image from "next/image";
import { truncateStr } from "@/utils/helperfunctions";
import Avatar from "/public/assets/avatar.png";
import LikeImg from "/public/assets/like.svg";
import { IoShareSocialOutline } from "react-icons/io5";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  image: StaticImport;
};

const InnovativeIdeasCard = (props: Props) => {
  return (
    <div className=" py-4 mb-6 px-4 shadow-[0_0px_10px_rgba(0,0,0,0.1)] w-fit rounded-xl">
      <div className="">
        <div className="relative">
          <Image
            src={props.image}
            alt="innovative-idea-img"
            className="mx-auto w-full"
          />
          <p className="bg-white absolute left-4 bottom-4 py-1 px-2 rounded-full text-[.7rem] font-semibold text-black">Technology</p>
        </div>
        <div className="flex py-3 text-xs text-gray4 items-center">
          <Image src={ClockIcon} alt="clock-icon" className="mr-2" />
          <p className="mr-auto">10-15mins read</p>
          <p>2hour ago</p>
        </div>
        <div className="">
          <h1 className="font-bold mt-2 text-black1">
            Energy generation for recycling rubber
          </h1>
          <h2 className="text-gray1 text-sm my-3">
            {truncateStr(
              "We need to solve the problems that matter. Find out what mattersmost to your community and verify your insights. Diversify the ideas in your innovation pipeline by inviting anyone to share, validate,and build on one another’s inspiration.",
              150
            )}
          </h2>
          <div className="flex mt-6 items-center">
            <div className="mr-4">
              <Image src={Avatar} alt="avatar" />
            </div>
            <div className="text-xs mr-auto ">
              <p className="font-bold">Demilade Odetara</p>
              <p className="leading-5 text-gray1">CEO Pledre Solutions</p>
            </div>
            <IoShareSocialOutline className="mr-3" />
            <Image src={LikeImg} alt="like-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeIdeasCard;
