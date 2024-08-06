"use client";
import React, { useEffect, useState } from "react";
import MenuComponent from "../Menu/Menu";
import TestProfile from "/public/assets/dp.png";
import Hamburger from "/public/assets/menu.svg";
import ProfileImg from "/public/assets/account_circle.svg";
import IdeaImg from "/public/assets/idea.svg";
import NotificationImg from "/public/assets/notifications.svg";
import ArchiveImg from "/public/assets/archive.svg";
import LogoutImg from "/public/assets/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useLazyGetUserProfileQuery } from "@/lib/features/profile";
import { getCookie, removeCookie } from "@/utils/storage";
import { setProfile } from "@/lib/reducers/profile";
import Image from "next/image";
import Link from "next/link";
import { setAuthState } from "@/lib/reducers/auth";
import { useRouter } from "next/navigation";
import { notify } from "@/utils/toast";
import { notis_socket } from "@/lib/sockets";
import { setShowIndicator } from "@/lib/reducers/notis";
import NoProfilePic from "/public/assets/no-profile.jpg";
import { AspectRatio } from "@mantine/core";

type Props = {};

const ProfileMenu = (props: Props) => {
  const showNotisIndicator = useSelector(
    (state: RootState) => state.notis.showIndicator
  );
  const dispatch = useDispatch();
  const authState = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  const profileInfo = useSelector(
    (state: RootState) => state.persistedState.profile.profile
  );
  const [getUserProfile, { data }] = useLazyGetUserProfileQuery();

  const id = getCookie("id");
  useEffect(() => {
    if (authState === "LOGGED_IN") {
      getUserProfile({
        id,
      });
    }
  }, [authState]);
  useEffect(() => {
    if (data) {
      dispatch(
        setProfile({
          profile: {
            email: data.email,
            fname: data.fname,
            lname: data.lname,
            pfp: data.profile?.ppicture || "",
          },
        })
      );
    }
  }, [data]);

  useEffect(() => {
    notis_socket.on("newNotification", (msgData) => {
      dispatch(setShowIndicator(true));
    });
  }, []);

  const router = useRouter();

  return (
    <div>
      {authState === "LOGGED_IN" ? (
        <MenuComponent
          target={
            <div className="relative flex items-center bg-gray3 rounded-full py-2 px-3 cursor-pointer">
              {showNotisIndicator ? (
                <div className="bg-red1 w-[6px] rounded-full h-[6px] absolute right-[4px] top-[5px]"></div>
              ) : null}
              <div className="border rounded-full overflow-hidden mr-3">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={profileInfo.pfp || NoProfilePic}
                    width={100}
                    height={100}
                    alt="test"
                    className="w-[1.7rem] h-[1.7rem]"
                  />
                </AspectRatio>
              </div>
              <Image src={Hamburger} alt="test" />
            </div>
          }
        >
          <div className="bg-white shadow-md rounded-xl py-4 px-9">
            <div className="flex items-center">
              <div className="rounded-full mr-3 overflow-hidden">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={profileInfo.pfp || NoProfilePic}
                    alt="test"
                    width={100}
                    height={100}
                    className="w-[2.2rem] h-[2.2rem]"
                  />
                </AspectRatio>
              </div>
              <div className="">
                <p className="font-semibold text-black1">
                  {profileInfo.fname} {profileInfo.lname}
                </p>
                <p className="text-xs text-gray1 ">{profileInfo.email}</p>
              </div>
            </div>
            <Link href={"/profile"}>
              <div className="my-8 flex">
                <Image
                  src={ProfileImg}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[1.4rem] mr-3"
                />

                <p className="font-semibold">Profile</p>
              </div>
            </Link>
            <Link href={"/profile?tab=ideas"}>
              <div className="my-8 flex">
                <Image src={IdeaImg} alt="" className="mr-4 w-[1.4rem]" />
                <p className="font-semibold">Idea</p>
              </div>
            </Link>
            <Link href={"/profile?tab=notifications"}>
              <div className="my-8 flex">
                <div className="w-[1.4rem] mr-4 relative">
                  {showNotisIndicator ? (
                    <div className="bg-red1 w-[6px] rounded-full  h-[6px] absolute right-[-5px] top-[5px]"></div>
                  ) : null}
                  <Image src={NotificationImg} alt="" className="w-full" />
                </div>
                <p className="font-semibold">Notifications</p>
              </div>
            </Link>
            <div className="my-8 flex sm:hidden">
              <Image src={ArchiveImg} alt="" className="mr-4 w-[1.4rem]" />
              <p className="font-semibold">Brainstorms</p>
            </div>
            <div
              className="mt-8 flex cursor-pointer"
              onClick={() => {
                removeCookie("id");
                removeCookie("token");
                dispatch(setAuthState("LOGGED_OUT"));
                dispatch(
                  setProfile({
                    profile: {
                      fname: "",
                      lname: "",
                      email: "",
                      pfp: "",
                    },
                  })
                );
                notify("Logout successful", "success");
                router.push("/");
              }}
            >
              <Image src={LogoutImg} alt="" className="mr-4 w-[1.4rem]" />
              <p className="font-semibold">Logout</p>
            </div>
          </div>
        </MenuComponent>
      ) : (
        <>
          <div className="block sm:hidden bg-gray3 py-2 px-3 rounded-xl">
            <MenuComponent
              target={
                <div>
                  <Image src={Hamburger} alt="test" />
                </div>
              }
            >
              <ul className="text-sm ">
                <li className=" hover:bg-gray3 px-4 py-2">
                  <Link href={"/auth/login"}>Login</Link>
                </li>
                <li className=" hover:bg-gray3 px-4 py-2">
                  <Link href={"/auth/register"}>Sign Up</Link>
                </li>
                <li className=" hover:bg-gray3 px-4 py-2">
                  <Link href={"/brainstorms"}>
                  Brainstorms
                  </Link>
                  </li>
              </ul>
            </MenuComponent>
          </div>
          <div className="hidden sm:flex text-sm">
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
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
