// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBGxug5D9xVSenU6V0Y5bFO4360Zo4btOY",
  authDomain: "ideas-for-africa-test.firebaseapp.com",
  projectId: "ideas-for-africa-test",
  storageBucket: "your_keys",
  messagingSenderId: "612720130324",
  appId: "1:612720130324:web:b6ba5dd2e27c19e3a26a01",
  measurementId: "G-RGHX9MEDYY",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
