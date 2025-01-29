import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import Link from "next/link";
import React from "react";

const Layout = ({ children, segment }: any) => {
  return (
    <div className="w-full grid grid-cols-2">
      <div className="text-3xl text-left text-stone-800">{children?.title}</div>
      <div className="absolute -right-3 -top-3">
        <Link
          className="float-right aspect-square bg-red-600 text-white p-2 rounded-full"
          href={`/profile?segment=${segment}`}
        >
          <DynamicHeroIcon s_icon="XMarkIcon" className="size-5" />
        </Link>
      </div>
      <div className="col-span-2">{children?.inner}</div>
    </div>
  );
};

export default Layout;
