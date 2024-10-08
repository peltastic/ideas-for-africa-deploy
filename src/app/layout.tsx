import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/tiptap/styles.css";
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers/providet";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { store } from "@/lib/store";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "@/config/config";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "Got an idea for a better Africa?",
  icons: {
    icon: "/assets/logo.svg"
  }
};
// sjsj

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let persistor = persistStore(store);

  return (
    <html lang="en">
      <body className="">
        <ToastContainer />
        <GoogleOAuthProvider clientId={config.GOOGLE_AUTH_CLIENT_ID as string}>
          <Providers>
            <App /> 
            <MantineProvider
              theme={{
                headings: { fontFamily: "Poppins, sans-serif" },
              }}
            >
              <Notifications /> 
              {children}
            </MantineProvider>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
