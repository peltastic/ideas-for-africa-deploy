import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import CalenderImg from "/public/assets/calendar.svg"
import Image from "next/image";

type Props = {
    title: string
    subtitle: string
};

const ProfileFilters = (props: Props) => {
  return (
    <div className="flex items-center border-b border-gray3 py-6">
      <div className=" mr-auto">
        <h1 className="font-semibold">{props.title}</h1>
        <p className="text-xs text-gray1">{props.subtitle}</p>
      </div>
      <div className="flex bg-gray3 text-xs rounded-full text-black1 px-7 py-4">
        <div className="flex items-center mr-20">
          <p className="mr-2">All time</p>
          <IoIosArrowDown />
        </div>
        <div className=" flex items-center">
            <p className="mr-4">1 Jan 2023 - 7 Jan 2023</p>
            <Image src={CalenderImg} alt="calender-img" />
        </div>
      </div>
    </div>
  );
};

export default ProfileFilters;
