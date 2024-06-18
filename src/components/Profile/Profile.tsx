"use client";

import Tabs from "@/Tabs/Tabs";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import Ideas from "../Ideas/Ideas";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import Archive from "../Archive/Archive";
import ProfileSettings from "./ProfileSettings";

type Props = {
  data: IGetUserProfileResponse;
  isFetching: boolean;
  tempPfp?: string;
  setTempPfp: (pfp: string) => void;
};

const Profile = ({ data, isFetching, tempPfp, setTempPfp }: Props) => {
  const [curentTab, setCurrentTab] = useState<
    "Profile" | "Ideas" | "Notifications" | "Archive" | "Settings"
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
    case "Settings":
      component = (
        <ProfileSettings tempPfp={tempPfp || data.profile?.ppicture } setTempPfp={setTempPfp} />
      );
      break;

    default:
      break;
  }
  return (
    <div className="">
      <div className="my-8 text-xs xs:text-sm">
        <Tabs
          profile
          elements={[
            "Profile",
            "Ideas",
            "Notifications",
            "Archive",
            "Settings",
          ]}
          filterVal={curentTab}
          setVal={(el) => setCurrentTab(el)}
        />
      </div>
      {component}
    </div>
  );
};

export default Profile;
