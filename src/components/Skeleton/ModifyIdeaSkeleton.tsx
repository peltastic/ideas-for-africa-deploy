import React from "react";

type Props = {};

const ModifyIdeaSkeleton = (props: Props) => {
  return (
    <div>
      <div className="bg-gray2 w-full h-[1.3rem] mr-6 animate-pulse "></div>

      <div className="flex mt-7 items-center">
        <div className="bg-gray2  w-[3rem] rounded-full mt-6 h-[3rem] mr-6 animate-pulse "></div>
        <div className="">
          <div className="bg-gray2  w-[7rem] mt-6 h-[0.8rem] mr-6 animate-pulse "></div>
          <div className="bg-gray2  w-[14rem] mt-2 h-[0.8rem] mr-6 animate-pulse "></div>
        </div>
      </div>
      <div className="mt-14">
        <div className="bg-gray2 w-full h-[1.5rem] mb-8 mr-6 animate-pulse "></div>
        <div className="bg-gray2 w-full h-[1.5rem] mb-8 mr-6 animate-pulse "></div>
        <div className="bg-gray2 w-full h-[1.5rem] mb-8 mr-6 animate-pulse "></div>
      </div>
      <div className="bg-gray2 w-full h-[25rem] mt-10 mr-6 animate-pulse "></div>
    </div>
  );
};

export default ModifyIdeaSkeleton;
