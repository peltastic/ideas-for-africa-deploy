import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import React from "react";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <div className="">
      <Navbar />
      <div className="px-20">
        <ProfileHeader />
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
