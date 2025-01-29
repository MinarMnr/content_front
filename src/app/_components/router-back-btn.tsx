"use client"

import { useRouter } from "next/navigation";
import React from "react";

const RouterBackBtn = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        e?.preventDefault();
        e?.stopPropagation();
        router.back();
      }}
      className={className}
    >
      {text}
    </button>
  );
};

export default RouterBackBtn;
