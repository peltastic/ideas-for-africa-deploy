import React from "react";

type Props = {};

const VersionHistorySkeleton = (props: Props) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="bg-gray2  h-[2.5rem] w-[7.5rem] rounded-md  animate-pulse mr-auto "></div>
        <div className="bg-gray2  h-[2.5rem] w-[10.5rem] rounded-md  animate-pulse  "></div>
      </div>
        <div className="bg-gray2  h-[2.5rem] w-full mt-8 rounded-md  animate-pulse mr-auto "></div>
        <div className="bg-gray2  h-[2.5rem] w-full mt-8 rounded-md  animate-pulse mr-auto "></div>
        <div className="bg-gray2  h-[1.5rem] w-[7rem] mt-8 rounded-md  animate-pulse mr-auto "></div>
        <div className="bg-gray2  h-[2.5rem] w-[95%] mt-10 rounded-md  animate-pulse mx-auto "></div>
        <div className="bg-gray2  h-[2.5rem] w-[95%] mt-8 rounded-md  animate-pulse mx-auto "></div>
        <div className="bg-gray2  h-[2.5rem] w-[95%] mt-8 rounded-md  animate-pulse mx-auto "></div>
    </div>
  );
};

export default VersionHistorySkeleton;
