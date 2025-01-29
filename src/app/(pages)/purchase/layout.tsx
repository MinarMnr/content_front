import React from "react";
import Stepper from "./stepper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto pb-6 py-28 pt-12 flex flex-col justify-start items-stretch">
      <div className="pb-4">
        <Stepper />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
