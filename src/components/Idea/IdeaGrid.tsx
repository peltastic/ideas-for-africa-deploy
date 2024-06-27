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
import { replacePTags } from "@/utils/helperfunctions";
import Link from "next/link";
import IdeaOptionsMobile from "./IdeaOptionsMobile";
import NoProfilePic from "/public/assets/no-profile.jpg";
import UnlikedImg from "/public/assets/unlike.svg";
import { useLikeIdeaMutation } from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";

type Props = {
  data: IGetSingleIdeaResponse;
  setOpenVH: () => void;
};

const IdeaGrid = ({ data, setOpenVH }: Props) => {
  const id = getCookie("id");
  const [likesCount, setLikesCount] = useState<number>(data.likes);
  const [liked, setLiked] = useState<boolean>(data.userHasLiked);
  const [likeIdea, {}] = useLikeIdeaMutation();
  const [curentTab, setCurrentTab] = useState<
    "Body" | "Steps" | "Budget" | "Documents" | "Discussions" | string
  >("Body");
  const body = (
    <div
      className=""
      dangerouslySetInnerHTML={{
        __html: `${replacePTags(data.idea.body)}`,
      }}
    ></div>
  );
  let component = body;
  switch (curentTab) {
    case "Body":
      component = body;
      break;
    case "Budget":
      component = (
        <Budget minbud={data.idea.minbud} maxbud={data.idea.maxbud} />
      );
      break;
    case "Discussions":
      component = <Discussions ideaId={data.idea._id} />;
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
  const likeHandler = () => {
    likeIdea({
      ideaId: data.idea._id,
      userId: id,
    });
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">{data.idea.headline}</h1>
      <Link href={`/idea/${data.idea._id}/brainstorms`}>
        <button className="hidden sm:flex items-center text-sm rounded-full px-8 py-3 my-6 bg-primary text-white md:mr-8 border-primary border">
          <Image src={BrainstormSvg} className="mr-2" alt="brainstorm svg" />
          <p>Brainstorm idea</p>
        </button>
      </Link>
      <div className="flex flex-wrap items-center  mt-8">
        <div className="rounded-full overflow-hidden mr-4 w-[3rem]">
          <Image
            width={50}
            height={50}
            src={data.profile?.ppicture || NoProfilePic}
            alt="avatar"
          />
        </div>
        <div className="w-full mt-3 sm:mt-0 sm:w-auto">
          <div className="text-black1 text-xs mr-auto ">
            <p className="  text-lg mb-[0..5rem]">
              {data.user.fname} {data.user.lname}
            </p>
            <p className="text-gray1 leading-5 text-[0.9rem]">
              {data.profile?.title} {data.profile?.pow} • 5 min read •{" "}
              {moment(data.idea.createdAt).startOf("day").fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center text-gray1 text-xs my-8">
        <div onClick={likeHandler} className="cursor-pointer">
          <Image
            src={liked ? LikeImg : UnlikedImg}
            alt="chat-img"
            className=" active:scale-110 transition-all mr-1 w-[1.3rem]"
          />
        </div>
        &nbsp;
        <p className="mr-3 text-[1rem]">{likesCount}</p>
        <Image src={ChatImg} alt="chat-img" className="mr-1 w-[1.3rem]" />
        &nbsp;
        <p className="mr-3 text-[1rem]">{data.count}</p>
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
      <div className="my-8 relative">
        <div className="block des:hidden">
          <IdeaOptionsMobile setOpenVH={setOpenVH} />
        </div>
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
          profile
          idea
          filterVal={curentTab}
          setVal={(el) => setCurrentTab(el)}
          elements={["Body", "Steps", "Budget", "Documents", "Discussions"]}
        />
      </div>
      <div className="my-8">{component}</div>
    </div>
  );
};

export default IdeaGrid;
