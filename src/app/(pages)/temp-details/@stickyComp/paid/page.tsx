import { PlayIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="relative play-list float-right">
      <div className="flex flex-col justify-start items-stretch h-full">
        <div className="bg-[#E0E2DF] text-green-800  pl-5 py-3 text-xl font-bold">
          Playlist
        </div>
        <div className="p-4 w-full bg-[#F5FAF9] rounded-b-xl grow">
          <div className="bg-[#312E2E] flex flex-col justify-start items-stretch p-4 gap-y-2 h-97 overflow-x-auto scrool_ber">
            <div>
              <p className="text-white text-xl font-bold">Chapter One</p>
              <div className="text-[#f09d61] flex items-center">
                <ClipboardDocumentIcon className="size-4" />
                <span>3 Videos</span>
              </div>
            </div>
            <Link href={`/temp-details/paid/1`}>
              <div className="flex items-center bg-[#DFE0DF] px-3 py-4 rounded-lg gap-x-2 border-l-[4px] border-[#F1A753]">
                <PlayIcon className="size-7 p-2 bg-[#F2A043E5] text-white rounded-full" />
                <div className="grow font-bold">1. Introduction to Bengali</div>
                <span className="text-[#DB2D29]">3:20 Hours</span>
              </div>
            </Link>
            <Link href={`/temp-details/paid/2`}>
              <div className="flex items-center bg-[#DFE0DF] px-3 py-4 rounded-lg gap-x-2">
                <PlayIcon className="size-7 p-2 bg-[#BAB7B4E5] text-white rounded-full" />
                <div className="grow font-bold">2. Bengali Part 1</div>
                <span className="text-[#DB2D29]">4:20 Hours</span>
              </div>
            </Link>
            <Link href={`/temp-details/paid/3`}>
              <div className="flex items-center bg-[#DFE0DF] px-3 py-4 rounded-lg gap-x-2">
                <PlayIcon className="size-7 p-2 bg-[#BAB7B4E5] text-white rounded-full" />
                <div className="grow font-bold">3. Bengali Part 2</div>
                <span className="text-[#DB2D29]">3:00 Hours</span>
              </div>
            </Link>
            <Link href={`/temp-details/paid/4`}>
              <div className="flex items-center bg-[#DFE0DF] px-3 py-4 rounded-lg gap-x-2">
                <PlayIcon className="size-7 p-2 bg-[#BAB7B4E5] text-white rounded-full" />
                <div className="grow font-bold">4. Bengali part 3</div>
                <span className="text-[#DB2D29]">3:00 Hours</span>
              </div>
            </Link>
            <Link href={`/temp-details/paid/5`}>
              <div className="flex items-center bg-[#DFE0DF] px-3 py-4 rounded-lg gap-x-2">
                <PlayIcon className="size-7 p-2 bg-[#BAB7B4E5] text-white rounded-full" />
                <div className="grow font-bold">5. Bengali part 4</div>
                <span className="text-[#DB2D29]">3:00 Hours</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
