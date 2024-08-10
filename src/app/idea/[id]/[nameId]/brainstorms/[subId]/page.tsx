"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "/public/assets/logo.svg";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import ChatRoom from "@/components/Brainstorms/Group/ChatRoom";
import RoomMembers from "@/components/Brainstorms/Group/RoomMembers";
import WIthAuth from "@/components/HOC/ProtectRoute";
import { useLazyGetGroupInfoQuery } from "@/lib/features/brainstorms";
import { useParams } from "next/navigation";

type Props = {};

const BrainstormGroupPage = (props: Props) => {
  const { subId } = useParams<{ subId: string }>();
  const [getGrouInfo, result] = useLazyGetGroupInfoQuery();
  const [showMembers, setShowMembers] = useState<boolean>();
  const showMembersHandler = (val: boolean) => {
    setShowMembers(val);
  };
  useEffect(() => {
    if (subId) {
      getGrouInfo({
        groupId: subId,
      });
    }
  }, [subId]);
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
          <ChatRoom
            data={result.data}
            setShowProps={showMembersHandler}
            show={showMembers}
          />
        </div>
        <div
          className={`absolute right-0 top-0 lg:relative  transition-all ${
            showMembers
              ? "translate-x-0 w-full h-screen bg-white"
              : "w-[30%] translate-x-[120%] lg:translate-x-0"
          } `}
        >
          <RoomMembers groupId={result.data?.group._id} adminId={result.data?.group.admin} setShowProps={showMembersHandler} show={showMembers} />
        </div>
      </div>
    </div>
  );
};

export default WIthAuth(BrainstormGroupPage);
