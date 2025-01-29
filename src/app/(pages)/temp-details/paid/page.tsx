import React from "react";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const page = () => {
  return (
    <div className="pl-[290px]">
      <div className="w-full md:w-2/3 pr-7 video-player">
        <div className="lg:mr-30px relative mb-10 lg:mb-0 -mt-8">
          <div className="col-span-2 h-full relative">
            <Image
              className="border-gray-100 border-[8px] min-h-full min-w-full"
              src={"/unpaid-details-banner.png"}
              alt=""
              width={395}
              height={226}
            />
            <PlayIcon className="absolute top-0 bottom-0 left-0 right-0 m-auto size-20 pl-5 p-3 text-[#6DC067] rounded-full bg-[#FFFFFFE5]" />
            <div className="w-full absolute bottom-2 py-3 bg-[#FBFFFE80] flex justify-center items-center gap-4 text-white">
              <ChevronLeftIcon className="size-8 p-1 font-black bg-[#D8DDDB] rounded-full" />
              <ChevronRightIcon className="size-8 p-1 font-black bg-[#7EC079] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
