import { StarIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div
      className={`relative float-right buy-card flex flex-col justify-start items-stretch bg-white z-[1] border border-[#EBEBEB] navbar`}
    >
      <Image
        className="border-x-4 border-t-4 border-white w-full course-image-thum"
        src={"/course2.avif"}
        alt=""
        width={300}
        height={226}
      />
      <label className="absolute inset-x-0 mx-auto d-b w-10 h-10  block top-24">
        <PlayCircleIcon className="text-white size-12" />
      </label>
      <div className="py-4 px-8">
        <div className="w-full border-b-2 border-dashed  border-[#a3bea1] grid grid-cols-2 gap-y-2 pb-4">
          <div className="text-2xl font-bold">Bangla 1st Paper</div>
          <div className="pl-10 flex">
            <StarIcon className="size-5 text-orange-600" />
            <StarIcon className="size-5 text-orange-600" />
            <StarIcon className="size-5 text-orange-600" />
            <StarIcon className="size-5 text-orange-600" />
            <StarIcon className="size-5 text-gray-400" />
            <label>(4)</label>
          </div>
          <div className="text-[#BFBFBF]">Bangla 1st Paper | Class -6</div>
          <div className="text-2xl text-green-700 font-bold pl-10">
            {" "}
            800.00 Tk
          </div>
        </div>
        <div className="grid grid-cols-2 place-content-between gap-x-6 gap-y-4 pt-4">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#cdffee] text-green-700 " />{" "}
            <span className="pt-3">
              {" "}
              Topic <br />
              <span className="text-green-700">11</span>{" "}
            </span>{" "}
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#E3F6FE] text-[#03A9F4]" />{" "}
            <span className="pt-3">
              {" "}
              Lessons <br />
              <span className="text-teal-500">18</span>{" "}
            </span>{" "}
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#FCEDEC] text-[#E23A31]" />{" "}
            <span className="pt-3">
              {" "}
              Video Lecture <br />
              <span className="text-red-500">28</span>{" "}
            </span>{" "}
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#F8EFFF] text-[#B95FFD]" />{" "}
            <span className="pt-3">
              {" "}
              Files <br />
              <span className="text-purple-600">28</span>{" "}
            </span>{" "}
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#F5FCEC] text-[#9ADE45]" />{" "}
            <span className="pt-3">
              {" "}
              Exam <br />
              <span className="text-lime-600">12</span>{" "}
            </span>{" "}
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#FEF7E8] text-[#F7B320]" />{" "}
            <span className="pt-3">
              {" "}
              Duration <br />
              <span className="text-yellow-500">365 Days</span>{" "}
            </span>{" "}
          </div>
        </div>
        <button className="px-12 mt-6 py-3 bg-green-700 rounded-full w-full   text-center text-white hover:bg-green-600">
          {" "}
          Buy Now{" "}
        </button>
      </div>
    </div>
  );
};

export default page;
