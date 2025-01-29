"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
import LangTra from "@/app/_components/lang-tra";
const TopTutors = ({ ...props }: any) => {
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
      items: 4,
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
    <div className="bg-gray-50 mt-5 border-t border-gray-t">
      <div className="container m-auto">
        <div
          {...props}
          className={`py-5 grid grid-cols-1 pb-10 slder-all-block container m-auto ps-16 pe-16 ${props?.className}`}
        >
          {/* <div className="text-green-800 text-center mt-5 pt-5">Top Tutors</div> */}
          <div className="text-3xl font-bold text-center">
            {t.home_top_tutor.explore_top_tutor}
          </div>
          <div className="flex mx-auto pl-28 pr-28 container flex-col justify-start items-center">
            <Carousel
              className="w-full carousel-list border-color-0 mt-5"
              responsive={responsive}
            >
              {props?.tutors?.map((tada: any, index: number) => (
                <div
                  key={index}
                  className="mx-auto mt-4 flex-[0_0_256px] group bg-white p-4 shadow-sm rounded-md"
                  style={{
                    background: "#fff",
                    maxWidth: "fit-content",
                    position: "relative",
                    transition: "transform .3s ease-in-out",
                    zIndex: 2,
                  }}
                >
                  <Link href={`all-instructors/${tada?.id}`} target="_blank">
                    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white text-[0]">
                      <div
                        className="h-[256px] w-[256px] opacity-0 transition-opacity duration-300 ease-in-out"
                        style={{ fontSize: "0px", opacity: "1" }}
                      >
                        {tada?.profile_image ? (
                          <Image
                            src={tada?.profile_image}
                            alt={"instructor"}
                            width={500}
                            height={500}
                          />
                        ) : null}
                      </div>
                      <div
                        className="p-4 text-center text-white"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, transparent, rgba(0, 0, 0, .8))",
                          bottom: 0,
                          height: "100%",
                          position: "absolute",
                          width: "100%",
                        }}
                      >
                        <div className="w-full transition-all duration-300 ease-in-out group-hover:bottom-0 absolute bottom-[-36px] left-0 pb-4">
                          <div className="name-title p-2">
                            <h3 className="mb-1 text-lg font-bold">
                              {tada?.name_en}
                            </h3>

                            <div className="text-sm text-gray-100 line-clamp-1 mt-0">
                              {tada?.email}
                            </div>
                          </div>
                          <button className="inline-block  bg-green-700 border rounded-full border-green-600 px-4 py-2 text-sm text-white opacity-0 group-hover:opacity-100 hover:bg-green-600 transition-opacity duration-300 ease-in-out">
                            <LangTra control="profile.profile" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
            <div className="w-full md:w-3/3 text-center">
              <button className="mt-12 px-12  mx-auto text-green-800 border py-2 border-color-none hover:border-solid hover:border hover:border-green-800 rounded-full ">
                <Link href="/all-instructors" className="flex items-center">
                  {t.home_top_tutor.view_all_tutor}
                  <ArrowLongRightIcon className="size-7 ml-1  relative" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTutors;
