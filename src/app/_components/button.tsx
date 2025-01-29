"use client";

import React from "react";

const Button = ({ data }: { data: any }) => {
  return (
    <div className="bg-slate-500 px-4 py-2" onClick={(event: any) => {}}>
      {data?.title}
    </div>
  );
};

export default Button;
