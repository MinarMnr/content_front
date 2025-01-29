"use client";

import LangTra from "@/app/_components/lang-tra";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Sidebar = ({
  tabLists,
}: {
  tabLists: { accessor: string; segment: string; modal?: string }[];
}) => {
  const searchParams = new URLSearchParams(useSearchParams());

  return (
    <div className="flex justify-start items-center gap-y-1">
      {tabLists?.map((tada: any, index: number) => (
        <Link
          key={index}
          href={`/profile?segment=${tada?.segment}${
            tada?.modal ? `&modal=${tada?.modal}` : ""
          }`}
          className={`text-green-800 font-semibold w-[172px] text-center py-3 rounded-full ${
            searchParams?.get("modal")
              ? searchParams?.get("segment") === tada?.segment &&
                searchParams?.get("modal") === tada?.modal
                ? "bg-emerald-700"
                : "bg-gray-50"
              : searchParams?.get("segment") === tada?.segment && !tada?.modal
              ? "bg-emerald-700 text-white"
              : "bg-gray-0"
          }`}
        >
          <LangTra control={`profile.${tada?.accessor}`} />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
