import { Instructors as instructorModel } from "@/app/lib/instructors";
import React from "react";
import Image from "next/image";

const Instructors = () => {
  let instructorList: instructorModel[] = [
    {
      name: "Sabrina Monsur",
      institute: "Dhaka University",
      course: "English",
    },
    {
      name: "Shariful Islam Shuvo",
      institute: "Dhaka University",
      course: "Bangla",
    },
    {
      name: "Dr Arman Hossain Rony",
      institute: "Dhaka University",
      course: "English",
    },
    {
      name: "Sabrina Monsur",
      institute: "Dhaka University",
      course: "Chemistry",
    },
    {
      name: "Shariful Islam Shuvo",
      institute: "Dhaka University",
      course: "Chemistry",
    },
    {
      name: "Dr Arman Hossain Rony",
      institute: "Dhaka University",
      course: "Bangla",
    },
  ];

  return (
    <div className="bg-[#F5FAF9] p-6 py-8 rounded-xl">
      <div className="text-3xl mb-6">Course Instructors</div>
      <div className="grid grid-cols-2 gap-4">
        {instructorList?.map((tada: instructorModel, i: number) => (
          <div
            key={i}
            className="p-4 bg-white shadow-gray-800 shadow-all rounded-md flex flex-row gap-[32px] items-center"
          >
            <div className="w-[94px] p-0 rounded-full aspect-square border border-green-800 overflow-hidden">
              <Image
                src={"/teacher/1.png"}
                alt=""
                width={954}
                height={500}
                className="object-cover object-center min-w-full min-h-full"
              />
            </div>
            <div className="basis-2/3 flex flex-col justify-center">
              <span className="text-xl line-clamp-1">{tada.name}</span>
              <span className="text-md line-clamp-2 text-[#959595] font-normal">
                {tada.institute}
              </span>
              <span className="text-base line-clamp-2 mb-2 text-[#959595]">
                {tada.course}
              </span>
              <button className="bg-green-800 text-white w-fit px-6 py-2 rounded-md text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
