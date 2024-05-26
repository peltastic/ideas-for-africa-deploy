import React from "react";
import ProfileFilters from "../Profile/ProfileFilters";
import Idea from "../Ideas/Idea";

type Props = {};

const Archive = (props: Props) => {
  return (
    <div className="">
      <ProfileFilters
        subtitle="Restore a shared idea or permanently remove it."
        title="Archive"
      />
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

export default Archive;
