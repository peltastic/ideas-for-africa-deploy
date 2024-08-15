"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { getCookie } from "@/utils/storage";
import { enableNotis, notis_socket } from "@/lib/sockets";
import { setShowIndicator } from "@/lib/reducers/notis";
import { notifications } from "@mantine/notifications";
import { primaryColor } from "@/utils/constants";

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
      notifications.show({
        title: "New notification",
        message: "Check Notifications on your profile",
        color: primaryColor,
        autoClose: 4000
      })
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
