import React, { useEffect } from "react";
import HeaderStroke from "/public/assets/header-stroke.svg";
import HeaderStar from "/public/assets/header-star.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { HeaderStrokeSvg } from "../svgs/Svgs";
type Props = {};
import { motion } from "framer-motion";
import { notifications } from "@mantine/notifications";
import { primaryColor } from "@/utils/constants";

const HomepageHeader = (props: Props) => {
  const router = useRouter();
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  return (
    <header className="text-center w-[90%] sm:w-[95%] md:w-[70%] mx-auto mt-2 pt-[9rem]">
      <div className=" hidden sm:block text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] leading-[1.07] font-bold md:font-semibold ">
        <h1 className="relative w-fit mx-auto text-black1">
          <motion.span
            className="block"
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              // ease: "easeIn"
            }}
          >
            A space where ideas
          </motion.span>
          <div className="absolute right-[-1.1rem] top-[-.4rem] hidden lg:block">
            <HeaderStrokeSvg />
            {/* <Image src={HeaderStroke} alt="header-stroke" /> */}
          </div>
        </h1>
        <motion.h1
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          blossom & minds connect
        </motion.h1>
      </div>
      <div className="">
        <h1 className="text-[2.7rem] xxs:text-[2.9rem] block sm:hidden font-bold xs:font-semibold leading-[1.07]">
          A space where ideas blossom & minds connect
        </h1>
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className="hidden md:block"
        >
          <Image src={HeaderStar} alt="header-stroke" />
        </motion.div>
        <motion.h2
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className=" text-[#333752] md:text-gray1  xxs:text-lg "
        >
          Collaborate, share, and breathe life into your ideas. Let others help
          bring your vision to fruition.
        </motion.h2>
        <motion.div
          initial={{
            x: 100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className="hidden md:block "
        >
          <Image src={HeaderStar} alt="header-stroke" />
        </motion.div>
      </div>
      <div className="  flex flex-wrap justify-center mt-12 items-center">
        <motion.button
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.7,
            bounce: 1,
          }}
          onClick={() => {
            if (authStatus === "LOGGED_OUT") {
              notifications.show({
                title: "Please Login!",
                message: "You need to share an idea!",
                autoClose: 4000,
                color: primaryColor,
              });
              router.push("/auth/login");
            } else {
              router.push("/share-idea");
            }
          }}
          className="w-full xs:w-[60%] md:w-auto mb-6 md:mb-0 rounded-full px-8 py-4 md:py-3 bg-primary text-white md:mr-8 border-primary border"
        >
          Share an idea
        </motion.button>
        <motion.div
          initial={{
            x: 100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.7,
            bounce: 1,
          }}
          className="w-full xs:w-[60%] md:w-auto rounded-full px-8 py-4 md:py-3 text-primary md:mr-8 border-primary border"
        >
          <Link className="" href={"/meet-the-team"}>
            <motion.button>Meet the team</motion.button>
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default HomepageHeader;
