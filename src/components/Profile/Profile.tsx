"use client";

import Tabs from "@/Tabs/Tabs";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import Ideas from "../Ideas/Ideas";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import Archive from "../Archive/Archive";

type Props = {
  data: IGetUserProfileResponse;
  isFetching: boolean;
};

const Profile = ({ data, isFetching }: Props) => {
  const [curentTab, setCurrentTab] = useState<
    "Profile" | "Ideas" | "Notifications" | "Archive"
  >("Profile");
  let component = <ProfileForm data={data} />;
  switch (curentTab) {
    case "Profile":
      component = <ProfileForm data={data} />;
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
      break;
  }
  return (
    <div className="">
      <div className="my-8">
        <Tabs
          profile
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
