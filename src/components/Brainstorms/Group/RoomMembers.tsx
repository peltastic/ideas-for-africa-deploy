import Button from "@/components/Button/Button";
import { useGetGroupMembersQuery } from "@/lib/features/brainstorms";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import CancelSvg from "/public/assets/cancel2.svg";

import Avatar from "/public/assets/avatar.png";
import React from "react";
import Image from "next/image";

type Props = {
  setShowProps: (val: boolean) => void;
  show?: boolean;
};

const RoomMembers = (props: Props) => {
  const { subId } = useParams<{ subId: string }>();
  const {} = useGetGroupMembersQuery(subId ?? skipToken);
  return (
    <div className="bg-white rounded-md py-6 px-4">
      <div className="flex mb-10 lg:hidden">
        <div className="w-fit " onClick={() => props.setShowProps(false)}>
          <Image
            src={CancelSvg}
            alt="cancel"
            className="ml-auto mr-5 w-[1.2rem] "
          />
        </div>
      </div>
      <div className="flex items-center border-b pb-6">
        <p className="font-semibold">Group Members</p>
        <Button classname="bg-gray3 rounded-full py-2 px-6 ml-auto text-sm">
          Invite
        </Button>
      </div>
      <div className="">
        <div className=" flex mt-8 items-center">
          <div className="mr-3 w-[2.4rem]">
            <Image src={Avatar} className="w-full" alt="avatar" />
          </div>
          <div className="text-sm mr-auto ">
            <p className="font-semibold mb-[0.02rem]">Kunle Ademola</p>
            <p className="leading-5 text-gray1">CEO Pledre Solutions</p>
          </div>
        </div>
        <div className=" flex mt-8 items-center">
          <div className="mr-3 w-[2.4rem]">
            <Image src={Avatar} className="w-full" alt="avatar" />
          </div>
          <div className="text-sm mr-auto ">
            <p className="font-semibold mb-[0.02rem]">Kunle Ademola</p>
            <p className="leading-5 text-gray1">CEO Pledre Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomMembers;
