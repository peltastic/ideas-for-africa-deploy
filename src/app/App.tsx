"use client";
import React, { useEffect } from "react";
import useFCM from "@/hooks/useFcm";
import { useDispatch, useSelector } from "react-redux";
import { setFCM } from "@/lib/reducers/fcm";
import { RootState } from "@/lib/store";
import { useSetFcmTokenMutation } from "@/lib/features/notifications";
import { getCookie } from "@/utils/storage";

type Props = {};

const App = (props: Props) => {
  const id = getCookie("id");
  const dispatch = useDispatch();

  const { messages, fcmToken } = useFCM();
  const [setFcm, fcmResult] = useSetFcmTokenMutation();

  useEffect(() => {
    if (fcmToken) {
      dispatch(
        setFCM({
          fcm: fcmToken,
        })
      );
    }
    if (fcmToken && id) {
      setFcm({
        fcmtoken: fcmToken,
        userId: id,
      });
    }
  }, [fcmToken]);

  return null;
};

export default App;
