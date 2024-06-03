"use client";

import Tabs from "@/Tabs/Tabs";
import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import Ideas from "../Ideas/Ideas";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import Archive from "../Archive/Archive";
import { useLazyGetUserProfileQuery } from "@/lib/features/auth/profile";
import { getCookie } from "@/utils/storage";
import ThreeDotLoader from "../Loader/ThreeDotLoader";

type Props = {};

const Profile = (props: Props) => {
  const id = getCookie("id");
  const [getUserProfile, { data, isFetching }] = useLazyGetUserProfileQuery();

  useEffect(() => {
    getUserProfile({
      id,
    });
  }, []);
  const [curentTab, setCurrentTab] = useState<
    "Profile" | "Ideas" | "Notifications" | "Archive"
  >("Profile");
  let component = (
    <>
      {data ? (
        <ProfileForm data={data} />
      ) : (
        <div className="mt-8">
          <ThreeDotLoader />
        </div>
      )}
    </>
  );
  switch (curentTab) {
    case "Profile":
      component = <>
      {data ? (
        <ProfileForm data={data} />
      ) : (
        <div className="mt-8">
          <ThreeDotLoader />
        </div>
      )}
    </>;
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
