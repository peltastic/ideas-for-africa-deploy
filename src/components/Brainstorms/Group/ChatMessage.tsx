import React, { useEffect, useRef } from "react";
import ChatPfp from "/public/assets/chat-pfp.png";
import Image from "next/image";
import NoProfilePic from "/public/assets/no-profile.jpg";
import { AspectRatio } from "@mantine/core";
import moment from "moment";

type Props = {
  isUser?: boolean;
  message: string;
  photourl?: string;
  username: string;
  timestamp?: string;
  lastMessage?: boolean;
};

const ChatMessage = ({
  isUser,
  message,
  username,
  photourl,
  timestamp,
  lastMessage,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return () => {};
    if (lastMessage) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
        
      });
    }
  }, []);
  return (
    <div ref={ref} className="flex items-start mb-8">
      <div
        className={`${
          isUser ? "ml-auto flex-row-reverse" : "mr-auto"
        } flex items-start w-[80%]`}
      >
        <div className="bg-[#d8d8d8] h-[2rem] w-[2rem] overflow-hidden rounded-full">
          <AspectRatio ratio={1800 / 1800}>
            <Image
              width={100}
              height={100}
              src={photourl || NoProfilePic}
              alt="chat-pfp"
              className="w-full"
            />
          </AspectRatio>
        </div>
        <div className="text-xs ml-4">
          <div className="flex items-center">
            {isUser ? (
              <h3 className={`${isUser ? "ml-auto" : ""} mr-4 font-semibold`}>
                <span className="font-light">{timestamp}</span> &nbsp; You
              </h3>
            ) : (
              <h3 className={`${isUser ? "ml-auto" : ""} mr-4 font-semibold`}>
                {username} &nbsp;{" "}
                <span className="font-light">{timestamp}</span>
              </h3>
            )}
          </div>
          <div
            className={`mr-4 ${
              isUser ? "bg-primary text-white" : "bg-white text-black3"
            }  mt-2 py-3 px-3  text-sm rounded-md`}
          >
            {message.split("\n").map((str, index) => <p key={str + index}>{str}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
