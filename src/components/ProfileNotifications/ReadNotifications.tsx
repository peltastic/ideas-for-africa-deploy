import React, { useEffect } from "react";
import {
  useLazyGetUserReadNotificationsQuery,
} from "@/lib/features/notifications";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import Notification from "./Notification";
import { getCookie } from "@/utils/storage";
import Image from "next/image";

import NoNotifications from "/public/assets/notify-animate.svg";

type Props = {
  type: "read" | "unread";
};

const ReadNotifications = ({ type }: Props) => {
  const id = getCookie("id");
  const [getRead, { data, isFetching, isError, isSuccess }] =
    useLazyGetUserReadNotificationsQuery();

  useEffect(() => {
    getRead({
      userId: id,
    });
  }, []);
  return (
    <div className="">
      {isFetching ? (
        <div className="w-full mm:w-[90%] lg:w-[80%] des:w-[60%]">
          <IdeasSkeleton />
          <IdeasSkeleton />
          <IdeasSkeleton />
          <IdeasSkeleton />
        </div>
      ) : data ? (
        <div className="w-full mm:w-[90%] lg:w-[80%] des:w-[60%]">
          {data?.notifications.map((el) => (
            <Notification type={type} data={el} key={el._id} />
          ))}
        </div>
      ) : (
        <div className="">
          <Image
            src={NoNotifications}
            alt="no-notifications"
            className="mx-auto w-[20rem]"
          />
          <p className="text-center">No Notifications received</p>
        </div>
      )}
    </div>
  );
};

export default ReadNotifications;
