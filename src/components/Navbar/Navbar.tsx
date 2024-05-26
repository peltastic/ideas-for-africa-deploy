import React from "react";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Link from "next/link";

type Props = {
  homepage?: boolean;
};

const Navbar = (props: Props) => {
  return (
    <nav className={` w-[98%] mt-4  ${props.homepage? "shadow-md" : ""} mx-auto rounded-full py-5 px-8 `}>
      <div className="flex items-center ">
        <div className="cursor-pointer mr-auto">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
