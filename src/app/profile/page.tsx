"use client";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useLazyGetUserProfileQuery } from "@/lib/features/auth/profile";
import { getCookie } from "@/utils/storage";
import React, { useEffect } from "react";
import ThreeDotLoader from "@/components/Loader/ThreeDotLoader";

type Props = {};

const ProfilePage = (props: Props) => {
  const id = getCookie("id");
  const [getUserProfile, { data, isFetching }] = useLazyGetUserProfileQuery();
  useEffect(() => {
    getUserProfile({
      id,
    });
  }, []);
  return (
    <div className="">
      <Navbar />
      {data ? (
        <div className="px-4 xs:px-10 md:px-20 mx-auto max-w-[1700px]">
          <ProfileHeader email={data.email} fname={data.fname} lname={data.lname} />
          <Profile data={data} isFetching={isFetching} />
        </div>
      ) : (
        <ThreeDotLoader />
      )}
    </div>
  );
};

export default ProfilePage;
