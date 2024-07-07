"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "/public/assets/logo.svg";
import HoverCardComponent from "@/components/HoverCard/HoverCard";
import Button from "@/components/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { useDisclosure } from "@mantine/hooks";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import ChatRoom from "@/components/Brainstorms/Group/ChatRoom";

type Props = {};

const BrainstormGroupPage = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="bg-gray3 px-10 pb-20 min-h-[100vh]">
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
      <div className="flex items-center">
        <div className="w-[70%]">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default BrainstormGroupPage;
