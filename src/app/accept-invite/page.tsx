"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect } from "react";
import Logo from "/public/assets/logo.svg";
import InviteSvg from "/public/assets/invite-animate.svg";
import Button from "@/components/Button/Button";
import { useAcceptInvitationMutation } from "@/lib/features/brainstorms";


type Props = {};

const AcceptInvite = (props: Props) => {
    const [acceptInvite, {} ] = useAcceptInvitationMutation()
  return (
    <>
      <div>
        <nav className="flex items-center px-8 py-8">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" />
          </Link>
        </nav>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] ">
          <Image
            src={InviteSvg}
            alt="invite-svg"
            className="w-[25rem] mx-auto"
          />
          <h1 className=" text-center text-2xl font-semibold">
            Accept ---- invite to join ---- brainstorm group?
          </h1>
          <div className="flex justify-center gap-6 mt-7">
            <Button classname="text-white bg-primary py-2 rounded-md w-[10rem] text-center">Accept</Button>
            <Button classname="bg-gray3 w-[10rem] text-black rounded-md">Reject</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptInvite;
