import React from "react";

type Props = {};

const InnovativeIdeasSkeleton = (props: Props) => {
  return (
    <div className=" py-4 px-4">
      <div className="bg-gray2 rounded-xl h-[6rem] xxs:h-[7rem] xs:h-[10rem] animate-pulse "></div>
      <div className="flex mt-4">
        <div className="bg-gray2 h-[1.2rem] w-[60%] mr-auto animate-pulse "></div>
        <div className="bg-gray2 h-[1.2rem] w-[20%] animate-pulse "></div>
      </div>
      <div className="bg-gray2 mt-6 h-[1.2rem] w-full mr-auto animate-pulse "></div>
      <div className="mt-5">
        <div className="bg-gray2 mt-2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
        <div className="bg-gray2 mt-2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
        <div className="bg-gray2 mt-2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
      </div>
      <div className="mt-6 flex items-center">
        <div className="bg-gray2 mr-5  h-[2rem] w-[2rem] rounded-full  animate-pulse "></div>
        <div className="w-[40%] mr-auto">
          <div className="bg-gray2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
          <div className="bg-gray2 mt-2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
        </div>
        <div className="bg-gray2 mt-2 h-[1rem] w-[1rem] animate-pulse "></div>
        
      </div>
    </div>
  );
};

export default InnovativeIdeasSkeleton;
