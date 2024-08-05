import Image from "next/image";
import React from "react";
import Button from "../Button/Button";
import { AspectRatio } from "@mantine/core";
import NoProfilePic from "/public/assets/no-profile.jpg";

type Props = {
  data: {
    _id: string;
    ideaId: string;
    name: string;
    admin: string;
    text: string;
    createdAt: string;
    adminName: {
      fname: string;
      lname: string;
    };
    adminPpicture: string | "Not available";
    ideaHeadline: string;
    thumbnailPath: string;
  };
};

const SearchedBrainstorms = (props: Props) => {
  return (
    <div className="cursor-pointer hover:bg-[#e3e3e32a] transition-all flex-wrap sm:flex-nowrap flex py-4 px-4 gap-4 rounded-xl  ">
      <div className="w-full sm:w-[30%] ">
        <AspectRatio ratio={1080 / 720}>
          <Image
            src={props.data.thumbnailPath}
            alt="idea-img"
            className="w-full rounded-xl"
            width={100}
            height={100}
          />
        </AspectRatio>
      </div>
      <div className="sm:w-[70%] flex flex-col  ">
        <p className="font-semibold text-sm mb-auto">
          {props.data.adminName.fname}'s brainstorm groups on{" "}
          {props.data.ideaHeadline}
        </p>
        <div className="mt-8 sm:mt-0 flex items-center">
          <div className="w-[2.5rem] [2.5rem] mr-5 rounded-full overflow-hidden">
            <AspectRatio ratio={1800/1800}>
              <Image
                src={
                  props.data.adminPpicture === "Not available"
                    ? NoProfilePic
                    : props.data.adminPpicture
                }
                width={100}
                height={100}
                className="w-full h-full"
                alt="brainstorm-image"
              />
            </AspectRatio>
          </div>
          <div className="">
            <p className="text-xs font-medium">
              {props.data.adminName.fname} {props.data.adminName.lname}
            </p>
            <Button classname="flex    items-center text-[0.65rem]  rounded-full px-3 py-[0.2rem] hover:bg-primary hover:text-white transition-all text-primary disabled:bg-gray6 disabled:border-0 disabled:cursor-not-allowed  border-primary border mt-2">
              Open Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedBrainstorms;
