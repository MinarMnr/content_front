import React from "react";
import TextSearch from "./text-search";
import Link from "next/link";
import LangTra from "@/app/_components/lang-tra";

const Search = () => {
  return (
    <div className="mt-[-120px] w-full md:w-1/3 pr-14 z-30">
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-4 text-center w-full h-[1550px]">
          <Link
            href={"/all-instructors"}
            className="block text-center py-3 bg-red-400 text-white w-full"
          >
            <LangTra control="all_courses.reset" />
          </Link>
          <div className="flex justify-between items-center bg-white border border-gray-200 rounded-full pl-3 mt-3 relative">
            <TextSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
