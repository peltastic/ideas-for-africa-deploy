"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { getCookie } from "@/utils/storage";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/lib/reducers/auth";
type Props = {
  homepage?: boolean;
};

const Navbar = (props: Props) => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  useEffect(() => {
    if (!token) {
      dispatch(setAuthState("LOGGED_OUT"));
    }
  }, [token]);

  return (
    <nav
      className={` w-[98%] mt-4  ${
        props.homepage ? "shadow-[0_0px_10px_rgba(0,0,0,0.1)]" : ""
      } mx-auto rounded-full py-3 xs:py-5 px-6 xs:px-8 `}
    >
      <div className="flex items-center ">
     
        <div className="cursor-pointer mr-auto ">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        {props.homepage ? (
          <Link className="mr-8 hover:scale-105 transition-all text-primary border-b-2 border-primary" href={"/brainstorms"}>
            <p className="">Brainstorms</p>
          </Link>
        ) : null}
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
