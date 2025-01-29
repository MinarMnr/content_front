import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { getFIleUrl } from "@/app/_services/modifier";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const InstructorCard = ({
  instructor,
  courseId,
  className,
}: {
  instructor: any;
  courseId?: string;
  className?: string;
}) => {
  return (
    <div className="border border-dashed  rounded-xl flex flex-col justify-start items-stretch p-3 bg-gray-50">
      <div className="flex justify-between flex-wrap">
        <span className="text-green-800 font-bold">{instructor?.type}</span>
        <div className="w-auto flex gap-x-2 border-r bg-white border rounded-full">
          {courseId && instructor?.type !== 'Owner' ? (
            <>
              <Link
                className="p-1 ml-2  rounded-md"
                href={`/admin/courses/edit/${courseId}/instructors?edit_modal_id=${instructor?.id}`}
              >
                <DynamicHeroIcon
                  s_icon="PencilIcon"
                  className="size-5 text-emerald-700"
                />
              </Link>
              <Link
                className="p-1 mr-2  rounded-md"
                href={`/admin/courses/edit/${courseId}/instructors?delete_modal_id=${instructor?.id}`}
              >
                <DynamicHeroIcon
                  s_icon="TrashIcon"
                  className="size-5 text-red-700"
                />
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex items-stretch">
        <Image
          className="w-1/3 aspect-square h-full"
          src={getFIleUrl(instructor?.user?.avatar, true)}
          alt=""
          width={100}
          height={100}
        />
        <div className="flex flex-col flex-grow justify-start items-start px-2">
          <span className="text-xl text-slate-600 font-bold">
            {instructor?.user?.name_en}
          </span>
          <span className="text-xl text-slate-700">
            {instructor?.user?.email}
          </span>
          <span>{instructor?.user?.summary}</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
