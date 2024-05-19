import React from "react";
import HeaderStroke from "/public/assets/header-stroke.svg";
import HeaderStar from "/public/assets/header-star.svg";
import Image from "next/image";
import Link from "next/link";
type Props = {};

const HomepageHeader = (props: Props) => {
  return (
    <header className="text-center w-[70%] mx-auto mt-16">
      <div className="text-[4rem] leading-[1.07] font-semibold ">
        <h1 className="relative w-fit mx-auto text-black1">
          <span> A space where ideas</span>
          <div className="absolute right-[-1.1rem] top-[-.4rem] ">
            <Image src={HeaderStroke} alt="header-stroke" />
          </div>
        </h1>
        <h1>blossom & minds connect</h1>
      </div>
      <div className="flex justify-center mt-6 gap-4 ">
        <div className=" ">
          <Image src={HeaderStar} alt="header-stroke" />
        </div>
        <h2 className=" text-gray1 text-xl ">
          Collaborate, share, and breathe life into your ideas. Let others help
          bring your vision to fruition.
        </h2>
        <div className=" ">
          <Image src={HeaderStar} alt="header-stroke" />
        </div>
      </div>
      <div className="flex justify-center mt-12 items-center">
        <Link className="rounded-full px-8 py-3 bg-primary text-white mr-8 border-primary border" href={"/"}>
          Share an idea
        </Link>
        <Link className="rounded-full px-8 py-3 text-primary mr-8 border-primary border" href={"/"}>
          Meet the team
        </Link>
      </div>
    </header>
  );
};

export default HomepageHeader;
