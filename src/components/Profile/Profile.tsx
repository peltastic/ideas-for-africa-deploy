"use client";

import Tabs from "@/Tabs/Tabs";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import Ideas from "../Ideas/Ideas";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import Archive from "../Archive/Archive";

type Props = {};

const Profile = (props: Props) => {
  const [curentTab, setCurrentTab] = useState<
    "Profile" | "Ideas" | "Notifications" | "Archive"
  >("Profile");
  let component = <ProfileForm />;
  switch (curentTab) {
    case "Profile":
      component = <ProfileForm />;
      break;
    case "Ideas":
      component = <Ideas />;
      break;
    case "Notifications":
      component = <ProfileNotifications />;
      break;
    case "Archive":
      component = <Archive />;
      break;

    default:
      <ProfileForm />;
  }
  return (
    <div className="">
      <div className="my-8">
        <Tabs
          elements={["Profile", "Ideas", "Notifications", "Archive"]}
          filterVal={curentTab}
          setVal={(el) => setCurrentTab(el)}
        />
      </div>
      {component}
    </div>
  );
};

export default Profile;
