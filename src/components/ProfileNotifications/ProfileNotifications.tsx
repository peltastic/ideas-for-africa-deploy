import React from "react";
import Notification from "./Notification";
import { IoIosArrowDown } from "react-icons/io";

type Props = {};

const ProfileNotifications = (props: Props) => {
  return (
    <div>
      <div className="flex items-center">
        <div className="border py-2 px-2 xxs:px-3 border-black1 mr-4 rounded-full text-xs xxs:text-sm">
          <p>Unread (3)</p>
        </div>
        <div className="border rounded-full text-xs xxs:text-sm text-gray1 py-2 px-2 xxs:px-3 mr-4">
          <p>Read (25)</p>
        </div>
        <div className="border rounded-full text-xs xxs:text-sm text-gray1 py-2 px-2 xxs:px-3">
          <p>Deleted (2)</p>
        </div>
      </div>
      <div className="w-full mm:w-[90%] lg:w-[80%] des:w-[60%]">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
      <div className="mb-20 flex flex-wrap  w-fit mx-auto gap-6 text-sm mt-20">
        <div className="w-fit rounded-full  px-6 py-3 bg-gray3  flex items-center">
          <div className="mr-2">
            <p>10 items per page</p>
          </div>
          <IoIosArrowDown />
        </div>
        <div className="flex gap-6 w-full sm:w-auto">
          <div className="bg-gray3 rounded-full flex py-3 sm:py-0  px-4 items-center text-center">
            <p className="text-gray6">Previous</p>
          </div>
          <div className="bg-gray3 rounded-full flex py-3 sm:py-0  px-5 items-center text-center ">
            <p>1</p>
          </div>
          <div className="bg-gray3 rounded-full flex py-3 sm:py-0  px-4 items-center text-center">
            <p className="text-gray6">Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNotifications;
