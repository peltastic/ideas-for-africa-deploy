import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "/public/assets/logo.svg";

type Props = {};

const SuccessPage = (props: Props) => {
  return (
    <div>
      <nav className="flex items-center">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
      </nav>
    </div>
  );
};

export default SuccessPage;
