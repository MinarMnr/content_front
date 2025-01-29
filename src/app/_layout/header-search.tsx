"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import Input from "../_components/input";
import { show } from "../_services/api-call";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const HeaderSearch = () => {
  const { language } = useLanguage();
  const t: any = translations[language];

  const [search_text, setSearchText] = useState<string>("");
  const [search_result, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    if (search_text) {
      show({
        api_key: "GLOBAL_SEARCH_API",
        parameters: {
          query_string: search_text,
        },
      }).then((resp: any) => {
        if (resp?.status === "success") {
          setSearchResult(resp?.data);
        }
      });
    } else {
      search_text == "" && setSearchResult([]);
    }
  }, [search_text]);

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", (e) => {
      if ((e?.target as HTMLInputElement)?.id !== "header-main-search") {
        setSearchResult([]);
      }
    });
  }, []);
  const resultFound =
    search_result.length > 0 &&
    search_result.some((item) => item.estimatedTotalHits > 0)
      ? 1
      : 0;

  const [textPlaceHolder, setTextPlaceHolder] = useState("");
  const list = [
    "courses",
    "instructors",
    "e_books",
    "skill_courses",
  ];

  useEffect(() => {
    if (search_text == "") {
      let i = 0;
      const interval = setInterval(() => {
        setTextPlaceHolder(`${t.header?.[list[i]]}`);
        i = (i + 1) % list.length;
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [language]);

  return (
    <div className="search-header relative">
      <MagnifyingGlassIcon className="size-5 mr-1  search-h relative z-40 text-gray-400" />
      <Input
        id="header-main-search"
        type="search"
        label="Search"
        placeholder={`${textPlaceHolder}`}
        className={"h-10 ps-3 pe-4 rounded-full"}
        data={search_text}
        setData={setSearchText}
      ></Input>
      {resultFound > 0 ? (
        <div className="absolute bg-white max-h-80 overflow-y-auto flex flex-col justify-start items-stretch z-50 p-2 border border-double border-[#ebebeb] ml-[15px] border-t-[0px]">
          {search_result?.map((item: any, t_i: number) => (
            <div key={`search_result_${t_i}`}>
              <div className="flex flex-col justify-start items-stretch ps-3">
                {item?.hits?.length > 0 &&
                  item?.hits?.map((data: any, b_i: number) => (
                    <Link
                      key={`search_result_${t_i}_${b_i}`}
                      href={
                        item?.indexUid === "courses"
                          ? `/unpaid/${data?.url_slug}`
                          : item?.indexUid === "users"
                          ? `/`
                          : item?.indexUid === "course_modules"
                          ? `/unpaid/${data?.course_url_slug}#details`
                          : item?.indexUid === "ebooks"
                          ? `/all-ebooks?page=1&size=9&search=${search_text}`
                          : "#"
                      }
                    >
                      <div className="block cursor-pointer px-5 py-1.5 hover:bg-[#F3F4F6]">
                        <div className="flex items-center justify-start gap-3">
                          <span className="rounded">
                            <div className="transition-opacity duration-300 ease-in-out">
                              <img
                                alt="image"
                                data-original-src={`${
                                  data?.course_thumbnail_url
                                    ? `${data.course_thumbnail_url}`
                                    : data?.ebook_thumbnail_url
                                    ? `${data.ebook_thumbnail_url}`
                                    : null
                                }`}
                                draggable="false"
                                loading="lazy"
                                width="42"
                                height="42"
                                decoding="async"
                                data-nimg="1"
                                className=""
                                src={`${
                                  data?.course_thumbnail_url
                                    ? `${data.course_thumbnail_url}?w=42&h=42`
                                    : data?.ebook_thumbnail_url
                                    ? `${data.ebook_thumbnail_url}?w=42&h=42`
                                    : null
                                }`}
                              />
                            </div>
                          </span>
                          <div className="flex flex-col min-w-0 gap-2">
                            <div className="flex flex-row gap-1">
                              <div className="line-clamp-1 truncate text-sm font-semibold leading-[22px] text-[#111827] ">
                                {item?.indexUid === "courses"
                                  ? data?.title
                                  : item?.indexUid === "users"
                                  ? `Instructor`
                                  : item?.indexUid === "course_modules"
                                  ? data?.course_title
                                  : item?.indexUid === "ebooks" && data?.title}
                              </div>
                            </div>
                            <div className="line-clamp-1  truncate text-xs font-normal leading-[16px] text-[#4B5563]">
                              {item?.indexUid === "courses"
                                ? `${data?.category_title_en} | Course`
                                : item?.indexUid === "users"
                                ? `Instructor matched`
                                : item?.indexUid === "course_modules"
                                ? "Course Content"
                                : item?.indexUid === "ebooks" &&
                                  `${data?.category_title_en} | Ebook`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HeaderSearch;
