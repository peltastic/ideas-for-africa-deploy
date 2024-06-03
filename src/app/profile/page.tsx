"use client"
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import React from "react";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <div className="">
      <Navbar />
      <div className="px-4 xs:px-10 md:px-20 mx-auto max-w-[1700px]">
        <ProfileHeader />
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
