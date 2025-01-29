"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const IdPathLink = ({
  title,
  route,
  className,
}: {
  title: string;
  route: string;
  className: string;
}) => {
  let path: string = usePathname();

  let linker: {
    [key: string]: string;
  } = {
    overview: "admin-course-overview",
    contents: "admin-course-contents",
    instructors: "admin-course-instructors",
    faqs: "admin-course-reviews",
    reviews: "admin-course-faq",
  };
  return (
    <Link
      href={`${route}#${linker?.[path?.match(/(?<=\/)[^\/]+$/)?.[0] ?? ""]}`}
      className={`px-6 py-2  rounded-md ${className}`}
    >
      {title}
    </Link>
  );
};

export default IdPathLink;
