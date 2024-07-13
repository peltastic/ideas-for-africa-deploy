"use client";
import { useEffect, useState } from "react";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/firebase/firebase";
import useNotificationPermission from "./useNotificationPermission";
import config from "@/config/config";

const useFCMToken = () => {
  const permission = useNotificationPermission();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      const isSupported = () =>
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window;
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (isSupported()) {
          if (permission === "granted") {
            const isFCMSupported = await isSupported();
            if (!isFCMSupported) return;
            const fcmToken = await getToken(messaging(), {
              vapidKey: config.VAPID_KEY,
            });
            setFcmToken(fcmToken);
          }
        }
      }
    };
    retrieveToken();
  }, [permission]);

  return fcmToken;
};

export default useFCMToken;
