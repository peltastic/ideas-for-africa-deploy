"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "/public/assets/logo.svg";
import HoverCardComponent from "@/components/HoverCard/HoverCard";
import Button from "@/components/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { useDisclosure } from "@mantine/hooks";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import ChatRoom from "@/components/Brainstorms/Group/ChatRoom";
import RoomMembers from "@/components/Brainstorms/Group/RoomMembers";
import WIthAuth from "@/components/HOC/ProtectRoute";

type Props = {};

const BrainstormGroupPage = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [showMembers, setShowMembers] = useState<boolean>();
  const showMembersHandler = (val: boolean) => {
    setShowMembers(val);
  };
  return (
    <div className="bg-gray3 sm:px-10 pb-20 min-h-[100vh] overflow-hidden relative">
      <nav className="w-full py-4 ">
        <div className="flex items-center ">
          <div className="cursor-pointer mr-auto">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center">
            <ProfileMenu />
          </div>
        </div>
      </nav>
      <div className="flex items-start flex-wrap w-full  ">
        <div className="w-full lg:w-[67%] mr-auto">
          <ChatRoom setShowProps={showMembersHandler} show={showMembers} />
        </div>
        <div
          className={`absolute right-0 top-0 lg:relative  transition-all ${
            showMembers
              ? "translate-x-0 w-full h-screen bg-white"
              : "w-[30%] translate-x-[120%] lg:translate-x-0"
          } `}
        >
          <RoomMembers setShowProps={showMembersHandler} show={showMembers} />
        </div>
      </div>
    </div>
  );
};

export default WIthAuth(BrainstormGroupPage);
