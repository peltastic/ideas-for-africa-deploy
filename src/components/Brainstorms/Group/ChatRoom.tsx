import Image from "next/image";
import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Avatar from "/public/assets/avatar.png";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { chat_socket, joinBrainstormRoom } from "@/lib/sockets";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {};

const ChatRoom = (props: Props) => {
  const { subId } = useParams<{ subId: string }>();
  const userProfile = useSelector(
    (state: RootState) => state.persistedState.profile.profile
  );
  useEffect(() => {
    if (subId) {
      joinBrainstormRoom(`${userProfile.fname} ${userProfile.lname}`, subId);
    }
  }, [subId]);

  useEffect(() => {
    chat_socket.on("chatMessage", (msgData) => {
      console.log(msgData);
    });
    chat_socket.on("message", (msgData) => {
      console.log(msgData);
    });
  }, []);

  return (
    <div className="bg-white py-6 px-8 w-full rounded-md">
      <IoIosArrowRoundBack className="text-3xl" />
      <h1 className="text-xl font-bold mt-3">
        Kunle&apos;s brainstorm group on Energy generation for recycling in
        rubber
      </h1>

      <p className="text-sm my-10 text-gray1">
        The ideal way to run a hydro plant involves maximizing efficiency by
        regulating water flow to match energy demand, while also considering
        environmental impacts to maintain ecological balance.
      </p>
      <div className=" flex mt-8 items-center">
        <div className="mr-3 w-[2.4rem]">
          <Image src={Avatar} className="w-full" alt="avatar" />
        </div>
        <div className="text-sm mr-auto ">
          <p className="font-semibold mb-[0.02rem]">Kunle Ademola</p>
          <p className="leading-5 text-gray1">
            CEO Pledre Solutions • Created Feb 23, 2024
          </p>
        </div>
      </div>
      <div className="bg-gray3 relative py-6 px-4 rounded-md mt-8 min-h-[70vh]">
        <div className="h-[100vh] mb-[10rem] overflow-y-auto">
          <ChatMessage />
          <ChatMessage isUser />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
        </div>
        <div className="absolute bottom-5 w-full left-0 bg-gray3 py-4 ">
          <div className="w-[90%] mx-auto">
            <ChatInput groupId={subId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
