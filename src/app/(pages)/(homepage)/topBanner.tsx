"use client";
import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
import LangTra from "@/app/_components/lang-tra";

const TopBanner = ({ ...props }: any) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div {...props} className={`banner-area ${props?.className}`}>
         <div className="sho-an shapemover">
        <Image
          src={"/program-3-shape-1.webp"}
          alt={""}
          width={700}
          height={700}
        />
      </div>

      <div className="container mx-auto pt-30 pb-90px pl-28 pr-28 banner-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-30px banner-wrap-inner">
          <div className="lg:mr-30px relative mb-10 lg:mb-0 left-banner">
            <h2 className="text-white text-5xl font-semibold mt-36 leading-tight">
              {t.top_banner.find_most_excite}
              <br></br>
              {t.top_banner.onl_cou}
            </h2>
            <h5 className="mt-4 text-white">
              {t.top_banner.join_the_community}
            </h5>
            <div className="banner-btn">
              <Link
                href={"/all-courses"}
                className="px-12 mt-6 py-3 w-fit bg-white rounded-full flex text-green-800 hover:text-green-900"
              >
                {t.top_banner.search_courses}
                <ArrowRightIcon className="size-5 mt-1 ml-2" />
              </Link>
            </div>
          </div>
          <div className="student-banner relative">
            <div className="student-right-block relative">
              <div
                className="block-left-student text-center absolute bg-white px-8 py-4 shadow-lg rounded-3xl -left-4 top-52"
                data-aos="zoom-in"
              >
                <span className="mx-auto table">
                  <Image
                    src={"/coures.svg"}
                    alt={""}
                    width={32}
                    height={40}
                  ></Image>
                </span>
                <h4 className="font-bold text-green-800 mt-1 text-lg">
                  <LangTra control="value" data={{ value: "8,000+" }} />
                </h4>
                <p className="text-sm text-gray-400 ">
                  {t.top_banner.interactive_courses}
                </p>
              </div>
              <div className="right-image-area">
                <Image
                  className="student-img relative mx-auto"
                  src={"/teacher/2.png"}
                  alt={""}
                  width={450}
                  height={580}
                  quality={100}
                ></Image>
              </div>

              <div
                className="block-right-student text-center absolute bg-gray-100 px-8 py-4 shadow-lg rounded-3xl -right-12 top-32"
                data-aos="zoom-in"
              >
                <h4 className="flex text-green-800 text-md font-bold ml-5">
                  <LangTra control="value" data={{ value: "40000" }} />{" "}
                  {t.top_banner.students}
                  <UserGroupIcon className="size-6 ml-2 mt-0" />
                </h4>
                <p className="flex mt-2 image-students">
                  <Image
                    className="rounded-full shadow-lg object-cover border-4 relative left-2 border-white"
                    src={"/2.png"}
                    alt={""}
                    width={50}
                    height={50}
                  ></Image>
                  <Image
                    className="rounded-full shadow-lg object-cover border-4 border-white"
                    src={"/4.png"}
                    alt={""}
                    width={50}
                    height={50}
                  ></Image>
                  <Image
                    className="rounded-full shadow-lg object-cover border-4 border-white relative right-2 "
                    src={"/3.png"}
                    alt={""}
                    width={50}
                    height={50}
                  ></Image>
                  <label className="leading-9 shadow-lg rounded-full w-12 bg-gray-200 relative right-4 border-4 text-center border-white">
                    +
                  </label>
                </p>
              </div>

              {/* <div
                className="block-right-bottom-student text-center absolute bg-white px-8 py-4 shadow-lg rounded-3xl -right-32 top-80 flex"
                data-aos="zoom-in"
              >
                <span className="leading-9 shadow-lg rounded-full w-12 bg-green-900 relative  text-center border-white right-3 top-3 meaage-banner-icon">
                  <ChatBubbleOvalLeftEllipsisIcon className="size-6 ml-2 mt-3 relative left-1  text-white" />
                </span>
                <div>
                  <h4 className="text-green-800 text-lg font-bold">
                    Congratulations
                  </h4>
                  <p className="text-sm text-gray-400">
                    You have successfylly <br></br>completed this Course
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
