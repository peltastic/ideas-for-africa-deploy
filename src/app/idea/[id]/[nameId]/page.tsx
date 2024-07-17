"use client"
import React from "react";

import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import Idea from "@/components/Idea/Idea";
import SetRoute from "@/components/HOC/setRoute";

type Props = {};

const IdeaPage = (props: Props) => {
  return (
    <div className="bg-idea-bg px-2">
      <nav className="w-full py-4 px-6">
        <div className="flex items-center ">
          <div className="cursor-pointer mr-auto">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
          <ProfileMenu />
        </div>
      </nav>
      <Idea />
    </div>
  );
};

export default SetRoute(IdeaPage);
