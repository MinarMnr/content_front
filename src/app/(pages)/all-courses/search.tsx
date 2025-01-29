import React from "react";
import TextSearch from "./text-search";
import Link from "next/link";
import LangTra from "@/app/_components/lang-tra";

const Search = ({
  search,
  categoryTypeData,
  categoryData,
  subCategoryData,
  course_type_id,
  category_id,
  sub_category_id,
}: {
  search: string | null;
  categoryTypeData: any[];
  categoryData: any[];
  subCategoryData: any[];
  course_type_id: string | undefined;
  category_id: string | undefined;
  sub_category_id: string | undefined;
}) => {
  let params_without_course_type: string | undefined = search
    ?.replace(
      new RegExp(
        `course_type_id=${course_type_id}&|&course_type_id=${course_type_id}`
      ),
      ""
    )
    ?.replace(/(?<=page\=)\d+/, "1")
    ?.replace(/(?<=size\=)\d+/, "9");

  let params_without_category: string | undefined = search
    ?.replace(
      new RegExp(`category_id=${category_id}&|&category_id=${category_id}`),
      ""
    )
    ?.replace(/(?<=page\=)\d+/, "1")
    ?.replace(/(?<=size\=)\d+/, "9");

  let params_without_sub_category: string | undefined = search
    ?.replace(
      new RegExp(
        `sub_category_id=${sub_category_id}&|&sub_category_id=${sub_category_id}`
      ),
      ""
    )
    ?.replace(/(?<=page\=)\d+/, "1")
    ?.replace(/(?<=size\=)\d+/, "9");

  let params_without_search_text: string | undefined = search?.replace(
    /search\=[^&]+\&|\&search\=[^&]+/,
    ""
  );

  return (
    <div className="mt-[-120px] w-full md:w-1/3 pr-14 z-30 padd-r-res mb-5 pb-5">
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-4 text-center w-full h-[1580px]">
          <Link
            href={"/all-courses"}
            className="block text-center py-3 bg-red-400 text-white w-full rounded-full"
          >
            <LangTra control={"all_courses.reset"} />
          </Link>
          <div className="flex justify-between items-center bg-white border border-gray-200 rounded-full pl-3 mt-3 relative">
            <TextSearch additional_search={params_without_search_text} />
          </div>
          <div className="w-full gray-light border border-gray-100 pt-1 pb-3 pl-3 pr-3 mt-3  h-[1420px]">
            <div className="mt-3">
              <h4 className="text-2xl font-semibold text-gray-800 text-left relative left-categories border-b pb-2 mb-4">
                <LangTra control={"all_courses.course_type"} />
              </h4>
              <ul className="list-disc text-gray-600 mt-2">
                {categoryTypeData?.map((item: any) => {
                  let course_type_rex: RegExp = new RegExp(
                    `^${item?.id}$|^${item?.id}\,|\,${item?.id}$|\,${item?.id}\,`
                  );
                  let course_type_checked: boolean = course_type_rex?.test(
                    course_type_id ?? ""
                  );
                  let course_type_route: string | undefined =
                    course_type_checked
                      ? `${course_type_id?.replace(course_type_rex, (match) =>
                          match?.startsWith(",") && match?.endsWith(",")
                            ? ","
                            : ""
                        )}`
                      : `${
                          course_type_id
                            ? `${course_type_id},${item?.id}`
                            : `${item?.id}`
                        }`;
                  return (
                    <li className="flex items-center mb-1" key={item?.id}>
                      <Link
                        href={`/all-courses${params_without_course_type}${
                          course_type_route
                            ? `&course_type_id=${course_type_route}`
                            : ""
                        }`}
                      >
                        <input
                          type={"checkbox"}
                          className={
                            "mr-2 size-4 bg-transparent outline-none border-green-500"
                          }
                          checked={course_type_checked}
                          readOnly
                        />
                        <LangTra data={item} control={"title_en"} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-gray-800 text-left relative left-categories border-b pb-2 mb-4">
                <LangTra control={"all_courses.category"} />
              </h4>
              <ul className="list-disc text-gray-600 mt-2">
                {categoryData?.map((item: any) => {
                  let category_rex: RegExp = new RegExp(
                    `^${item?.id}$|^${item?.id}\,|\,${item?.id}$|\,${item?.id}\,`
                  );
                  let category_checked: boolean = category_rex?.test(
                    category_id ?? ""
                  );
                  let category_route: string | undefined = category_checked
                    ? `${category_id?.replace(category_rex, (match) =>
                        match?.startsWith(",") && match?.endsWith(",")
                          ? ","
                          : ""
                      )}`
                    : `${
                        category_id
                          ? `${category_id},${item?.id}`
                          : `${item?.id}`
                      }`;
                  return (
                    <li className="flex items-center mb-1" key={item?.id}>
                      <Link
                        href={`/all-courses${params_without_category}${
                          category_route ? `&category_id=${category_route}` : ""
                        }`}
                      >
                        <input
                          type={"checkbox"}
                          className={
                            "mr-2 size-4 bg-transparent outline-none border-green-500"
                          }
                          checked={category_checked}
                          readOnly
                        />
                        <LangTra data={item} control={"title_en"} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <br />

            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-gray-800 text-left relative left-categories border-b pb-2 mb-4">
                <LangTra control={"all_courses.sub_cat"} />
              </h4>
              <ul className="list-disc text-gray-600 mt-2">
                {subCategoryData?.map((item: any) => {
                  let sub_category_rex: RegExp = new RegExp(
                    `^${item?.id}$|^${item?.id}\,|\,${item?.id}$|\,${item?.id}\,`
                  );
                  let sub_category_checked: boolean = sub_category_rex?.test(
                    sub_category_id ?? ""
                  );
                  let sub_category_route: string | undefined =
                    sub_category_checked
                      ? `${sub_category_id?.replace(sub_category_rex, (match) =>
                          match?.startsWith(",") && match?.endsWith(",")
                            ? ","
                            : ""
                        )}`
                      : `${
                          sub_category_id
                            ? `${sub_category_id},${item?.id}`
                            : `${item?.id}`
                        }`;
                  return (
                    <li className="flex items-center mb-1" key={item?.id}>
                      <Link
                        href={`/all-courses${params_without_sub_category}${
                          sub_category_route
                            ? `&sub_category_id=${sub_category_route}`
                            : ""
                        }`}
                      >
                        <input
                          type={"checkbox"}
                          className={
                            "mr-2 size-4 bg-transparent outline-none border-green-500"
                          }
                          checked={sub_category_checked}
                          readOnly
                        />
                        <LangTra data={item} control={"title_en"} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
