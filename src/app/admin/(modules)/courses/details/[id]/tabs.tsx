"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Tab {
  title: string;
  c_id: string;
  scrollH?: number;
}

const Tabs = () => {
  let tabList: Tab[] = [
    {
      title: "Course Overview",
      c_id: "admin-course-overview",
    },
    {
      title: "Course Content",
      c_id: "admin-course-contents",
    },
    {
      title: "Instructors",
      c_id: "admin-course-instructors",
    },
    {
      title: "Review",
      c_id: "admin-course-reviews",
    },
    {
      title: "FAQ",
      c_id: "admin-course-faq",
    },
  ];
  const [currentTab, setCurrentTab]: [string, Function] = useState(
    "admin-course-overview"
  );

  useEffect(() => {
    if (document) {
      document
        .getElementById("admin-scrollable")
        ?.addEventListener("scroll", (e: any) => {
          let scrolled: number = Math.ceil(e?.target?.scrollTop) + 170;
          if (
            (document.getElementById(tabList?.[1]?.c_id)?.offsetTop ?? 0) >
            scrolled
          ) {
            setCurrentTab(tabList?.[0]?.c_id);
          } else if (
            (document.getElementById(tabList?.[1]?.c_id)?.offsetTop ?? 0) <=
              scrolled &&
            (document.getElementById(tabList?.[2]?.c_id)?.offsetTop ?? 0) >
              scrolled
          ) {
            setCurrentTab(tabList?.[1]?.c_id);
          } else if (
            (document.getElementById(tabList?.[2]?.c_id)?.offsetTop ?? 0) <=
              scrolled &&
            (document.getElementById(tabList?.[3]?.c_id)?.offsetTop ?? 0) >
              scrolled
          ) {
            setCurrentTab(tabList?.[2]?.c_id);
          } else if (
            (document.getElementById(tabList?.[3]?.c_id)?.offsetTop ?? 0) <=
              scrolled &&
            (document.getElementById(tabList?.[4]?.c_id)?.offsetTop ?? 0) >
              scrolled
          ) {
            setCurrentTab(tabList?.[3]?.c_id);
          } else if (
            (document.getElementById(tabList?.[4]?.c_id)?.offsetTop ?? 0) <=
            scrolled
          ) {
            setCurrentTab(tabList?.[4]?.c_id);
          }
        });
    }
  }, []);

  return (
    <ul className="flex courses-lisy-tab font-semibold text-sm text-center">
      {tabList?.map((tab: Tab, index: number) => (
        <li
          key={index}
          className="relative border-b-2 bg-white flex flex-col w-full"
        >
          <Link
            className={`text-gray-500  py-4 ${
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

export default Tabs;
