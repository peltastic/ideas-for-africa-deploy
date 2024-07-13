// eslint-disable-next-line no-undef 
// dotenv.config()
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyBEtaKIh7UucwxSLMCkCCUivdGo39oP5Pk",
  authDomain: "ideas-for-africa-test-app.firebaseapp.com",
  projectId: "ideas-for-africa-test-app",
  messagingSenderId: "632778017296",
  appId: "1:632778017296:web:ef4ab3aca350b025f19895",
  measurementId: "G-K2Z2FNEV42",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
