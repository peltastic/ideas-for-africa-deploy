import React from "react";
import EmailSvg from "/public/assets/email.svg";
import Logo from "/public/assets/logo.svg";
import Image from "next/image";

type Props = {};

const VerifyEmail = (props: Props) => {
  return (
    <div className="h-screen">
        <div className="absolute left-8 top-10">
            <Image src={Logo} alt="logo" />
        </div>
      <div className="fixed text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl font-semibold mb-4">Verification Email Sent!</h1>
        <p className="text-sm">Please check your email for next steps to verify your account.</p>
        <div className="w-[15rem] mx-auto">
          <Image src={EmailSvg} alt="email-svg" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
