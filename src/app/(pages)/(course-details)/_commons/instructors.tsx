import { Instructors as instructorModel } from "@/app/lib/instructors";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LangTra from "@/app/_components/lang-tra";

const Instructors = ({ instructors }: { instructors: any[] }) => {
  return (
    <div className="bg-[#F5FAF9]  rounded-xl pt-6 p-3 mt-6">
      <div className="text-3xl font-semibold mb-6">
        <LangTra control="course_details.course_instructor" />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {instructors?.map((tada: instructorModel, i: number) => (
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
              <span className="text-xl line-clamp-1">
                {tada?.user?.name_en}
              </span>
              <span className="text-md line-clamp-2 text-[#959595] font-normal">
                {tada?.type}
              </span>
              <span className="text-base line-clamp-2 mb-2 text-[#959595]">
                {tada?.user?.email}
              </span>
              <Link
                href={`/instructors/${tada?.id}`}
                className="bg-green-800 text-white w-fit px-6 py-2 rounded-md text-sm"
              >
                <LangTra control="course_details.inst_profile" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
