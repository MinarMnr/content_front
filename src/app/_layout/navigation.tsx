import Link from "next/link";
import React from "react";
import { navigation } from "../lib/navigation";

const Navigation = () => {
  let links: navigation[] = [
    {
      id: 1,
      title: "Home",
      route: "/",
    },
    {
      id: 2,
      title: "Contents",
      route: "/content-list",
    },
    {
      id: 3,
      title: "About Us",
      route: "/about-us",
    },
    {
      id: 4,
      title: "Contact Us",
      route: "/contact-us",
    },
  ];
  return (
    <ul className={"flex flex-row gap-x-4"}>
      {links.map((tada: navigation) => (
        <Link key={`${tada?.id}`} href={tada?.route}>
          {tada?.title}
        </Link>
      ))}
    </ul>
  );
};

export default Navigation;
