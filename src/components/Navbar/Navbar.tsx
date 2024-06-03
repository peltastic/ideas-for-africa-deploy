"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import { getCookie, removeCookie } from "@/utils/storage";
import MenuComponent from "../Menu/Menu";
import TestProfile from "/public/assets/dp.png";
import Hamburger from "/public/assets/menu.svg";
import ProfileImg from "/public/assets/account_circle.svg";
import IdeaImg from "/public/assets/idea.svg";
import NotificationImg from "/public/assets/notifications.svg";
import ArchiveImg from "/public/assets/archive.svg";
import LogoutImg from "/public/assets/logout.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setAuthState } from "@/lib/reducers/auth";

type Props = {
  homepage?: boolean;
};

const Navbar = (props: Props) => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.persistedState.authStatus )
  const id = getCookie("token");
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    console.log(!id)
    if (!id) {
      dispatch(setAuthState("LOGGED_OUT"))
    }
  }, [id]);
  console.log(authState)
  return (
    <nav
      className={` w-[98%] mt-4  ${
        props.homepage ? "shadow-[0_0px_10px_rgba(0,0,0,0.1)]" : ""
      } mx-auto rounded-full py-5 px-8 `}
    >
      <div className="flex items-center ">
        <div className="cursor-pointer mr-auto">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        {authState === "LOGGED_IN" ? (
          <MenuComponent
            target={
              <div className="flex items-center bg-gray3 rounded-full py-2 px-3 cursor-pointer">
                <Image
                  src={TestProfile}
                  alt="test"
                  className="w-[1.7rem] mr-3"
                />
                <Image src={Hamburger} alt="test" />
              </div>
            }
          >
            <div className="bg-white shadow-md rounded-xl py-4 px-9">
              <div className="flex items-center">
                <Image
                  src={TestProfile}
                  alt="test"
                  className="w-[2.2rem] mr-3"
                />
                <div className="">
                  <p className="font-semibold text-black1">Demilare Odetara</p>
                  <p className="text-xs text-gray1 ">Demicyn@gmail.com</p>
                </div>
              </div>
              <Link href={"/profile"}>
                <div className="my-8 flex">
                  <Image src={ProfileImg} alt="" className="mr-4 w-[1.4rem]" />
                  <p className="font-semibold">Profile</p>
                </div>
              </Link>
              <div className="my-8 flex">
                <Image src={IdeaImg} alt="" className="mr-4 w-[1.4rem]" />
                <p className="font-semibold">Idea</p>
              </div>
              <div className="my-8 flex">
                <Image
                  src={NotificationImg}
                  alt=""
                  className="mr-4 w-[1.4rem]"
                />
                <p className="font-semibold">Notifications</p>
              </div>
              <div className="my-8 flex">
                <Image src={ArchiveImg} alt="" className="mr-4 w-[1.4rem]" />
                <p className="font-semibold">Archive</p>
              </div>
              <div className="mt-8 flex cursor-pointer" onClick={() => {
                removeCookie("id")
                removeCookie("token")
                dispatch(setAuthState("LOGGED_OUT"))
                router.push("/")
              }}>
                <Image src={LogoutImg} alt="" className="mr-4 w-[1.4rem]" />
                <p className="font-semibold">Logout</p>
              </div>
            </div>
          </MenuComponent>
        ) : (
          <div className="flex text-sm">
            <Link
              className="border border-primary text-primary xxs:mr-4 rounded-full py-2 px-5"
              href={"/auth/login"}
            >
              Log in
            </Link>
            <Link
              className="hidden xxs:block border border-primary bg-primary text-white rounded-full py-2 px-5"
              href={"/auth/register"}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
