import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/tiptap/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers/providet";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { store } from "@/lib/store";
import App from "./App";

export const metadata: Metadata = {

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
        <Providers>
          <App /> 
          <MantineProvider
            theme={{
              headings: { fontFamily: "Poppins, sans-serif" },
            }}
          >
            {children}
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
