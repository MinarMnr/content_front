"use client";

import LangTra from "@/app/_components/lang-tra";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Stepper = () => {
  let pathname = usePathname();
  let [active_item, setItem] = useState<any>(null);

  let steps: { title: string; url: string; step: number }[] = [
    {
      title: "Checkout",
      url: "/purchase/cart",
      step: 0,
    },
    {
      title: "Payment",
      url: "/purchase/payment",
      step: 1,
    },
    {
      title: "Result",
      url: "/purchase/result",
      step: 2,
    },
  ];

  useEffect(() => {
    setItem(steps?.find((tada: any) => tada?.url === pathname));
  }, [pathname]);

  return (
    <div className="w-full px-40">
      <div className="flex justify-between items-center relative">
        <div className="w-full absolute border-t"></div>
        {steps?.map((tada: any, index: number) => (
          <div
            // href={tada?.url}
            key={index}
            className={`aspect-square w-14 h-14 z-10 flex justify-center items-center rounded-full text-white text-xl font-bold ${
              active_item?.step > index
                ? "bg-gray-500"
                : active_item?.step === index
                ? "bg-emerald-700 all-disable"
                : "bg-gray-400 all-disable"
            }`}
          >
            <LangTra control="value" data={{ value: index + 1 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
