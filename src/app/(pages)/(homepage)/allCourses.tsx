"use client";
import React from "react";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Carousel from "react-multi-carousel";
import CourseCard from "@/app/_components/course-card";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
import Image from "next/image";
const DashboardCourses = ({
  data,
  className,
}: {
  data: any;
  className?: string;
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={`slder-all-block relative z-10 ${className ?? ""}`}>
      <div className="team-one__shape-1 shapemover">
        <Image
          src={"/team-one-shape-1.png"}
          alt={""}
          width={700}
          height={700}
        />
      </div>

      <div className="team-one__shape-2 float-bob-y">
        <Image
          src={"/team-one-shape-2.png"}
          alt={""}
          width={700}
          height={700}
        />
      </div>

      <div className="container mx-auto pt-50 pb-90px pl-28 pr-28 mt-8">
        {/* <div className="text-green-700 text-left">All Courses</div>
        <div className="text-3xl text-left">Explore Your Courses</div> */}
        <div className="text-3xl font-bold text-center">
          {t.home_top_course.exp_feat_cou}
        </div>
        {data && data?.length ? (
          <Carousel className="carousel-list mt-5" responsive={responsive}>
            {data?.map((tada: any, index: number) => (
              <CourseCard key={index} data={tada} />
            ))}
          </Carousel>
        ) : null}
        {/* <div className="w-full md:w-3/3 text-center">
          <button className="mt-12 px-12  mx-auto text-green-800 border py-2 border-white hover:border-solid hover:border hover:border-green-800 rounded-full ">
            <Link
              href="/all-courses?page=1&size=9&course_type_id=1"
              className="flex items-center"
            >
              {t.home_top_course.view_all_cou}
              <ArrowLongRightIcon className="size-7 ml-1  relative" />
            </Link>
          </button>
        </div> */}
        <div className="w-full md:w-3/3 text-center">
          <button className="mt-12 px-12 mx-auto text-green-800 border-green-800 border py-2 hover:border-solid hover:border hover:bg-green-200 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 active:bg-green-100">
            <Link
              href="/all-courses?page=1&size=9&course_type_id=1"
              className="flex items-center"
            >
              {t.home_top_course.view_all_cou}
              <ArrowLongRightIcon className="w-5 h-5 ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
            </Link>
          </button>
        </div>
      </div>

      <Image
        className="courses-block-img shapemover"
        src={"/bookr.svg"}
        alt={""}
        width={700}
        height={700}
      />
    </div>
  );
};

export default DashboardCourses;
