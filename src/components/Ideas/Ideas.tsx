import React from "react";
import Idea from "./Idea";
import ProfileFilters from "../Profile/ProfileFilters";

type Props = {
  hideFilter?: boolean;
};

const Ideas = (props: Props) => {
  return (
    <div className="">
      {props.hideFilter ? null : (
        <ProfileFilters
          subtitle="All your ideas for all the time"
          title="Ideas"
        />
      )}
      <div className="w-[60%]">
        <Idea />
        <Idea />
        <Idea />
        <Idea />
        <Idea />
        <Idea />
      </div>
    </div>
  );
};

export default Ideas;
