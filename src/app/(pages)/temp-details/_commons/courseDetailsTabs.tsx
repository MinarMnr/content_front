"use client";
import Link from "next/link";
import React, { useState } from "react";
interface Tab {
  title: string;
  c_id: string;
  scrollH?: number;
}

const courseDetailsTabs = () => {
  let tabList: Tab[] = [
    {
      title: "Course Introduction",
      c_id: "intro",
    },
    {
      title: "Course Details",
      c_id: "details",
    },
    {
      title: "Instructors",
      c_id: "ins",
    },
    {
      title: "Review",
      c_id: "rev",
    },
    {
      title: "FAQ",
      c_id: "ask",
    },
  ];
  const [currentTab, setCurrentTab]: [string, Function] = useState("");
  return (
    <ul className="block w-3/3 sm:flex lg:mt-0 courses-lisy-tab h-10 mb-8 font-semibold text-sm text-center ">
      {tabList?.map((tab: Tab, index: number) => (
        <li
          key={index}
          className="relative border-b-2 bg-white flex flex-col w-full"
        >
          <Link
            className={`text-gray-500 ${
              currentTab === tab?.c_id && "active-couser-list"
            }`}
            href={`#${tab?.c_id}`}
            onClick={() => setCurrentTab(tab?.c_id)}
          >
            {tab?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default courseDetailsTabs;
