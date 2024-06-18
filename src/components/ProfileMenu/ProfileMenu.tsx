"use client"
import React, { useEffect } from "react";
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

type Props = {};

const ProfileMenu = (props: Props) => {
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
    if (authState === "LOGGED_IN" && !profileInfo.email) {
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
            pfp: "",
          },
        })
      );
    }
  }, [data]);

  const router = useRouter();
  
  return (
    <div>
      {authState === "LOGGED_IN" ? (
        <MenuComponent
          target={
            <div className="flex items-center bg-gray3 rounded-full py-2 px-3 cursor-pointer">
              <Image src={TestProfile} alt="test" className="w-[1.7rem] mr-3" />
              <Image src={Hamburger} alt="test" />
            </div>
          }
        >
          <div className="bg-white shadow-md rounded-xl py-4 px-9">
            <div className="flex items-center">
              <Image src={TestProfile} alt="test" className="w-[2.2rem] mr-3" />
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
                  src={profileInfo.pfp || ProfileImg}
                  alt=""
                  className="mr-4 w-[1.4rem]"
                />
                <p className="font-semibold">Profile</p>
              </div>
            </Link>
            <div className="my-8 flex">
              <Image src={IdeaImg} alt="" className="mr-4 w-[1.4rem]" />
              <p className="font-semibold">Idea</p>
            </div>
            <div className="my-8 flex">
              <Image src={NotificationImg} alt="" className="mr-4 w-[1.4rem]" />
              <p className="font-semibold">Notifications</p>
            </div>
            <div className="my-8 flex">
              <Image src={ArchiveImg} alt="" className="mr-4 w-[1.4rem]" />
              <p className="font-semibold">Archive</p>
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
  );
};

export default ProfileMenu;
