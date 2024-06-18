"use client";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useLazyGetUserProfileQuery } from "@/lib/features/profile";
import { getCookie } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import ThreeDotLoader from "@/components/Loader/ThreeDotLoader";

type Props = {};

const ProfilePage = (props: Props) => {
  const id = getCookie("id");
  const [getUserProfile, { data, isFetching }] = useLazyGetUserProfileQuery();
  const [tempPfp, setTempPfp] = useState<string>("");
  useEffect(() => {
    getUserProfile({
      id,
    });
  }, []);
  const setTempPfpHandler = (pfp: string) => {
    setTempPfp(pfp);
  };
  return (
    <div className="">
      <Navbar />
      {data ? (
        <div className="px-4 xs:px-10 md:px-20 mx-auto max-w-[1700px]">
          <ProfileHeader
           url={tempPfp || data.profile?.ppicture}
            email={data.email}
            fname={data.fname}
            lname={data.lname}
          />
          <Profile
            tempPfp={tempPfp}
            setTempPfp={setTempPfpHandler}
            data={data}
            isFetching={isFetching}
          />
        </div>
      ) : (
        <div className="ml-10 mt-10">
          <ThreeDotLoader />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
