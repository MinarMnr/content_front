"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import CourseCard from "@/app/_components/course-card";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
import Image from "next/image";
const TopSkill = ({ data, className }: { data: any; className?: string }) => {
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
    <div
      className={`py-10 grid grid-cols-1 gap-y-2 slder-all-block relative  ${className}`}
    >
      <div className="team-one__shape-2 shapemover right-12 top-28 left-auto">
        <Image
          src={"/team-one-shape-3.png"}
          alt={""}
          width={700}
          height={700}
        />
      </div>
      <div className="sho-an shapemover">
        <Image
          src={"/program-3-shape-1.webp"}
          alt={""}
          width={700}
          height={700}
        />
      </div>
      <div className="container mx-auto pt-50 pb-90px pl-28 pr-28 mt-8">
        {/* <div className="text-green-700 text-center">
          Top Skill Development Courses
        </div> */}
        <div className="text-3xl font-bold text-center">
          {t.home_top_skill.explore_top_skill}
        </div>
        {data && data?.length ? (
          <Carousel className="carousel-list mt-5" responsive={responsive}>
            {data?.map((tada: any, index: number) => (
              <CourseCard key={index} data={tada} />
            ))}
          </Carousel>
        ) : null}
        <div className="w-full md:w-3/3 text-center">
          <button className="mt-12 px-12 py-2  mx-auto text-green-800 border border-white hover:border-solid hover:border hover:border-green-800 rounded-full ">
            <Link
              href="/all-courses?page=1&size=9&course_type_id=2"
              className="flex items-center"
            >
              {t.home_top_skill.view_all_cou}
              <ArrowLongRightIcon className="size-7 ml-1  relative" />
            </Link>
          </button>
        </div>
      </div>

      {/* <div className="flex container mx-auto flex-col justify-start items-center">
        <div className="h-fit grid grid-cols-4 gap-x-2 py-4">
          <div className="border-2 bg-white border-gray-200 border-solid p-1 rounded-md">
            <div className="overflow-hidden h-40">
              <Image
                src={"/courses/course-1.png"}
                alt={""}
                width={500}
                height={500}
              />
            </div>
            <div className="px-3 py-6">
              <div className="tracking-wide text font-bold text-gray-500 h-24">
                জাভা অ্যাডভান্স
              </div>
              <div className="text-sm text-gray-300">
                জাভা বেসিক এন্ড অ্যাডভান্স
              </div>
              <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                <div className="text-emerald-900 font-bold">৳100.00</div>
                <button className="bg-emerald-300 text-emerald-700 px-10 py-2 rounded-md">
                  Free
                </button>
              </div>
            </div>
          </div>
          <div className="border-2 bg-white border-gray-200 border-solid p-1 rounded-md">
            <div className="overflow-hidden h-40">
              <Image
                src={"/courses/course-2.png"}
                alt={""}
                width={500}
                height={500}
              />
            </div>
            <div className="px-3 py-6">
              <div className="tracking-wide text font-bold text-gray-500 h-24">
                পাইথন প্রোগ্রাম
              </div>
              <div className="text-sm text-gray-300">পাইথন বেসিক</div>
              <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                <div className="text-emerald-900 font-bold">৳100.00</div>
                <button className="bg-emerald-300 text-emerald-700 px-10 py-2 rounded-md">
                  Free
                </button>
              </div>
            </div>
          </div>
          <div className="border-2 bg-white border-gray-200 border-solid p-1 rounded-md">
            <div className="overflow-hidden h-40">
              <Image
                src={"/courses/course-3.png"}
                alt={""}
                width={500}
                height={500}
              />
            </div>
            <div className="px-3 py-6">
              <div className="tracking-wide text font-bold text-gray-500 h-24">
                এসএসসি-২০২২ সাজেশনমূলক ক্লাস
              </div>
              <div className="text-sm text-gray-300">পদার্থবিজ্ঞান | SSC</div>
              <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                <div className="text-emerald-900 font-bold">৳100.00</div>
                <button className="bg-emerald-300 text-emerald-700 px-10 py-2 rounded-md">
                  Free
                </button>
              </div>
            </div>
          </div>
          <div className="border-2 bg-white border-gray-200 border-solid p-1 rounded-md">
            <div className="overflow-hidden h-40">
              <Image
                src={"/courses/course-4.png"}
                alt={""}
                width={500}
                height={500}
              />
            </div>
            <div className="px-3 py-6">
              <div className="tracking-wide text font-bold text-gray-500 h-24">
                হিসাববিজ্ঞান পরিচিতি
              </div>
              <div className="text-sm text-gray-300">
                হিসাব বিজ্ঞান ১ম পত্র | HSC
              </div>
              <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                <div className="text-emerald-900 font-bold">৳100.00</div>
                <button className="bg-emerald-300 text-emerald-700 px-10 py-2 rounded-md">
                  Free
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-12 px-12 py-3 text-emerald-400 border-solid border border-emerald-400 rounded-full">
          View All Courses
        </button>
      </div> */}
    </div>
  );
};

export default TopSkill;
