import React from "react";
import ChatPfp from "/public/assets/chat-pfp.png";
import Image from "next/image";

type Props = {
  isUser?: boolean;
};

const ChatMessage = ({ isUser }: Props) => {
  return (
    <div className="flex mb-8">
      <div
        className={`${
          isUser ? "ml-auto flex-row-reverse" : "mr-auto"
        } flex items-start w-[80%]`}
      >
        <div className="bg-[#d8d8d8] w-[8rem] rounded-full">
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
                Charles Dicken &nbsp;{" "}
                <span className="font-light">12:24 AM</span>
              </h3>
            )}
          </div>
          <div
            className={`mr-4 ${
              isUser ? "bg-primary text-white" : "bg-white text-black3"
            }  mt-2 py-3 px-3  text-sm rounded-md`}
          >
            {
              "The ideal way to run a hydro plant involves maximizing efficiency by regulating water flow to match energy demand, while also considering environmental impacts to maintain ecological balance. Implementing advanced monitoring systems and employing skilled personnel are crucial for ensuring smooth operations and proactive maintenance to prevent disruptions."
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
