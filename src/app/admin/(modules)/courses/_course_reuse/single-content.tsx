import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import Menu from "@/app/_components/menu";
import Link from "next/link";
import React from "react";
import { getFIleUrl } from "@/app/_services/modifier";
import PublishUn from "./publish-un";

const SingleContent = ({
  data,
  course_id,
  module_id,
  controls = true,
  content_id,
}: {
  data: any;
  course_id: string;
  module_id: string;
  controls?: boolean;
  content_id?: string;
}) => {
  return (
    <li className="ladder-step flex justify-start items-center gap-x-2">
      <Link
        href={`/admin/courses/${controls ? "edit" : "details"}/${course_id}${
          controls ? "/contents" : ""
        }?${
          data?.content_type === "Exam"
            ? `exam_modal_id=${course_id},${module_id},${
                controls ? data?.id : content_id
              }`
            : `file_url=${getFIleUrl(data?.document?.path, true)}`
        }`}
        target={"_self"}
        className={`flex justify-start  w-8/12 items-center gap-1 ${
          controls || data?.access_type === "Guest"
            ? "text-black"
            : "pointer-events-none text-gray-400"
        }`}
        scroll={false}
      >
        <div className="aspect-square p-1.5 rounded-full bg-emerald-600 w-fit me-1">
          <DynamicHeroIcon
            className="size-5 text-white"
            s_icon={
              data?.content_type === "Audio/Video"
                ? "MusicalNoteIcon"
                : data?.content_type === "Document"
                ? "DocumentTextIcon"
                : "PresentationChartBarIcon"
            }
          />
        </div>
        <div className="text-mdg flex items-center gap-x-3">
          {data?.title}
          <span>
            <DynamicHeroIcon
              s_icon={
                data?.access_type === "Guest"
                  ? "LockOpenIcon"
                  : "LockClosedIcon"
              }
              className="size-4 w-10"
            />
          </span>
        </div>
      </Link>
      {/* <div className="flex-grow h-[1px] border-gray-400"></div> */}
      <div className="text-gray-500 flex justify-end items-center gap-x-2  w-2/12">
        <DynamicHeroIcon o_icon="ClockIcon" className="size-5" />
        <span>{data?.formatted_duration}</span>
      </div>
      {!!controls ? (
        <>
          <div className="w-[400px] h-[1px] border-gray-400"></div>
          <div className="px-2 border rounded-lg text-gray-600 w-28 text-center">
            {data?.access_type}
          </div>
          <PublishUn
            data={data}
            url={`${course_id}/modules/${module_id}/contents/${data?.id}`}
          />
          <div>
            {/* <div className="p-2 cursor-pointer">
              <Link
                href={`/admin/courses/edit/${course_id}/contents?edit_content_id=${data?.id}&edit_modal_id=${module_id}`}
                className="block w-[100px] text-center py-2 border hover:bg-sky-500 hover:text-white"
              >
                Edit
              </Link>
              <Link
                href={`/admin/courses/edit/${course_id}/contents?delete_modal_id=${module_id}&delete_content_id=${data?.id}`}
                className="block w-[100px] text-center py-2 border hover:bg-sky-500 hover:text-white"
              >
                Delete
              </Link>
            </div> */}
            <Menu>
              {{
                control: (
                  <button className="p-1 aspect-square bg-green-700 rounded-lg">
                    <DynamicHeroIcon
                      s_icon="EllipsisVerticalIcon"
                      className="size-4 text-white font-bold"
                    />
                  </button>
                ),
                items: (
                  <div className="p-2 cursor-pointer">
                    <Link
                      href={`/admin/courses/edit/${course_id}/contents?edit_content_id=${data?.id}&edit_modal_id=${module_id}`}
                      className="block w-[100px] text-center py-2 text-sm border border-b-0 hover:bg-sky-500 hover:text-white"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/courses/edit/${course_id}/contents?delete_modal_id=${module_id}&delete_content_id=${data?.id}`}
                      className="block w-[100px] text-center py-2  bg-gray-50 text-sm border text-red-600 hover:bg-sky-500 hover:text-white"
                    >
                      Delete
                    </Link>
                  </div>
                ),
              }}
            </Menu>
          </div>
          <span className="relative left-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </span>
        </>
      ) : null}
    </li>
  );
};

export default SingleContent;
