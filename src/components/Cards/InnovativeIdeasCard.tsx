import React, { useState } from "react";
import ClockIcon from "/public/assets/clock-icon.svg";
import Image from "next/image";
import { formatNameRoute, truncateStr } from "@/utils/helperfunctions";
import UnlikedImg from "/public/assets/unlike.svg";
import moment from "moment";
import { AspectRatio } from "@mantine/core";
import NoProfilePic from "/public/assets/no-profile.jpg";

import InnovativeImg from "/public/assets/innovative7.png";
import { useRouter } from "next/navigation";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import { FaRegEye } from "react-icons/fa";
import NotLoggedInModal from "../ModalComponents/NotLoggedInModal";
import { useLikeIdeaMutation } from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";
import ToolTipComponent from "../ToolTip/ToolTip";

type Props = {
  // image: string;
  data: {
    headline: string;
    summary: string;
    createdAt: string;
    category: string;
    banner: string;
    fname?: string;
    lname?: string;
    pow?: string;
    likes: string;
    id: string;
    userId: string;
    ppicture?: string;
    user?: {
      fname: string;
      lname: string;
    };
    wordpm: number;
    viewCount: number;
    modified?: boolean
  };
};

const InnovativeIdeasCard = (props: Props) => {
  const id = getCookie("id");
  const [likeIdea, {}] = useLikeIdeaMutation();

  const [liked, setLiked] = useState<boolean>(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url =
    origin + `/idea/${props.data.id}/${formatNameRoute(props.data.headline)}`;
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const [authModalOpened, funcs] = useDisclosure();
  const likeHandler = () => {
    likeIdea({
      ideaId: props.data.id,
      userId: id,
    });
    setLiked(!liked);
  };
  return (
    <>
      {/* <ModalComponent size="md" centered opened={opened} onClose={close}>
        <div className="">
          <h1 className="text-xl font-semibold">Share Idea</h1>
          <div className="flex items-center mt-5 gap-5">
            <FacebookShareButton url={url}>
              <FacebookIcon size={40} />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={40} />
            </TwitterShareButton>
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
      </ModalComponent> */}
      <ModalComponent
        size="md"
        centered
        opened={authModalOpened}
        onClose={funcs.close}
      >
        <NotLoggedInModal />
      </ModalComponent>
      <div className=" hover:bg-[#e3e3e32a] transition-all sm:bg-white relative h-[23rem] xs:h-[30rem] py-4 mb-6 px-[0.3rem] sm:px-4 sm:shadow-[0_0px_10px_rgba(0,0,0,0.1)] w-full rounded-xl">
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
            <p className="bg-white text-[0.5rem] xs:text-xs absolute left-2 sm:left-4 bottom-2 sm:bottom-4 py-1 px-2 rounded-full font-semibold text-black">
              {props.data.category}
            </p>
           {props.data.modified ?  <div className="bg-white p-1 absolute right-2 sm:right-4 bottom-2 sm:bottom-4 rounded-full w-5 h-5 flex justify-center items-center">
              <ToolTipComponent auto label="This has modified ideas">
                <p className="text-primary text-xs sm:text-sm font-bold">M</p>
              </ToolTipComponent>
            </div>: null}
          </div>
          <div className="flex flex-wrap sm:flex-nowrap py-3 text-[0.65rem] xs:text-xs text-gray4 items-center">
            <div className="flex items-center w-full mr-auto sm:w-auto">
              <Image src={ClockIcon} alt="clock-icon" className="mr-2" />
              <p className="mr-auto">
                {Math.floor(props.data.wordpm / 60)}-
                {Math.floor(props.data.wordpm / 60) + 1} mins read
              </p>
              <div className="flex sm:hidden  items-center">
                <Image
                  src={UnlikedImg}
                  alt="like-img"
                  className="w-[0.7rem] xs:w-[0.9rem]"
                />
                <p className="ml-1 text-gray1 text-xs xs:text-sm">
                  {props.data.likes}
                </p>
              </div>
            </div>
            <p className="mt-1 sm:mt-0 sm:w-auto w-full">
              {moment(props.data.createdAt).fromNow()}
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-bold mt-2 text-[0.65rem] xs:text-sm text-black1">
              {props.data.headline}
            </h1>
            <h2 className="text-gray1 hidden xs:block text-[0.5rem] xs:text-[0.8rem] my-3">
              <>{truncateStr(props.data.summary, 150).text}</>
              {truncateStr(props.data.summary, 150).status ? (
                <span className="font-semibold"> read more...</span>
              ) : null}
            </h2>
            <h2 className="text-gray1 block xs:hidden text-[0.7rem] xs:text-[0.8rem] my-3">
              <>{truncateStr(props.data.summary, 60).text}</>
              {truncateStr(props.data.summary, 60).status ? (
                <span className="font-semibold">..read more...</span>
              ) : null}
            </h2>
          </div>
        </div>
        <div className=" cursor-pointer  absolute w-[90%] bottom-4 flex   flex-wrap-reverse md:flex-nowrap  mt-6 items-center">
          <div className="flex items-center w-full md:w-auto md:mr-auto">
            <div
              className="mr-4 w-[1.5rem] xs:w-[2rem] h-[1.5rem] xs:h-[2rem] rounded-full overflow-hidden"
              onClick={() => router.push(`/profile/${props.data.userId}`)}
            >
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={props.data.ppicture || NoProfilePic}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </AspectRatio>
            </div>
            <div
              onClick={() => router.push(`/profile/${props.data.userId}`)}
              className="text-[0.55rem] xs:text-xs "
            >
              <p className="font-bold mb-[0.01rem] xs:mb-[0.1rem]">
                {props.data.fname || props.data.user?.fname}{" "}
                {props.data.lname || props.data.user?.lname}
              </p>
              <p className="xs:leading-5 hidden xs:block text-gray1">
                {props.data.pow}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center mb-2 md:mb-0">
            <div className="flex  items-center  mr-3">
              <Image
                src={UnlikedImg}
                alt="like-img"
                className="w-[0.7rem] xs:w-[0.9rem]"
              />
              <p className="ml-1 text-gray1 text-xs xs:text-sm">
                {props.data.likes}
              </p>
            </div>
            <div className="flex items-center text-gray1">
              <FaRegEye className="text-xs xs:text-base" />
              <p className="ml-1 text-xs xs:text-sm">{props.data.viewCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnovativeIdeasCard;
