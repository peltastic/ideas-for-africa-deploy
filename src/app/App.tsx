"use client";
import React, { useEffect } from "react";
import useFCM from "@/hooks/useFcm";
import { useDispatch, useSelector } from "react-redux";
import { setFCM } from "@/lib/reducers/fcm";
import { RootState } from "@/lib/store";
import { useSetFcmTokenMutation } from "@/lib/features/notifications";
import { getCookie } from "@/utils/storage";
import { enableNotis, notis_socket } from "@/lib/sockets";
import { setShowIndicator } from "@/lib/reducers/notis";

type Props = {};

const App = (props: Props) => {
  const dispatch = useDispatch();
  const id = getCookie("id")
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );

  useEffect(() => {
    if (authStatus === "LOGGED_IN" && id) {
      enableNotis(id)
    }
    notis_socket.on("newNotification", (msgData) => {
      console.log("new Notification");
      dispatch(setShowIndicator(true));
    });
  }, []);
  // const id = getCookie("id");
  // const dispatch = useDispatch();
  // const authStatus = useSelector(
  //   (state: RootState) => state.persistedState.auth.authStatus
  // );

  // const { messages, fcmToken } = useFCM();
  // const [setFcm, fcmResult] = useSetFcmTokenMutation();

  // useEffect(() => {
  //   if (fcmToken) {
  //     dispatch(
  //       setFCM({
  //         fcm: fcmToken,
  //       })
  //     );
  //   }
  //   if (fcmToken && id) {
  //     setFcm({
  //       fcmtoken: fcmToken,
  //       userId: id,
  //     });
  //   }
  // }, [fcmToken]);
  // useEffect(() => {
  //   if (authStatus === "LOGGED_IN" && id) {
  //     enableNotis(id);
  //   }
  // }, []);

  return null;
};

export default App;
