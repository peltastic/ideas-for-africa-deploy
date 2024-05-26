import React from "react";
import { SlOptions } from "react-icons/sl";

type Props = {};

const Notification = (props: Props) => {
  return (
    <div className="my-10">
      <div className="flex items-center ">
        <div className="mr-4 bg-gradient-to-br from-[#5C6670] to-black1 text-white rounded-full p-1 h-[2.5rem] w-[2.5rem] flex items-center justify-center">
          <p>NC</p>
        </div>
        <div className="mr-auto">
          <h3 className="font-semibold text-sm mb-1">Nala Corteiz</h3>
          <p className="text-gray1 text-xs">
            Replied you in “Affiliate Mastery: Pathway to Seven-Figure Success”
            • 1h ago
          </p>
        </div>
        <div className="bg-gray3 flex items-center justify-center  h-[1.7rem] w-[1.7rem] rounded-full">
          <SlOptions className="text-xs" />
        </div>
      </div>
      <div className="text-sm mt-4">
        <p>I don’t quite understand that part about Networking.  Can you please buttress</p>
      </div>
    </div>
  );
};

export default Notification;
