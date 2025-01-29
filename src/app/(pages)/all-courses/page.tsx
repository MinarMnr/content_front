import React from "react";
import CourseBanner from "./banner";
import Search from "./search";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { show } from "@/app/_services/api-call";
import CourseCard from "@/app/_components/course-card";
import SerevrPagination from "@/app/_components/server-pagination";
import LangTra from "@/app/_components/lang-tra";

const getCourseTypes = async (
  category_id?: string,
  sub_category_id?: string
) => {
  return await show({
    api_key: "COURSE_TYPE_API",
    parameters: {
      page: 1,
      size: -1,
      ...(category_id ? { category_ids: category_id?.split(",") } : {}),
      ...(sub_category_id
        ? { sub_category_ids: sub_category_id?.split(",") }
        : {}),
    },
  }).then((resp: any) => {
    return resp?.data;
  });
};

const getCategories = async (
  course_type_id?: string,
  sub_category_id?: string
) => {
  return await show({
    api_key: "CATEGORY_API",
    parameters: {
      page: 1,
      size: -1,
      ...(course_type_id
        ? { course_type_ids: course_type_id?.split(",") }
        : {}),
      ...(sub_category_id
        ? { sub_category_ids: sub_category_id?.split(",") }
        : {}),
    },
  }).then((resp: any) => {
    return resp?.data;
  });
};

const getSubCategories = async (
  course_type_id?: string,
  category_id?: string
) => {
  return await show({
    api_key: "SUB_CATEGORY_API",
    parameters: {
      page: 1,
      size: -1,
      ...(course_type_id
        ? { course_type_ids: course_type_id?.split(",") }
        : {}),
      ...(category_id ? { category_ids: category_id?.split(",") } : {}),
    },
  }).then((resp: any) => {
    return resp?.data;
  });
};

const getCourses = async (
  params: {
    currentPage: number;
    currentSize: number;
  },
  course_type_id?: string,
  category_id?: string,
  sub_category_id?: string,
  search?: string
) => {
  return await show({
    api_key: "COURSE_API",
    parameters: {
      page: params?.currentPage,
      size: params?.currentSize,
      ...(course_type_id
        ? { course_type_ids: course_type_id?.split(",") }
        : {}),
      ...(category_id ? { category_ids: category_id?.split(",") } : {}),
      ...(sub_category_id
        ? { sub_category_ids: sub_category_id?.split(",") }
        : {}),
      ...(search ? { title: search } : {}),
    },
  }).then((resp: any) => {
    return {
      coursesData: resp?.data,
      currentTotal: resp?.meta?.total,
    };
  });
};

const AllCourses = async () => {
  let currentPage: number = 1;
  let currentSize: number = 9;

  let full_params: string | null = decodeURIComponent(
    (await headers()).get("x-current-params") ?? ""
  );
  let str_params: string | null = full_params;

  let otherSearch: string | undefined = str_params?.replace(
    /page\=\d+\&|page\=\d+|size\=\d+\&|size\=\d+/g,
    ""
  );

  if (
    /page\=\d+/g.test(str_params ? str_params : "") &&
    /size\=\d+/g.test(str_params ? str_params : "")
  ) {
    currentPage = Number(str_params?.match(/(?<=page\=)\d+/)?.[0]);
    currentSize = Number(str_params?.match(/(?<=size\=)\d+/)?.[0]);
  } else {
    return redirect(
      `/all-courses${otherSearch ? otherSearch : "?"}page=1&size=9`
    );
  }

  let search_text: string | undefined = otherSearch?.match(
    /(?<=\?search\=)[^\&]+|(?<=\&search\=)[^\&]+|(?<=\?search\=)(.*?)+$|(?<=\&search\=)(.*?)+$/
  )?.[0];
  let course_type_id: string | undefined = otherSearch?.match(
    /(?<=\?course_type_id\=)[^\&]+|(?<=\&course_type_id\=)[^\&]+|(?<=\?course_type_id\=)(.*?)+$|(?<=\&course_type_id\=)(.*?)+$/
  )?.[0];
  let category_id: string | undefined = otherSearch?.match(
    /(?<=\?category_id\=)[^\&]+|(?<=\&category_id\=)[^\&]+|(?<=\?category_id\=)(.*?)+$|(?<=\&category_id\=)(.*?)+$/
  )?.[0];
  let sub_category_id: string | undefined = otherSearch?.match(
    /(?<=\?sub_category_id\=)[^\&]+|(?<=\&sub_category_id\=)[^\&]+|(?<=\?sub_category_id\=)(.*?)+$|(?<=\&sub_category_id\=)(.*?)+$/
  )?.[0];

  const [
    categoryTypeData,
    categoryData,
    subCategoryData,
    { coursesData, currentTotal },
  ] = await Promise.all([
    getCourseTypes(category_id, sub_category_id),
    getCategories(course_type_id, sub_category_id),
    getSubCategories(course_type_id, category_id),
    getCourses(
      { currentPage, currentSize },
      course_type_id,
      category_id,
      sub_category_id,
      search_text
    ),
  ]);

  return (
    <div className="w-full">
      <div className="col-span-12">
        <CourseBanner />
      </div>
      <div className="container mx-auto px-6 pl-28 pr-28 container-responsive">
        <div className="flex items-top flex-wrap">
          <Search
            categoryTypeData={categoryTypeData}
            categoryData={categoryData}
            subCategoryData={subCategoryData}
            search={full_params}
            course_type_id={course_type_id}
            category_id={category_id}
            sub_category_id={sub_category_id}
          />
          <div className="md:w-2/3 ">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-12">
              {coursesData?.map((tada: any, index: number) => (
                <CourseCard key={index} data={tada} />
              ))}
              {Math.ceil(currentTotal / currentSize) ? (
                <SerevrPagination
                  parent_route={"/all-courses"}
                  currentTotal={currentTotal}
                  max_page={7}
                />
              ) : (
                <div className="col-span-3 text-center text-3xl text-red-400">
                  <LangTra control={'all_courses.no_course'} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
