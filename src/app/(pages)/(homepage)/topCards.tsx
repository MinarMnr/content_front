"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const TopCards = ({ ...props }: any) => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="container mx-auto pl-32 pr-32 skill-block">
      <div
        {...props}
        className={`grid md:grid-cols-3 sm:grid-cols-1 text-green-800  bg-white drop-shadow-sm border-b relative -top-14 rounded-xl skill-block ${props?.className}`}
      >
        <Link href={`/all-courses?page=1&size=9&course_type_id=1`}>
          <div className="w-full flex sm:flex-row flex-col justify-center items-center px-20 py-6  hover:shadow courses-block">
            <span className="border border-dashed w-16 h-16 text-center bg-green-50 me-2 pt-3 rounded-full border-green-900 skill-icon">
              <AcademicCapIcon className="2xl:size-8 xl:size-8 lg:size-6 mt-1 mx-auto" />
            </span>
            <span className="link-coures">{t.banner.six12}</span>
          </div>
        </Link>
        <Link href={`/all-courses?page=1&size=9&course_type_id=2`}>
          <div className="w-full flex sm:flex-row flex-col justify-center items-center px-20 py-6 gray-light md:border-x md:border-y-0 sm:border-x-0 sm:border-y border-gray-200 border-dashed  hover:shadow-lg courses-block">
            <span className="border border-dashed w-16 h-16 text-center me-2 pt-3 rounded-full bg-green-50 border-green-900 skill-icon">
              <BookOpenIcon className="2xl:size-8 xl:size-8 lg:size-6 mt-1 mx-auto" />
            </span>
            <span className="link-coures">{t.banner.skill}</span>
          </div>
        </Link>
      
        <Link href={`/tutors`}>
          <div className="w-full flex sm:flex-row flex-col justify-center items-center px-20 py-6  hover:shadow courses-block">
            <span className="border border-dashed w-16 h-16 text-center me-2 pt-3 rounded-full bg-green-50 border-green-900 skill-icon">
              <ComputerDesktopIcon className="2xl:size-8 xl:size-8 lg:size-6 mt-1 mx-auto" />
            </span>
            <span className="link-coures">{t.banner.tutor}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopCards;
