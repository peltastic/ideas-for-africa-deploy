import React from "react";

type Props = {};

const BrainstormChatSkeleton = (props: Props) => {
  return (
    <div className="mt-8">
      <p className="mb-2 text-sm">Loading Chat...</p>
      <div className="bg-gray3 py-8 px-8 ">
        <div className="flex mb-2">
          <div className="ml-auto bg-[#ffffffe6] h-[1.5rem] w-[55%] animate-pulse mt-6 "></div>
        </div>
        <div className="flex mb-4">
          <div className="ml-auto bg-[#ffffffe6] h-[1.5rem] w-[40%] animate-pulse mt-6 "></div>
        </div>
        <div className="flex mb-2">
          <div className=" bg-[#ffffffe6] h-[1.5rem] w-[60%] animate-pulse mt-6 "></div>
        </div>
        <div className="flex mb-4 ">
          <div className=" bg-[#ffffffe6] h-[1.5rem] w-[70%] animate-pulse mt-6 "></div>
        </div>
        <div className="flex mb-2">
          <div className="ml-auto bg-[#ffffffe6] h-[1.5rem] w-[55%] animate-pulse mt-6 "></div>
        </div>
        <div className="flex mb-4">
          <div className="ml-auto bg-[#ffffffe6] h-[1.5rem] w-[40%] animate-pulse mt-6 "></div>
        </div>
      </div>
    </div>
  );
};

export default BrainstormChatSkeleton;
