import Accordion from "@/app/_components/accordion";
import { AccordionModel } from "@/app/lib/accordion";
import {
  BookOpenIcon,
  ClipboardDocumentListIcon,
  LockClosedIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const Syllabus = () => {
  let accordionList: AccordionModel[] = [
    {
      header: (
        <div className="container mx-auto bg-green-800  px-4 py-2 flex gap-x-3 justify-start items-center border border-green-800">
          <div className="bg-green-200 aspect-square rounded-full p-3 w-fit">
            <BookOpenIcon className="size-5 text-white" />
          </div>
          <span className="font-black text-white text-xl mt-1">
            Chapter One
          </span>
        </div>
      ),
      body: (
        <div className="container mx-auto w-full px-8 py-4 flex bg-white justify-start items-start border-x border-green-800">
          <ClipboardDocumentListIcon className="size-8 text-green-800" />
          <div className="ps-2 w-full">
            <div className="flex justify-start items-center gap-2 mb-2">
              <span className="text-xl text-[#807B7B]">
                Chapter 1: Text.....
              </span>
            </div>
            <div className="flex justify-start items-center gap-2 text-xs font-bold mt-3">
              <span className="px-4 py-2 bg-[#F9E3E1] text-[#D66262] rounded-full">
                3 videos
              </span>
              <span className="px-4 py-2 bg-[#E5F8F2] text-[#19A610] rounded-full">
                2 notes
              </span>
              <span className="px-4 py-2 bg-[#F1DEFF] text-[#8F3DCB] rounded-full">
                1 exam
              </span>
            </div>
            <div className="flex flex-col justify-start items-stretch pt-4 text-gray-400 chap-area relative">
              <div className="flex flex-row justify-start items-start py-2 chap-list relative ps-4">
                <div className="basis-1/2 flex items-center gap-2 relative z-10">
                  <PlayCircleIcon className="size-6 text-[#AFCDAD]" />
                  <span className="">Introduction to Bengali</span>
                </div>
                <div className="basis-1/2">
                  <button className="bg-green-200 text-white px-4 py-1 basis-3/12 flex items-center gap-2 rounded-lg">
                    <LockClosedIcon className="size-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-start items-start py-2 chap-list relative  ps-4">
                <div className="basis-1/2 flex items-center gap-2 relative z-10">
                  <PlayCircleIcon className="size-6 text-[#AFCDAD]" />
                  <span className="">Bengali Part 1</span>
                </div>
                <div className="basis-1/2">
                  <button className="bg-green-100 text-green-800 px-4 py-1 basis-3/12 flex items-center gap-2 rounded-lg">
                    <LockClosedIcon className="size-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-start items-start py-2 chap-list relative  ps-4">
                <div className="basis-1/2 flex items-center gap-2 relative z-10">
                  <PlayCircleIcon className="size-6 text-[#AFCDAD]" />
                  <span className="">Bengali Part 2</span>
                </div>
                <div className="basis-1/2">
                  <button className="bg-green-100 text-green-800 px-4 py-1 basis-3/12 flex items-center gap-2 rounded-lg">
                    <LockClosedIcon className="size-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-start items-start py-2 chap-list relative  ps-4">
                <div className="basis-1/2 flex items-center gap-2 relative z-10">
                  <PlayCircleIcon className="size-6 text-[#AFCDAD]" />
                  <span className="">Assessment test</span>
                </div>
                <div className="basis-1/2">
                  <button className="bg-green-100 text-green-800 px-4 py-1 basis-3/12 flex items-center gap-2 rounded-lg">
                    <LockClosedIcon className="size-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-start items-start py-2 chap-list relative  ps-4">
                <div className="basis-1/2 flex items-center gap-2 relative z-10">
                  <PlayCircleIcon className="size-6 text-[#AFCDAD]" />
                  <span className="">Note</span>
                </div>
                <div className="basis-1/2">
                  <button className="bg-green-100 text-green-800 px-4 py-1 basis-3/12 flex items-center gap-2 rounded-lg">
                    <LockClosedIcon className="size-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: (
        <div className="container mx-auto bg-green-100 px-4 py-2 flex gap-x-3 justify-start items-center border border-x-green-800 border-[#c0dbce]">
          <div className="bg-green-200 aspect-square rounded-full p-3 w-fit">
            <BookOpenIcon className="size-5 text-white" />
          </div>
          <span className="font-black text-xl text-green-800 mt-1">
            Chapter Two
          </span>
        </div>
      ),
      body: <div className="w-full border-x border-[#6DC067]"></div>,
    },
    {
      header: (
        <div className="container mx-auto bg-green-100 px-4 py-2 flex gap-x-3 justify-start items-center border-t-0 border border-[#5da058]">
          <div className="bg-green-200 aspect-square rounded-full p-3 w-fit">
            <BookOpenIcon className="size-5 text-white" />
          </div>
          <span className="font-black text-xl text-green-800 mt-1">
            Chapter Three
          </span>
        </div>
      ),
      body: <div className="w-full border-x border-[#6DC067]"></div>,
    },
  ];

  return (
    <div>
      <div className="text-3xl mb-4">Course Details</div>
      <Accordion items={accordionList} init_open={[0]} />
    </div>
  );
};

export default Syllabus;
