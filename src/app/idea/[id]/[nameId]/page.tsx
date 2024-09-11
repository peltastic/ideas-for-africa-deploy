"use client";
import React, { useEffect } from "react";

import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import Idea from "@/components/Idea/Idea";
import SetRoute from "@/components/HOC/setRoute";
import Head from "next/head";
import axios from "axios";

type Props = {};

const IdeaPage = (props: Props) => {
  async function erm() {
   const data = await axios.get(
      `https://api.ideasafrica.org/api/users/ideas/b02aa963-9c15-49c5-b9d6-a890422df3aa`
    );
    console.log(data, "sjsj")
  }
  useEffect(() => {
    erm()
  }, [])
  return (
    <>
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
    </>
  );
};

export default SetRoute(IdeaPage);
