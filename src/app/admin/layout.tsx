import React from "react";
import Header from "./_layout/header";
import Sidebar from "./_layout/sidebar/sidebar-main";
import Footer from "./_layout/footer";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { getCookie } from "../actions";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  let token = await getCookie("edutube-auth-token");

  if(!token){
    redirect('/');
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-dashboard">
        <div className="w-1/5 bg-shape relative w-1-custom">
          <span className="absolute -right-24 bg-white w-12 h-12 rounded-full text-center shadow-md mt-6">
            <Bars3BottomLeftIcon className="size-7 text-gray-500 relative left-3 top-3 cursor-pointer " />
          </span>
          <Sidebar />
        </div>
        <div className="w-4/5 flex flex-col w-4-custom">
          <div>
            <Header />
          </div>
          <div
            id="admin-scrollable"
            className="grow overflow-auto pl-12 pr-4 mt-8"
          >
            <div className="w-full bg-white shadow-md rounded-lg p-4">
              {children}
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;
