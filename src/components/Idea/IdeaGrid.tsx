import React, { useState } from "react";
import BrainstormSvg from "/public/assets/brainstorm.svg";
import Image from "next/image";
import ChatImg from "/public/assets/chat.svg";
import LikeImg from "/public/assets/like-img.svg";

import Facebook from "/public/assets/facebook.svg";
import Twitter from "/public/assets/twitter.svg";
import ModifyIdeaImg from "/public/assets/auto_fix.svg";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import moment from "moment";
import { IGetSingleIdeaResponse } from "@/interface/idea";
import Budget from "./Tabs/Budget";
import Discussions from "./Tabs/Discussions";
import Document from "./Tabs/Document";
import Steps from "./Tabs/Steps";
import { formatNameRoute, replacePTags } from "@/utils/helperfunctions";
import Link from "next/link";
import IdeaOptionsMobile from "./IdeaOptionsMobile";
import NoProfilePic from "/public/assets/no-profile.jpg";
import UnlikedImg from "/public/assets/unlike.svg";
import { useLikeIdeaMutation } from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";
import IdeaTab from "@/Tabs/IdeaTab";
import TestImg from "/public/assets/ShareAnIdea.png";
import ModalComponent from "../Modal/Modal";
import NotLoggedInModal from "../ModalComponents/NotLoggedInModal";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IoShareSocialOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import HoverCardComponent from "../HoverCard/HoverCard";
import { AspectRatio } from "@mantine/core";

type Props = {
  data: IGetSingleIdeaResponse;
  setOpenVH: () => void;
  modified?: boolean;
};

const IdeaGrid = ({ data, setOpenVH, modified }: Props) => {
  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url =
    origin + `/idea/${data.idea._id}/${formatNameRoute(data.idea.headline)}`;
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  const [opened, { open, close }] = useDisclosure();
  const [shareOpened, share] = useDisclosure();
  const el = ["Body", "Steps", "Budget", "Documents", "Discussions"];
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
      component = <Document data={data.documents} />;
      break;
    case "Steps":
      component = <Steps pitches={data.pitches} />;
      break;

    default:
      break;
  }
  const likeHandler = () => {
    if (authStatus === "LOGGED_OUT") {
      return open();
    }
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
    <>
      <ModalComponent size="md" centered opened={opened} onClose={close}>
        <NotLoggedInModal />
      </ModalComponent>
      <ModalComponent
        size="md"
        centered
        opened={shareOpened}
        onClose={share.close}
      >
        <div className="">
          <h1 className="text-xl font-semibold">Share Idea</h1>
          <div className="flex items-center mt-5 gap-5">
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={40} radius={"100%"} />
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={40} />
            </LinkedinShareButton>
          </div>
          <div className="bg-gray3 my-9 py-2 px-3  w-full flex justify-center items-center  ">
            <p className="text-sm">{url}</p>
          </div>
          <Button
            classname="bg-gray3 py-2 px-4 text-sm rounded-md"
            clicked={() => {
              navigator.clipboard.writeText(url);
              notify("Link copied to clipboard", "success");
            }}
          >
            Copy
          </Button>
        </div>
      </ModalComponent>
      <div className="w-full">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold flex items-center">
            {data.idea.headline}
            {modified ? (
              <span className="bg-gray3 text-gray1 ml-4 rounded-full px-4 py-2 font-medium text-xs">
                Modified
              </span>
            ) : null}
          </h1>
        </div>
        {modified ? null : (
          <div className="flex items-center my-6">
            <HoverCardComponent
              fit
              textSize="xs"
              text="Create Brainstorm Groups"
            >
              <Link
                href={`/idea/${data.idea._id}/${formatNameRoute(
                  data.idea.headline
                )}/brainstorms`}
              >
                <button className="hidden sm:flex items-center text-xs rounded-full px-4 py-2  bg-primary text-white md:mr-8 border-primary border">
                  <Image
                    src={BrainstormSvg}
                    className="mr-2"
                    alt="brainstorm svg"
                  />
                  <p>Brainstorm idea</p>
                </button>
              </Link>
            </HoverCardComponent>
            <HoverCardComponent
              text="Have a different perspective? Modify the original idea and share
            your thought process with fellow users."
            >
              <button
                onClick={() => {
                  if (authStatus === "LOGGED_OUT") {
                    return open();
                  }
                  router.push(
                    `/idea/${data.idea._id}/${formatNameRoute(
                      data.idea.headline
                    )}/modify`
                  );
                }}
                className="flex items-center text-xs rounded-full px-4 py-2  bg-primary text-white border-primary border"
              >
                <Image
                  src={ModifyIdeaImg}
                  className="mr-2"
                  alt="brainstorm svg"
                />
                <p>Modify idea</p>
              </button>
            </HoverCardComponent>
          </div>
        )}
        <div className="flex flex-wrap items-center  mt-8">
          <div onClick={() => router.push(`/profile/${data.user._id}`)} className="cursor-pointer rounded-full overflow-hidden mr-4 w-[3rem] h-[3rem]">
            <AspectRatio ratio={1800/1800}>
              <Image
                width={50}
                height={50}
                src={data.profile?.ppicture || NoProfilePic}
                alt="avatar"
                className="w-full h-full"
              />
            </AspectRatio>
          </div>
          <div className="w-full mt-3 sm:mt-0 sm:w-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="  text-lg mb-[0..5rem]">
                {data.user.fname} {data.user.lname}
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                {data.profile?.title} {data.profile?.pow} •{" "}
                {Math.floor(data.wordpm / 60)}-
                {Math.floor(data.wordpm / 60) + 1} min read •{" "}
                {moment(data.idea.createdAt).fromNow()} • {data.viewCounts}{" "}
                views
              </p>
            </div>
          </div>
        </div>

        {/* <p className="mt-8">{data.idea.summary}</p> */}
        <div className="my-8 relative">
          <div className="block des:hidden">
            <IdeaOptionsMobile
              id={data.idea._id}
              headline={formatNameRoute(data.idea.headline)}
              setOpenVH={setOpenVH}
            />
          </div>
          <Image
            src={data.thumbs[0]?.path || TestImg}
            width={300}
            height={300}
            className="w-full"
            alt="test-idea"
          />
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
          <p className="mr-7 text-[1rem]">{data.count}</p>
          <div className="flex">
            <FacebookShareButton url={url}>
              <div className="bg-black1 mr-2 p-[0.27rem] flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full">
                <Image src={Facebook} alt="instagram" className="" />
              </div>
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <div className="bg-black1 mr-2 p-[0.27rem] flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full">
                <Image src={Twitter} alt="instagram" className="" />
              </div>
            </TwitterShareButton>
          </div>
          <div className="" onClick={() => share.open()}>
            <IoShareSocialOutline className="mr-3 cursor-pointer text-2xl" />
          </div>
        </div>
        <div className="">
          <IdeaTab
            filterVal={curentTab}
            setVal={(el) => setCurrentTab(el)}
            elements={el}
          />
          <div className="flex sm:hidden flex-wrap">
            {el.map((el) => (
              <div
                key={el}
                onClick={() => setCurrentTab(el)}
                className={`${
                  curentTab === el ? "bg-gray1 text-white" : ""
                } px-4 py-1 border border-gray1 mr-4 mb-5 rounded-full`}
              >
                {el}
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 h-[100vh] overflow-y-auto">{component}</div>
      </div>
    </>
  );
};

export default IdeaGrid;
