"use client";
import SetRoute from "@/components/HOC/setRoute";
import ThreeDotLoader from "@/components/Loader/ThreeDotLoader";
import Navbar from "@/components/Navbar/Navbar";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileView from "@/components/ProfileView/ProfileView";
import { useLazyGetUserProfileQuery } from "@/lib/features/profile";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const ProfileViewPage = (props: Props) => {
  const { id } = useParams();
  const [getUserProfile, { data, isFetching }] = useLazyGetUserProfileQuery();
  useEffect(() => {
    if (id) {
      getUserProfile({
        id: id as string,
      });
    }
  }, [id]);
  return (
    <div className="">
      <Navbar />
      <div className="px-3 sm:px-20">
        {data ? (
          <>
            <ProfileHeader
              url={data.profile?.ppicture}
              email={data.email}
              fname={data.fname}
              lname={data.lname}
              readonly
            />
            <ProfileView id={id as string} />
          </>
        ) : (
          <div className="ml-10 mt-10">
            <ThreeDotLoader />
          </div>
        )}
        {/* <ProfileHeader /> */}
      </div>
    </div>
  );
};

export default SetRoute(ProfileViewPage);
