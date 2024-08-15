import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowIndicator } from "@/lib/reducers/notis";
import Button from "../Button/Button";
import ReadNotifications from "./ReadNotifications";
import UnreadNotifications from "./UnreadNotifications";

type Props = {};

const ProfileNotifications = (props: Props) => {
  const dispatch = useDispatch();
  const [type, setType] = useState<"read" | "unread">("unread");

  useEffect(() => {
    dispatch(setShowIndicator(false));
  }, []);

  return (
    <div>
      <div className="flex text-sm ">
        <Button
          clicked={() => {
            setType("unread");
          }}
          classname={`${
            type === "unread"
              ? "border-black text-black"
              : "border-gray3 text-gray1"
          }  border rounded-full  py-1 px-3 mr-2 transition-all`}
        >
          Unread
        </Button>
        <Button
          clicked={() => {
            setType("read");
          }}
          classname={`${
            type === "read"
              ? "border-black text-black"
              : "border-gray3 text-gray1"
          }  border rounded-full  py-1 px-3 mr-2 transition-all`}
        >
          Read
        </Button>
      </div>
      {type === "read" ? (
        <ReadNotifications type={type} />
      ) : (
        <UnreadNotifications type={type} />
      )}
    </div>
  );
};

export default ProfileNotifications;
