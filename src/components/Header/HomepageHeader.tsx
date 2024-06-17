import React, { useEffect } from "react";
import HeaderStroke from "/public/assets/header-stroke.svg";
import HeaderStar from "/public/assets/header-star.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";
type Props = {};

const HomepageHeader = (props: Props) => {
  const router = useRouter()
  const authStatus =  useSelector((state: RootState) => state.persistedState.auth.authStatus)
  return (
    <header className="text-center w-[90%] sm:w-[95%] md:w-[70%] mx-auto mt-2 pt-14">
      <div className=" hidden sm:block text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] leading-[1.07] font-bold md:font-semibold ">
        <h1 className="relative w-fit mx-auto text-black1">
          <span> A space where ideas</span>
          <div className="absolute right-[-1.1rem] top-[-.4rem] hidden lg:block">
            <Image src={HeaderStroke} alt="header-stroke" />
          </div>
        </h1>
        <h1>blossom & minds connect</h1>
      </div>
      <div className="">
        <h1 className="text-[2.7rem] xxs:text-[2.9rem] block sm:hidden font-bold xs:font-semibold leading-[1.07]">
          A space where ideas blossom & minds connect
        </h1>
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <div className="hidden md:block">
          <Image src={HeaderStar} alt="header-stroke" />
        </div>
        <h2 className=" text-[#333752] md:text-gray1  xxs:text-lg ">
          Collaborate, share, and breathe life into your ideas. Let others help
          bring your vision to fruition.
        </h2>
        <div className="hidden md:block ">
          <Image src={HeaderStar} alt="header-stroke" />
        </div>
      </div>
      <div className="  flex flex-wrap justify-center mt-12 items-center">
        <button onClick={() => {
          if (authStatus === "LOGGED_OUT") {
            notify("Login to share an idea")
            router.push("/auth/login")
          } else {
            router.push("/share-idea")
          }
        }} className="w-full xs:w-[60%] md:w-auto mb-6 md:mb-0 rounded-full px-8 py-4 md:py-3 bg-primary text-white md:mr-8 border-primary border">
          Share an idea
        </button>
        <Link
          className="w-full xs:w-[60%] md:w-auto rounded-full px-8 py-4 md:py-3 text-primary md:mr-8 border-primary border"
          href={"/meet-the-team"}
        >
          <button>Meet the team</button>
        </Link>
      </div>
    </header>
  );
};

export default HomepageHeader;
