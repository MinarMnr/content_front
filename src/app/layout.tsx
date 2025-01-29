"use client";

import { Inter } from "next/font/google";
import "./_scss/globals.scss";
import "./_scss/course-details-style.scss";
import RouteChange from "./_components/route-change-detector";
import { Provider } from "react-redux";
import store from "./store.ts";
import SyncAuthState from "./_components/SyncAuthState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "./context/LanguageContext";

// export const metadata: Metadata = {
//   title: "Edutube | Best online learning platform in Bangladesh",
//   description: "Best online learning platform in Bangladesh",
// };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastContainer />
        <Provider store={store}>
          <SyncAuthState />
          <RouteChange></RouteChange>
          <LanguageProvider>{children}</LanguageProvider>
        </Provider>
      </body>
    </html>
  );
}
