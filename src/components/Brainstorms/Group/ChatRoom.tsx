import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Avatar from "/public/assets/avatar.png";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { chat_socket, joinBrainstormRoom } from "@/lib/sockets";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { sendMessage } from "@/lib/sockets";
import Button from "@/components/Button/Button";

type Props = {
  setShowProps: (val: boolean) => void;
  show?: boolean;
};

const ChatRoom = (props: Props) => {
  const profile = useSelector(
    (state: RootState) => state.persistedState.profile.profile
  );
  const { subId } = useParams<{ subId: string }>();
  const [messgaes, setMessages] = useState<
    {
      username: string;
      text: string;
    }[]
  >([]);
  const userProfile = useSelector(
    (state: RootState) => state.persistedState.profile.profile
  );
  useEffect(() => {
    if (subId) {
      joinBrainstormRoom(`${userProfile.fname} ${userProfile.lname}`, subId);
    }
  }, [subId]);

  useEffect(() => {
    chat_socket.on(
      "chatMessage",
      (msgData: { username: string; text: string }) => {
        console.log("aa");
        updateMessageHandler(msgData.text, msgData.username);
      }
    );
  }, []);
  useEffect(() => {
    chat_socket.on("message", (msgData) => {
      console.log(msgData, "ssjsj");
    });
  }, []);
  const updateMessageHandler = (message: string, username?: string) => {
    // const currMessages = [...messgaes];
    // console.log(currMessages);
    // currMessages.push({
    //   text: message,
    //   username: username || `${profile.fname} ${profile.lname}`,
    // });
    // console.log(currMessages);
    // setMessages(currMessages);
    setMessages((prev) => [
      ...prev,
      {
        text: message,

        username: username || `${profile.fname} ${profile.lname}`,
      },
    ]);
  };
  const sendMessageHandler = (message: string) => {
    // updateMessageHandler(message);
    sendMessage(subId, message);
  };

  return (
    <div className="bg-white py-6 px-8 w-full rounded-md">
      <div className="flex mb-6 ">
        <IoIosArrowRoundBack className="text-3xl mr-auto" />
        <Button
          clicked={() => props.setShowProps(true)}
          classname="bg-gray3 block lg:hidden rounded-full py-2 px-6 ml-auto text-sm"
        >
          Members
        </Button>
      </div>
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
          {messgaes.length === 0 ? (
            <div className="text-center text-gray3 text-xs bg-gray1 w-fit py-2 rounded-md px-4 mx-auto">
              {" "}
              Conversation is currently empty
            </div>
          ) : (
            <div className="">
              {messgaes.map((el, index) => (
                <ChatMessage
                  isUser={el.username === `${profile.fname} ${profile.lname}`}
                  key={index + el.username}
                  message={el.text}
                  username={el.username}
                />
              ))}
            </div>
          )}
        </div>
        <div className="absolute bottom-5 w-full left-0 bg-gray3 py-4 ">
          <div className="w-[90%] mx-auto">
            <ChatInput sendMessageFunc={sendMessageHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
