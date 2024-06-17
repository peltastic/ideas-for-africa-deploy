import React from "react";
import BrainstormGrid from "./BrainstormGrid";
import NoGroupSvg from "/public/assets/no-groups.svg";
import Image from "next/image";
import Button from "../Button/Button";
import { IGetBrainstormGroupsResponse } from "@/interface/brainstorms";

type Props = {
  data: IGetBrainstormGroupsResponse;
  open: () => void;
};

const BrainStorms = (props: Props) => {
  return (
    <>
      {props.data.groups.length === 0 ? (
        <div className="w-[95%] xs:w-[80%] lg:w-[50%] mx-auto mt-10">
          <Image src={NoGroupSvg} alt="no-group" className="mx-auto" />
          <div className="text-center">
            <h1 className="text-2xl font-bold mt-6">No groups Yet</h1>
            <p className="text-sm text-gray1 w-full lg:w-[60%] mx-auto my-6">
              Things are pretty quiet around here. Why not be the first to kick
              off a brainstorming group? You could start a new group based on
              the original idea.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              clicked={props.open}
              classname="bg-primary py-3 px-8 text-sm text-center rounded-3xl text-white "
            >
              Start a new group
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-16 mb-10 gap-4 des:gap-10">
          {props.data.groups.map((el) => (
            <BrainstormGrid
              key={el._id}
              groups={el}
              ideaCreator={props.data.ideaCreator}
              title={props.data.title}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BrainStorms;
