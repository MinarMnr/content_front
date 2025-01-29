import { show } from "@/app/_services/api-call";
import React from "react";
import InstructorCard from "../../../_course_reuse/instructor-card";
import Link from "next/link";
import { headers } from "next/headers";
import InstructorForm from "./form";
import DeleteModal from "@/app/admin/_reusables/delete-modal";

const Page = async (props: any) => {
  let courseId: string = (await props?.params)?.id;

  let str_params: string | null = (await headers()).get("x-current-params");
  let add_modal: string | undefined = str_params?.match(/add_modal\=add/)?.[0];
  let edit_modal_id: string | undefined = str_params?.match(
    /(?<=edit_modal_id\=)\d+/
  )?.[0];
  let delete_modal_id: string | undefined = str_params?.match(
    /(?<=delete_modal_id\=)\d+/
  )?.[0];

  let instructors: any[] = [];
  let single_data: any;

  if (!!edit_modal_id || !!delete_modal_id) {
    await show({
      api_key: "ADMIN_COURSE_API",
      addon: `${courseId}/instructors/${edit_modal_id || delete_modal_id}`,
    }).then((resp: any) => {
      if (resp?.status === "success") single_data = resp?.data;
    });
  } else if (!add_modal) {
    await show({
      api_key: "ADMIN_COURSE_API",
      addon: `${courseId}/instructors`,
      parameters: {
        page: 1,
        size: -1,
      },
    })?.then((resp: any) => {
      if (resp?.status === "success") instructors = resp?.data;
    });
  }

  return (
    <>
      {(add_modal || edit_modal_id) && (
        <InstructorForm
          api_url={`${courseId}/instructors`}
          edit_data={single_data}
          edit_id={edit_modal_id}
        />
      )}
      {delete_modal_id && (
        <DeleteModal
          api_endpoint={"ADMIN_COURSE_API"}
          data_id={`${courseId}/instructors/${delete_modal_id}`}
          revalidate_route={`/admin/courses/edit/${courseId}/instructors`}
        />
      )}
      <div className="w-full grid grid-cols-4 pt-4 gap-2">
        <div className="col-span-4 flex justify-end items-center gap-x-3">
          <span>Total Instructors : {instructors?.length}</span>
          <Link
            href={`/admin/courses/edit/${courseId}/instructors?add_modal=add`}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg"
          >
            Add Instructor
          </Link>
        </div>
        {instructors?.map((tada: any, index: number) => (
          <InstructorCard courseId={courseId} instructor={tada} key={index} />
        ))}
      </div>
    </>
  );
};

export default Page;
