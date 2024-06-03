import React from "react";
import IdeaImg from "/public/assets/idea-img-1.png";
import Image from "next/image";
import ChatImg from "/public/assets/chat.svg";
import LikeImg from "/public/assets/like-img.svg";

type Props = {
  modified?: boolean;
  title?: string;
  description?: string;
};

const Idea = (props: Props) => {
  return (
    <div className="sm:flex flex-wrap sm:flex-nowrap items-center my-10">
      <div className="w-[95%] mx-auto sm:mx-0 sm:w-[20%] md:w-[30%] des:w-[25%] sm:mr-4">
        <Image src={IdeaImg} alt="idea-img" className="w-full" />
      </div>
      <div className="w-[95%%] mx-auto sm:mx-0 mt-3 sm:mt-0">
        <h1 className="font-semibold text-sm mb-1">
          {props.title || "Affiliate Mastery: Pathway to Seven-Figure Success"}
        </h1>
        <p className="text-xs mb-1">
          {
            " The ideal way to run a hydro plant involves maximizing efficiency by regulating water flow to match energy demand, while also considering      environmental impacts to maintain ecological..."
          }
        </p>
        <div className="flex items-center text-gray1 text-xs">
          <Image src={ChatImg} alt="chat-img" className="mr-1" />{" "}
          <p className="mr-2">10</p> •{" "}
          <Image src={LikeImg} alt="chat-img" className="mx-2" />{" "}
          <p className="mr-2">46</p> • <p className="ml-2">2 hours ago</p>
        </div>
      </div>
    </div>
  );
};

export default Idea;
