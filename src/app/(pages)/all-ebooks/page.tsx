import React from "react";
import EbookBanner from "./banner";
import Search from "./search";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { show } from "@/app/_services/api-call";
import SerevrPagination from "@/app/_components/server-pagination";
import Image from "next/image";
import { getFIleUrl } from "@/app/_services/modifier";
import Link from "next/link";
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
    api_key: "EBOOK_API",
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
      `/all-ebooks${otherSearch ? otherSearch : "?"}page=1&size=9`
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
        <EbookBanner />
      </div>
      <div className="container mx-auto px-6 pl-28 pr-28">
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
              {coursesData?.map((data: any, index: number) => (
                // <CourseCard key={index} data={tada} />
                <div
                  className="border-2 border-gray-100 border-solid p-1 rounded-md"
                  key={index}
                >
                  <Link href={data?.document?.url} target="_blank">
                    <div className="overflow-hidden h-40">
                      <Image
                        src={getFIleUrl(data?.thumbnail?.path, true)}
                        alt={""}
                        width={500}
                        height={500}
                      />
                    </div>

                    <div className="px-3 py-3">
                      <div className="tracking-wide text font-bold text-gray-500 h-14 line-clamp-3 leading-7">
                        {data?.title}
                      </div>

                      <div className="text-sm text-gray-400 line-clamp-1 mt-1">
                        <LangTra control="sub_category.title_en" data={data} />{" "}
                        | <LangTra control="category.title_en" data={data} />
                      </div>

                      <div className="flex md:flex-row flex-col justify-between items-center pt-2 border-t border-dashed mt-2">
                        <button
                          // onClick={clickHandle}
                          className="bg-green-100 text-grren-700 px-6 py-2  rounded-full hover:bg-green-900 hover:text-green"
                        >
                          <LangTra control="all_ebook.read" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              {Math.ceil(currentTotal / currentSize) ? (
                <SerevrPagination
                  parent_route={"/all-ebooks"}
                  currentTotal={currentTotal}
                  max_page={7}
                />
              ) : (
                <div className="col-span-3 text-center text-3xl text-red-400">
                  <LangTra control="all_courses.no_course" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-span-12">
        <BecomeTutor />
      </div> */}
    </div>
  );
};

export default AllCourses;
