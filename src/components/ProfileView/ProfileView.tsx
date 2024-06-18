"use client";
import Tabs from "@/Tabs/Tabs";
import React, { useState } from "react";
import Ideas from "../Ideas/Ideas";

type Props = {};

const ProfileView = (props: Props) => {
  const [currentTab, setCurrentTab] = useState<
    "Ideas" | "Modified Ideas" | "Brainstorm"
  >("Ideas");
  let component = <Ideas hideFilter />
  switch (currentTab) {
    case "Ideas":
        component = <Ideas hideFilter />
        break;
  
    default:
        break;
  }
  return (
    <div>
      <div className="my-8">
        <Tabs
        profile
          elements={["Ideas", "Modified Ideas", "Brainstorm"]}
          filterVal={currentTab}
          setVal={(el) => setCurrentTab(el)}
        />
      </div>
      {component}
    </div>
  );
};

export default ProfileView;
