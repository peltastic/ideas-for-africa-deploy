"use client";

import Tabs from "@/Tabs/Tabs";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import Ideas from "../Ideas/Ideas";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import Archive from "../Archive/Archive";
import ProfileSettings from "./ProfileSettings";
import { useRouter, useSearchParams } from "next/navigation";
import { IGetUserProfileResponse } from "@/interface/profile";

type Props = {
  data: IGetUserProfileResponse;
  isFetching: boolean;
  tempPfp?: string;
  setTempPfp: (pfp: string) => void;
};

const Profile = ({ data, isFetching, tempPfp, setTempPfp }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
   const [curentTab, setCurrentTab] = useState<
    "Profile" | "Ideas" | "Notifications" | "Archive" | "Settings"
  >("Profile");
  let component = <ProfileForm data={data} />;
  switch (tab) {
    case "profile":
      component = <ProfileForm data={data} />;
      break;
    case "ideas":
      component = <Ideas />;
      break;
    case "notifications":
      component = <ProfileNotifications />;
      break;
    case "archives":
      component = <Archive />;
      break;
    case "settings":
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
            // "Archive",
            "Settings",
          ]}
          filterVal={tab|| "profile"}
          setVal={(el) => router.push(`/profile/?tab=${el.toLowerCase()}`)}
        />
      </div>
      {component}
    </div>
  );
};

export default Profile;
