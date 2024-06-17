import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Image from "next/image";
import * as StayUpdatedLottie from "@/data/stay-updated.json";
import LottiePlayer from "../Lottie/LottiePlayer";


type Props = {};

const StayUpdated = (props: Props) => {
  return (
    <section className="mt-8 pt-20 py-10 mm:py-3 bg-lightBlue">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-[85%] sm:w-[70%] md:w-[40%]">
          <h1 className="text-black1 text-3xl font-bold">Stay updated</h1>
          <h2 className="text-gray1 mb-12 sm:mb-auto my-5">
            Want to stay in the loop when new ideas are shared? Just enter your
            email address, and you&apos;ll be the first to get notified.
          </h2>
          <p className="mb-1 text-sm font-medium my-5">Email address</p>
          <div className="flex flex-wrap items-center">
            <Input changed={() => {}}  class="border-gray5 border px-4 py-3 rounded-full w-full sm:w-[60%] mb-3 sm:mb-0 placeholder:text-gray6 outline-none" placeholder="example@gmail.com" />
            <Button classname=" w-full sm:w-auto bg-primary text-gray7 text-xs rounded-full border border-primary sm:ml-3 py-[.9rem] px-4 " >
              Get Notified
            </Button>
          </div>
        </div>
        <div className=" w-full md:w-[45%] mm:w-[40%]">
          <LottiePlayer lottie={StayUpdatedLottie} />
          {/* <Image src={StayUpdatedImg} alt="stay-updated" className="w-full" /> */}
        </div>
      </div>
    </section>
  );
};

export default StayUpdated;
