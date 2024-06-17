import React from "react";

type Props = {};

const BrainstormGroups = (props: Props) => {
  return (
    <div>
      <div className="bg-gray2 mr-5  h-[3.5rem] w-[3.5rem] rounded-full  animate-pulse "></div>
      <div className="bg-gray2 h-[0.9rem] w-[full] animate-pulse mt-6 "></div>
      <div className="bg-gray2 h-[0.9rem] w-[30%] animate-pulse mt-2 "></div>
      <div className="mt-6">
        <div className="bg-gray2 h-[0.5rem] w-[full] animate-pulse mt-[0.4rem] "></div>
        <div className="bg-gray2 h-[0.5rem] w-[70%] animate-pulse mt-[0.4rem] "></div>
        <div className="bg-gray2 h-[0.5rem] w-[full] animate-pulse mt-[0.4rem] "></div>
        <div className="bg-gray2 h-[0.5rem] w-[90%] animate-pulse mt-[0.4rem] "></div>
      </div>
      <div className="mt-6 flex items-center">
        <div className="bg-gray2 mr-5  h-[2rem] w-[2rem] rounded-full  animate-pulse "></div>
        <div className="w-[40%] mr-auto">
          <div className="bg-gray2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
          <div className="bg-gray2 mt-2 h-[0.5rem] w-full mr-auto animate-pulse "></div>
        </div>
      </div>
      <div className="flex w-full mt-7">
      <div className="bg-gray2 mr-auto h-[2rem] w-[8rem] rounded-xl   animate-pulse "></div>
      <div className="bg-gray2  h-[2rem] w-[8rem] rounded-xl   animate-pulse "></div>

      </div>
    </div>
  );
};

export default BrainstormGroups;
