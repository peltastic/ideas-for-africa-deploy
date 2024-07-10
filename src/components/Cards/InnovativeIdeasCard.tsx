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
import { IoIosLink } from "react-icons/io";

import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import InnovativeImg from "/public/assets/innovative7.png";
import { useRouter } from "next/navigation";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import Button from "../Button/Button";
import { notify } from "@/utils/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";

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
    ppicture?: string;
  };
};

const InnovativeIdeasCard = (props: Props) => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url =
    origin + `/idea/${props.data.id}/${formatNameRoute(props.data.headline)}`;
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const [authModalOpened, funcs] = useDisclosure();
  return (
    <>
      <ModalComponent size="md" centered opened={opened} onClose={close}>
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

              notify("Copied", "success");
            }}
          >
            Copy
          </Button>
        </div>
      </ModalComponent>
      <ModalComponent
        size="md"
        centered
        opened={authModalOpened}
        onClose={funcs.close}
      >
        <div className="">
          <h1 className="font-semibold mb-4 text-lg">You need to be logged in to interact</h1>
          <div className="flex text-sm">
            <Link
              className="border border-primary text-sm text-primary xxs:mr-4 rounded-full py-2 px-5"
              href={"/auth/login"}
            >
              Log in
            </Link>
            <Link
              className="hidden xxs:block border text-sm border-primary bg-primary text-white rounded-full py-2 px-5"
              href={"/auth/register"}
            >
              Sign up
            </Link>
          </div>
        </div>
      </ModalComponent>
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
            <h1 className="font-bold mt-2 text-black1">
              {props.data.headline}
            </h1>
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
            <Image
              src={props.data.ppicture || NoProfilePic}
              alt="avatar"
              width={100}
              height={100}
            />
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
          <div className="" onClick={() => open()}>
            <IoShareSocialOutline className="mr-3" />
          </div>
          <div
            className=""
            onClick={() => {
              if (authStatus === "LOGGED_OUT") {
                return funcs.open();
              }
            }}
          >
            <Image src={LikeImg} alt="like-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InnovativeIdeasCard;
