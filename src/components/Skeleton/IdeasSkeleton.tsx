import React from "react";

type Props = {};

const IdeasSkeleton = (props: Props) => {
  return (
    <div className="flex items-center my-6 w-full">
      <div className="bg-gray2 rounded z-xl w-[6rem] h-[6rem] mr-6 animate-pulse "></div>
      <div className="">
        <div className="bg-gray2 w-[50%] h-[0.5rem] mb-3"></div>
        <div className="bg-gray2 w-[10rem] xxs:w-[15rem] sm:w-[20rem] md:w-[30rem] h-[0.4rem] mb-1"></div>
        <div className="bg-gray2 w-[90%] h-[0.4rem] mb-1"></div>
      <div className="flex mt-3">

      <div className="bg-gray2 w-[0.4rem] h-[0.4rem] mr-2"></div>
      <div className="bg-gray2 w-[2.6rem] h-[0.4rem] mr-2"></div>
      <div className="bg-gray2 w-[0.4rem] h-[0.4rem] mr-2"></div>
      <div className="bg-gray2 w-[1.7rem] h-[0.4rem] mr-2"></div>
      <div className="bg-gray2 w-[0.4rem] h-[0.4rem] mr-2"></div>
      </div>
      </div>
    </div>
  );
};

export default IdeasSkeleton;
