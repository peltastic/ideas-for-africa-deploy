"use client";
import React from "react";
import AuthImage from "/public/assets/auth-image.png";
import Image from "next/image";
import LoginForm from "@/components/Forms/Login/Login";
import CancelImage from "/public/assets/cancel.svg";

import Logo from "/public/assets/logo.svg";
import { useRouter } from "next/navigation";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter()
  return (
    <div className="des:flex lg:h-screen relative">
      <div className=" flex des:hidden  items-center justify-between px-4 xxs:px-6 pt-6">
        <div className="">
          <Image src={Logo} alt="logo-image" />
        </div>
        <div className="" onClick={() => router.push("/")}>
          <Image src={CancelImage} alt="cancel-image" />
        </div>
      </div>
      <div className=" hidden des:block absolute top-10 left-10 ">
        <Image src={Logo} alt="logo-image" />
      </div>
      <div
       style={{
        backgroundImage: `url(${AuthImage.src})`
      }}
       className="bg-auth bg-cover bg-center   h-screen hidden des:block w-[50%]">
        {/* <Image src={AuthImage} alt="auth-image" className="w-full h-full" /> */}
      </div>
      <div className="mx-auto w-[90%] sm:w-[70%] lg:w-[50%] lg:max-w-[50rem] relative">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
