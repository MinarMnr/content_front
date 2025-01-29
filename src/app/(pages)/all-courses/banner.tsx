"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
import React from "react";

const CourseBanner = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="overflow-hidden relative banner-all heiht-custom-banner">
      <div className="w-full h-full top-0 absolute m-auto px-32">
        <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
          <div className="basis-full flex flex-col justify-right items-center py-24">
            <span className="text-3xl mt-5 font-normal  text-white">
              {t.all_courses.all_course}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
