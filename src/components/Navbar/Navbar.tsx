
import React from "react";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
type Props = {
  homepage?: boolean;
};

const Navbar = (props: Props) => {


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
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
