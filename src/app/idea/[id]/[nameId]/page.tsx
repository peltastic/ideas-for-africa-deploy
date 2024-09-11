"use client";
import React from "react";

import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import Idea from "@/components/Idea/Idea";
import SetRoute from "@/components/HOC/setRoute";
import Head from "next/head";

type Props = {};

const IdeaPage = (props: Props) => {
  return (
    <>
    <Head>
      <meta property="og:title" content="test title" />
      <meta property="og:description" content={"description"} />
        <meta property="og:image" content={"https://ideaafricabucket.s3.eu-north-1.amazonaws.com/1723921467403-857326772-20240730_152544.jpg"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ''} />
        <meta property="og:site_name" content="Ideas for Africa" />
    </Head>
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
