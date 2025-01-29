"use client";

import React, { useState } from "react";
import Image from "next/image";
import { menu_list } from "./menu_list";
import { SidebarMenu } from "@/app/lib/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const SidabarCard = ({
  self,
  current_route,
  parent_route,
}: {
  self: SidebarMenu;
  current_route: string;
  parent_route?: string;
}): React.JSX.Element => {
  let full_route: string = `/${parent_route ?? ""}${
    parent_route && self?.path ? "/" : ""
  }${self?.path}`;

  return (
    <Link href={full_route}>
      <div
        className={`w-full px-4 py-3 mb-1 flex ${
          current_route === full_route
            ? "bg-green-800 text-white rounded-md border-l-2 border-green-600"
            : " text-gray-200"
        }`}
      >
        <DynamicHeroIcon s_icon={self?.icon} className="size-5 mr-2 icon-nav" />
        <span>{self?.title}</span>
        {self?.permissions?.length ? (
          <DynamicHeroIcon
            s_icon={"ChevronDownIcon"}
            className="size-5 mr-2 rotate-arrow icon-nav"
          />
        ) : null}
      </div>
    </Link>
  );
};

const SidebarReuse = ({
  children,
  current_route,
  parent_route,
  sidebar_open,
  search_string,
}: {
  children: SidebarMenu[];
  current_route: string;
  parent_route?: string;
  sidebar_open?: boolean;
  search_string?: string;
}): React.JSX.Element => {
  return (
    <>
      {children?.map((child: SidebarMenu, index: number) => {
        let child_route: string = `${parent_route ?? ""}${
          parent_route && child?.path ? "/" : ""
        }${child?.path}`;

        return (
          <div key={index}>
            <SidabarCard
              self={child}
              parent_route={parent_route}
              current_route={current_route}
            />
            <div
              className={`pl-1 ${
                child?.permissions && child?.permissions?.length
                  ? "sub-nav bg-green-800 rounded-md border-l-2 border-green-600  relative"
                  : ""
              }`}
            >
              {child?.permissions &&
              current_route?.startsWith(`/${child_route}`) ? (
                <SidebarReuse
                  children={child?.permissions}
                  current_route={current_route}
                  parent_route={child_route}
                  sidebar_open={sidebar_open}
                  search_string={search_string}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

const sidebarMain = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full flex flex-col items-stretch">
      <div className="flex justify-center items-center py-4 mt-8 mb-8">
        <Link href="/admin">
          <Image
            src={"/logo-dashboard.png"}
            alt={""}
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="grow overflow-auto p-5 menu-list">
        <SidebarReuse
          children={menu_list}
          current_route={pathname ? pathname : "/"}
          parent_route={"admin"}
        />
      </div>
    </div>
  );
};

export default sidebarMain;
