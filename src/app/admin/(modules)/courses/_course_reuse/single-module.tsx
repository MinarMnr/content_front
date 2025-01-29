import React from "react";
import SingleContent from "./single-content";
import Link from "next/link";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import PublishUn from "./publish-un";

export const SingleModuleBody = ({
  contents,
  course_id,
  module_id,
  controls = true,
}: {
  contents: any[];
  course_id: string;
  module_id: string;
  controls?: boolean;
}) => {
  return (
    <ul className="w-full ladder-list">
      {contents?.map((tada: any, index: number) => (
        <SingleContent
          key={index}
          data={tada}
          course_id={course_id}
          module_id={module_id}
          controls={controls}
          content_id={`${index}`}
        />
      ))}
    </ul>
  );
};

export const SingleModuleHeader = ({
  module,
  courseId,
  controls = true,
}: {
  module: any;
  courseId: string;
  controls?: boolean;
}) => {
  return (
    <div className="text-green-800 bg-gray-100 font-medium text-xl px-4 py-3 border flex">
      <div className="flex-grow flex flex-col justify-center items-start">
        <span>{module?.title}</span>
      </div>
      {!!controls ? (
        <div className="w-auto flex gap-x-1">
          

          <PublishUn data={module} url={`${courseId}/modules/${module?.id}`} />
          <Link
            className="p-1 bg-white rounded-md border"
            href={`/admin/courses/edit/${courseId}/contents?add_content=add&edit_modal_id=${module?.id}`}
          >
            <DynamicHeroIcon
              s_icon="PlusIcon"
              className="size-5 text-emerald-700"
            />
          </Link>
          <Link
            className="p-1 bg-white rounded-md border"
            href={`/admin/courses/edit/${courseId}/contents?edit_modal_id=${module?.id}`}
          >
            <DynamicHeroIcon
              s_icon="PencilIcon"
              className="size-5 text-emerald-700"
            />
          </Link>
          <Link
            className="p-1 bg-white rounded-md border"
            href={`/admin/courses/edit/${courseId}/contents?delete_modal_id=${module?.id}`}
          >
            <DynamicHeroIcon
              s_icon="TrashIcon"
              className="size-5 text-red-700"
            />
          </Link>

          <span className="mt-1 ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
          </span>
        </div>
      ) : null}
    </div>
  );
};
