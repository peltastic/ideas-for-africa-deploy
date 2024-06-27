"use client";
import config from "@/config/config";
// Import the functions you need from the SDKs you need
import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  // storageBucket: config.,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
console.log(firebaseConfig)
export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;