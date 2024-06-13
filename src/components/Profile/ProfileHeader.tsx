import EditImg from "/public/assets/edit.svg";
import Image from "next/image";
import React from "react";
import AvatarLarge from "/public/assets/avatar-large.png";
import ProfileSvg from "/public/assets/profile-svg.svg";

import ProfileSvgMobile from "/public/assets/profile-svg-mobile.svg";

type Props = {
  fname: string
  lname: string
  email: string
  // setEdit: (param: boolean) => void
};

const ProfileHeader = (props: Props) => {
  return (
    <div className="relative flex items-center overflow-hidden bg-gradient-to-b py-6 rounded-xl mt-9 px-4 sm:px-10 from-primary-light to-primary">
      <div className="flex flex-wrap items-center ">
        <div className="mr-4">
          <Image src={AvatarLarge} alt="avatar" />
        </div>
        <div className="w-full mt-3 sm:mt-0 sm:w-auto">
          <div className="text-xs mr-auto text-white ">
            <p className="font-bold text-xl sm:text-2xl mb-1">
              {props.fname} {props.lname}
            </p>
            <p className="leading-5 text-white text-[0.9rem]">
              {props.email} • Created Feb 23, 2024
            </p>
          </div>
        </div>
      </div>
      {/* <div onClick={() => props.setEdit(true)}  className="relative z-[10] flex items-center rounded-full bg-white ml-auto px-3 text-xs py-2 gap-2 cursor-pointer">
        <Image src={EditImg} alt="edit-img" />
        <p>Edit</p>
      </div> */}
      <div className="absolute right-0 top-0">
        <div className="hidden des:block">
          <Image src={ProfileSvg} alt="profile-svg" />
        </div>
        <div className="block des:hidden">
          <Image src={ProfileSvgMobile} alt="profile-svg" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
