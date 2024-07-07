import React from "react";
import ChatPfp from "/public/assets/chat-pfp.png";
import Image from "next/image";

type Props = {
  isUser?: boolean;
  message: string;
  username: string;
};

const ChatMessage = ({ isUser, message, username }: Props) => {
  return (
    <div className="flex mb-8">
      <div
        className={`${
          isUser ? "ml-auto flex-row-reverse" : "mr-auto"
        } flex items-start w-[80%]`}
      >
        <div className="bg-[#d8d8d8] w-[2rem] rounded-full">
          <Image src={ChatPfp} alt="chat-pfp" className="w-full" />
        </div>
        <div className="text-xs ml-4">
          <div className="flex">
            {isUser ? (
              <h3 className={`${isUser ? "ml-auto" : ""} mr-4 font-semibold`}>
                <span className="font-light">12:24 AM</span> &nbsp; You
              </h3>
            ) : (
              <h3 className={`${isUser ? "ml-auto" : ""} mr-4 font-semibold`}>
                {username} &nbsp;{" "}
                <span className="font-light">12:24 AM</span>
              </h3>
            )}
          </div>
          <div
            className={`mr-4 ${
              isUser ? "bg-primary text-white" : "bg-white text-black3"
            }  mt-2 py-3 px-3  text-sm rounded-md`}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
