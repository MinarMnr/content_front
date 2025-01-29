import React from "react";
import Search from "./search";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { show } from "@/app/_services/api-call";
import SerevrPagination from "@/app/_components/server-pagination";
import InstructorsBanner from "./banner";
import TeacherCard from "@/app/_components/teacher-card";

const getAllInstructors = async (
  params: {
    currentPage: number;
    currentSize: number;
  },
  search?: string
) => {
  return await show({
    api_key: "INSTRUCTOR_API",
    parameters: {
      page: params?.currentPage,
      size: params?.currentSize,
      ...(search ? { search: search } : {}),
    },
  }).then((resp: any) => {
    return {
      instructorsData: resp?.data,
      currentTotal: resp?.meta?.total,
    };
  });
};

const AllInstructors = async () => {
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
      `/all-instructors${otherSearch ? otherSearch : "?"}page=1&size=9`
    );
  }

  let search_text: string | undefined = otherSearch?.match(
    /(?<=\?search\=)[^\&]+|(?<=\&search\=)[^\&]+|(?<=\?search\=)(.*?)+$|(?<=\&search\=)(.*?)+$/
  )?.[0];

  const [{ instructorsData, currentTotal }] = await Promise.all([
    getAllInstructors({ currentPage, currentSize }, search_text),
  ]);

  return (
    <div className="w-full">
      <div className="col-span-12">
        <InstructorsBanner />
      </div>
      <div className="search-ins">
        <Search />
      </div>
      <div className="container mx-auto px-6 pl-28 pr-28">
        <div className="flex items-top flex-wrap">
       
          <div className="md:w-3/3 mb-12 ins-list">
            <div className="grid md:grid-cols-5 grid-cols-1 gap-4 mt-0">
              {instructorsData?.map((data: any, index: number) => (
                <TeacherCard parent="all-instructors" data={data} key={index} />
              ))}
              <div className="md:col-span-5 col-span-1">
                {Math.ceil(currentTotal / currentSize) ? (
                  <SerevrPagination
                    parent_route={"/all-instructors"}
                    currentTotal={currentTotal}
                    max_page={7}
                  />
                ) : (
                  <div className="col-span-3 text-center text-3xl text-red-400">
                    No Data Available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllInstructors;
