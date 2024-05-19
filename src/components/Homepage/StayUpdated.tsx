import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Image from "next/image";
import StayUpdatedImg from "/public/assets/stay-updated.svg";

type Props = {};

const StayUpdated = (props: Props) => {
  return (
    <section className="mt-8 py-3 bg-lightBlue">
      <div className="flex justify-center items-center">
        <div className="w-[40%]">
          <h1 className="text-black1 text-3xl font-bold">Stay updated</h1>
          <h2 className="text-gray1 my-5">
            Want to stay in the loop when new ideas are shared? Just enter your
            email address, and you'll be the first to get notified.
          </h2>
          <p className="mb-1 text-sm font-medium">Email address</p>
          <div className="flex items-center">
            <Input class="px-4 py-3 rounded-full w-[60%] placeholder:text-gray6 outline-none" placeholder="example@gmail.com" />
            <Button classname="bg-primary text-gray7 text-xs rounded-full border border-primary ml-3 py-[.9rem] px-4 " clicked={() => {}}>
              Get Notified
            </Button>
          </div>
        </div>
        <div className="w-[40%]">
          <Image src={StayUpdatedImg} alt="stay-updated" />
        </div>
      </div>
    </section>
  );
};

export default StayUpdated;
