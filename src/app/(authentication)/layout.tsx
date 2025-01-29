"use client";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-left-login">
      <div className="w-screen flex justify-center items-center h-screen bg-right-login">
        {children}
      </div>
    </div>
  );
};

export default layout;
