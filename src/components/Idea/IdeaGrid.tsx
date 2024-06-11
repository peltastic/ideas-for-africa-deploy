import React, { useState } from "react";
import BrainstormSvg from "/public/assets/brainstorm.svg";
import Image from "next/image";
import AvatarLarge from "/public/assets/avatar-large.png";
import ChatImg from "/public/assets/chat.svg";
import LikeImg from "/public/assets/like-img.svg";

import Instagram from "/public/assets/instagram.svg";
import Facebook from "/public/assets/facebook.svg";
import Twitter from "/public/assets/twitter.svg";
import TestIdeaImg from "/public/assets/test-idea-img.png";
import Tabs from "@/Tabs/Tabs";
import moment from "moment";
import { IGetSingleIdeaResponse } from "@/interface/idea";
import Budget from "./Tabs/Budget";
import Discussions from "./Tabs/Discussions";
import Document from "./Tabs/Document";
import Steps from "./Tabs/Steps";

type Props = {
  data: IGetSingleIdeaResponse;
};

const IdeaGrid = ({ data }: Props) => {
  const [curentTab, setCurrentTab] = useState<
    "Body" | "Steps" | "Budget Range" | "Documents" | "Discussions"
  >("Body");
  const body = (
    <div
      className=""
      dangerouslySetInnerHTML={{
        __html: `${data.idea.body}`,
      }}
    ></div>
  );
  let component = body;
  switch (curentTab) {
    case "Body":
      component = body;
      break;
    case "Budget Range":
      component = <Budget minbud={data.idea.minbud} maxbud={data.idea.maxbud} />;
      break;
    case "Discussions":
      component = <Discussions />;
      break;
    case "Documents":
      component = <Document />;
      break;
    case "Steps":
      component = <Steps pitches={data.pitches} />;
      break;

    default:
      break;
  }
  return (
    <div className="">
      <h1 className="text-2xl font-bold">{data.idea.headline}</h1>
      <button className="flex items-center text-sm rounded-full px-8 py-3 my-6 bg-primary text-white md:mr-8 border-primary border">
        <Image src={BrainstormSvg} className="mr-2" alt="brainstorm svg" />
        <p>Brainstorm idea</p>
      </button>
      <div className="flex flex-wrap items-center  mt-8">
        <div className="mr-4 w-[3rem]">
          <Image src={AvatarLarge} alt="avatar" />
        </div>
        <div className="w-full mt-3 sm:mt-0 sm:w-auto">
          <div className="text-black1 text-xs mr-auto ">
            <p className="  text-lg mb-[0..5rem]">Demilade Odetara</p>
            <p className="text-gray1 leading-5 text-[0.9rem]">
              C.E.O Pledre Solutions • 5 min read •{" "}
              {moment(data.idea.createdAt).startOf("day").fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center text-gray1 text-xs my-8">
        <Image src={LikeImg} alt="chat-img" className="mr-1 w-[1.3rem]" />
        &nbsp;
        <p className="mr-3 text-[0.9rem]">46</p>
        <Image src={ChatImg} alt="chat-img" className="mr-1 w-[1.3rem]" />
        &nbsp;
        <p className="mr-3">10</p>
        <div className="flex">
          <div className="bg-black1 mr-2 p-[0.27rem] flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full">
            <Image src={Instagram} alt="instagram" className="" />
          </div>
          <div className="bg-black1 mr-2 p-[0.27rem] flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full">
            <Image src={Facebook} alt="instagram" className="" />
          </div>
          <div className="bg-black1 mr-2 p-[0.27rem] flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full">
            <Image src={Twitter} alt="instagram" className="" />
          </div>
        </div>
      </div>
      <p>{data.idea.summary}</p>
      <div className="my-8">
        <Image
          src={data.thumbs[0].path}
          width={300}
          height={300}
          className="w-full"
          alt="test-idea"
        />
      </div>
      <div className="">
        <Tabs
          filterVal={curentTab}
          setVal={(el) => setCurrentTab(el)}
          elements={[
            "Body",
            "Steps",
            "Budget Range",
            "Documents",
            "Discussions",
          ]}
        />
      </div>
      <div className="my-8">{component}</div>
    </div>
  );
};

export default IdeaGrid;
