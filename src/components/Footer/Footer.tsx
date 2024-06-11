import React from "react";
import LogoDark from "/public/assets/logo-dark.svg";
import Facebook from "/public/assets/facebook.svg"
import Twitter from "/public/assets/twitter.svg"
import Instagram from "/public/assets/instagram.svg"
import Mail from "/public/assets/mail.svg"
import Image from "next/image";
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-black-footer py-10 px-10">
      <div className="flex flex-wrap items-start">
        <div className="w-full sm:w-[25%] mr-auto mb-10">
          <Image src={LogoDark} alt="logo-dark" />
          <div className="text-gray8 mt-8 text-xs w-full sm:w-auto">
            <p className="mb-3">
              Collaborate, share, and breathe life into your ideas. Let others
              help bring your vision to fruition.
            </p>
            <p>© 2024 Idea for Africa – All Rights Reserved.</p>
          </div>
        </div>
        <div className="text-xs mr-16">
          <h1 className="text-gray8 font-bold">Categories</h1>
          <div className="text-gray8">
            <h2 className="my-3">Business</h2>
            <h2 className="my-3">Technology</h2>
            <h2 className="my-3">Manufactoring</h2>
            <h2 className="my-3">Academia</h2>
            <h2 className="my-3">Healthcare</h2>
            <h2 className="my-3">Sustainabilityy</h2>
            <h2 className="my-3">Arts & Culture</h2>
            <h2>Finance</h2>
          </div>
        </div>
        <div className="flex gap-8 mt-8 sm:mt-0 w-full sm:w-auto">
            <Image src={Mail} alt="mail" />
            <Image src={Instagram} alt="instagram" />
            <Image src={Facebook} alt="facebook" />
            <Image src={Twitter} alt="twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
