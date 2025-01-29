"use client";

import { usePathname } from "next/navigation";
import React from "react";

const RouteChange = ({ children, pathname, condition }: any) => {
  let path: string = usePathname();

  return (
    <>
      {children
        ? React.cloneElement(children, {
            ...(path === pathname ? condition?.match : condition?.unmatch),
          })
        : null}
    </>
  );
};

export default RouteChange;
