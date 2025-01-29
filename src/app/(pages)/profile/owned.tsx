import CourseCard from "@/app/_components/course-card";
import LangTra from "@/app/_components/lang-tra";
import SerevrPagination from "@/app/_components/server-pagination";
import { show } from "@/app/_services/api-call";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Owned = async () => {
  let registered_courses: any[] = [];
  let owned_courses: any[] = [];

  let full_params: string | null = decodeURIComponent(
    (await headers()).get("x-current-params") ?? ""
  );
  let str_params: string | null = full_params;

  let r_currentPage: number = 1;
  let r_currentSize: number = 9;
  let r_currentTotal: number = 0;

  let o_currentPage: number = 1;
  let o_currentSize: number = 9;
  let o_currentTotal: number = 0;

  if (
    /rpage\=\d+/g.test(str_params ? str_params : "") &&
    /rsize\=\d+/g.test(str_params ? str_params : "") &&
    /opage\=\d+/g.test(str_params ? str_params : "") &&
    /osize\=\d+/g.test(str_params ? str_params : "")
  ) {
    r_currentPage = Number(str_params?.match(/(?<=rpage\=)\d+/)?.[0]);
    r_currentSize = Number(str_params?.match(/(?<=rsize\=)\d+/)?.[0]);
    o_currentPage = Number(str_params?.match(/(?<=opage\=)\d+/)?.[0]);
    o_currentSize = Number(str_params?.match(/(?<=osize\=)\d+/)?.[0]);
  } else {
    return redirect(`/profile?segment=owned&rpage=1&rsize=9&opage=1&osize=9`);
  }

  await show({
    api_key: "USER_ENROLLED_COURSE_API",
    parameters: {
      page: r_currentPage,
      size: r_currentSize,
    },
  }).then((resp: any) => {
    if (resp?.status === "success") {
      registered_courses = resp?.data;
      r_currentTotal = resp?.meta?.total;
    } else {
      registered_courses = [];
      r_currentTotal = 0;
    }
  });

  await show({
    api_key: "",
    parameters: {
      page: o_currentPage,
      size: o_currentSize,
    },
  }).then((resp: any) => {
    if (resp?.status === "success") {
      owned_courses = resp?.data;
      o_currentTotal = resp?.meta?.total;
    } else {
      owned_courses = [];
      o_currentTotal = 0;
    }
  });

  return (
    <div className="flex flex-col justify-start items-stretch">
      <div className="text-3xl  border-l-4 border-green-700 ps-3 mb-5">
        {" "}
        <LangTra control="profile.enrl_purs_course" />
      </div>
      <div className="grid grid-cols-4 pt-2 pb-6 gap-6">
        {registered_courses?.map((tada: any, index: number) => (
          <CourseCard data={tada} key={index} />
        ))}
      </div>
      {r_currentTotal ? (
        <SerevrPagination
          parent_route={"/profile"}
          extension="r"
          currentTotal={r_currentTotal}
          max_page={7}
        />
      ) : (
        <div className="col-span-3 text-center text-xl py-5 text-red-400">
          <LangTra control="profile.no_enrl_purs" />
        </div>
      )}
      <div className="text-3xl  border-l-4 border-green-700 ps-3 mb-5">
        {" "}
        <LangTra control="profile.contri_courses" />
      </div>
      <div className="grid grid-cols-4 pt-2 pb-6 gap-6">
        {owned_courses?.map((tada: any, index: number) => (
          <CourseCard data={tada} key={index} />
        ))}
      </div>
      {o_currentTotal ? (
        <SerevrPagination
          parent_route={"/profile"}
          extension="o"
          currentTotal={o_currentTotal}
          max_page={7}
        />
      ) : (
        <div className="col-span-3 text-center text-xl py-5 text-red-400">
          <LangTra control="profile.no_contr" />
        </div>
      )}
    </div>
  );
};

export default Owned;
