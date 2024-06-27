"use client";
import React, { useEffect } from "react";
import useFCM from "@/hooks/useFcm";
import { useDispatch } from "react-redux";
import { setFCM } from "@/lib/reducers/fcm";

type Props = {};

const App = (props: Props) => {
  const dispatch = useDispatch();
  const { messages, fcmToken } = useFCM();

  useEffect(() => {
    if (fcmToken) {
      console.log(fcmToken)
      dispatch(setFCM({
        fcm: fcmToken
      }));
    }
  }, [fcmToken]);
  return null;
};

export default App;
