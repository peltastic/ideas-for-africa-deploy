import {
  useLazyGetUserNotificationQuery,
} from "@/lib/features/notifications";
import { getCookie } from "@/utils/storage";
import React, { useEffect } from "react";
import Notification from "./Notification";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import { useDispatch } from "react-redux";
import { setShowIndicator } from "@/lib/reducers/notis";
import NoNotifications from "/public/assets/notify-animate.svg"
import Image from "next/image";

type Props = {};

const ProfileNotifications = (props: Props) => {
  const dispatch = useDispatch();
  const id = getCookie("id");
  const [getUserNotification, { data, isFetching }] =
    useLazyGetUserNotificationQuery();
  // const {data} = useGetUserNotificationQuery(id, {
  //   ref
  // })

  useEffect(() => {
    getUserNotification(id);
  }, []);

  useEffect(() => {
    dispatch(setShowIndicator(false));
  }, []);

  return (
    <div>
      <div className="">
        {isFetching ? (
          <div className="w-full mm:w-[90%] lg:w-[80%] des:w-[60%]">
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
          </div>
        ) : data?.notifications ? (
          <div className="w-full mm:w-[90%] lg:w-[80%] des:w-[60%]">
            {data?.notifications.map((el) => (
              <Notification data={el} key={el._id} />
            ))}
          </div>
        ): <div className="">
          <Image src={NoNotifications} alt="no-notifications" className="mx-auto w-[20rem]" />
          <p className="text-center">No Notifications received</p>
        </div> }
      </div>
     
    </div>
  );
};

export default ProfileNotifications;
