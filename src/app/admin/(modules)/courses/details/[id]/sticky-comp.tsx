import React from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import VideoPlayer from "../../_course_reuse/video-player";
import Rating from "@/app/_components/rating";

const StickyComp = ({ data }: { data: any }) => {
  return (
    <div className="w-full flex flex-col justify-start items-stretch">
      <div className="border-x-4 border-t-4 border-white w-full course-image-thum">
        <VideoPlayer video_list={data?.course_trailers} />
      </div>
      <div className="py-4 px-8">
        <div className="w-full border-b-2 border-dashed  border-[#a3bea1] grid grid-cols-2 gap-y-2 pb-4">
          <div className="text-xl font-bold">{data?.title}</div>
          <div className="pl-10 flex">
            <Rating rating={Number(data?.rating_point_avg)} />
          </div>
          <div className="text-[#BFBFBF]">
            {data?.sub_category?.title_en} | {data?.category?.title_en}
          </div>
          <div className="text-2xl text-green-700 font-bold pl-10">
            {data?.fee ? `${Number(data?.fee)?.toFixed(2)} Tk` : "Free"}
            {data?.discount && data?.discount_type ? (
              <span className="text-red-300">
                ({-Number(data?.discount)?.toFixed(2)}
                {data?.discount_type === "Fixed" ? " /=" : " %"})
              </span>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-2 place-content-between gap-x-6 gap-y-4 pt-4">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#cdffee] text-green-700 " />
            <span className="pt-3">
              Topic <br />
              <span className="text-green-700">
                {" "}
                {data?.course_modules_count ?? 0}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#E3F6FE] text-[#03A9F4]" />
            <span className="pt-3">
              Lessons <br />
              <span className="text-teal-500">
                {" "}
                {data?.module_contents_count ?? 0}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#FCEDEC] text-[#E23A31]" />
            <span className="pt-3">
              Audio/Video <br />
              <span className="text-red-500">
                {data?.audio_video_contents_count ?? 0}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#F8EFFF] text-[#B95FFD]" />
            <span className="pt-3">
              Articles <br />
              <span className="text-purple-600">
                {" "}
                {data?.document_contents_count ?? 0}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#F5FCEC] text-[#9ADE45]" />
            <span className="pt-3">
              Exercises <br />
              <span className="text-lime-600">
                {" "}
                {data?.exam_contents_count ?? 0}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#FEF7E8] text-[#F7B320]" />
            <span className="pt-3">
              Duration <br />
              <span className="text-yellow-500">
                {" "}
                {data?.duration_sum ?? 0}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyComp;
