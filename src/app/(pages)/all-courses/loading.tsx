import React from "react";
import BecomeTutor from "../../_layout/becomeTutor";
import CourseBanner from "./banner";
import Search from "./search";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { show } from "@/app/_services/api-call";
import CourseCard from "@/app/_components/course-card";
import SerevrPagination from "@/app/_components/server-pagination";

const Loading = async () => {
  return (
    <div className="w-full">
      <div className="col-span-12">
        <CourseBanner />
      </div>
      <div className="container mx-auto px-6 pl-28 pr-28">
        <div className="flex items-top flex-wrap">
          <div className="mt-[-120px] w-full md:w-1/3 pr-14 z-30">
            <div className="flex justify-center">
              <div className="bg-white shadow-md rounded-lg p-4 text-center w-full h-[1550px]">
                <div className="flex justify-between items-center bg-white border border-gray-200 rounded-full pl-3 mt-3 relative"></div>
                <div className="w-full gray-light border border-gray-100 pt-1 pb-3 pl-3 pr-3 mt-3  h-[1420px]">
                  <div className="mt-3">
                    <h4 className="text-2xl font-semibold text-left relative left-categories border-b pb-2 mb-4"></h4>
                    <ul className="list-disc text-gray-600 mt-2"></ul>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-2xl font-semibold text-left relative left-categories border-b pb-2 mb-4"></h4>
                    <ul className="list-disc text-gray-600 mt-2"></ul>
                  </div>
                  <br />

                  <div className="mt-6">
                    <h4 className="text-2xl font-semibold text-left relative left-categories border-b pb-2 mb-4"></h4>
                    <ul className="list-disc text-gray-600 mt-2"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 ">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-12">
              <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
                <div className="overflow-hidden h-40"></div>

                <div className="px-3 py-5">
                  <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3 leading-7"></div>

                  <div className="text-sm text-gray-400 line-clamp-1 mt-4"></div>

                  <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                    <div className="flex flex-col">
                      <div className="text-emerald-900 font-bold"></div>
                    </div>
                    <button className="bg-green-100 text-grren-700 px-6 py-2 rounded-md hover:bg-green-900 hover:text-white"></button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
                <div className="overflow-hidden h-40"></div>

                <div className="px-3 py-5">
                  <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3 leading-7"></div>

                  <div className="text-sm text-gray-400 line-clamp-1 mt-4"></div>

                  <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                    <div className="flex flex-col">
                      <div className="text-emerald-900 font-bold"></div>
                    </div>
                    <button className="bg-green-100 text-grren-700 px-6 py-2 rounded-md hover:bg-green-900 hover:text-white"></button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
                <div className="overflow-hidden h-40"></div>

                <div className="px-3 py-5">
                  <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3 leading-7"></div>

                  <div className="text-sm text-gray-400 line-clamp-1 mt-4"></div>

                  <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                    <div className="flex flex-col">
                      <div className="text-emerald-900 font-bold"></div>
                    </div>
                    <button className="bg-green-100 text-grren-700 px-6 py-2 rounded-md hover:bg-green-900 hover:text-white"></button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
                <div className="overflow-hidden h-40"></div>

                <div className="px-3 py-5">
                  <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3 leading-7"></div>

                  <div className="text-sm text-gray-400 line-clamp-1 mt-4"></div>

                  <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                    <div className="flex flex-col">
                      <div className="text-emerald-900 font-bold"></div>
                    </div>
                    <button className="bg-green-100 text-grren-700 px-6 py-2 rounded-md hover:bg-green-900 hover:text-white"></button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
                <div className="overflow-hidden h-40"></div>

                <div className="px-3 py-5">
                  <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3 leading-7"></div>

                  <div className="text-sm text-gray-400 line-clamp-1 mt-4"></div>

                  <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                    <div className="flex flex-col">
                      <div className="text-emerald-900 font-bold"></div>
                    </div>
                    <button className="bg-green-100 text-grren-700 px-6 py-2 rounded-md hover:bg-green-900 hover:text-white"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
