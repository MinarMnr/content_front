import { show } from "@/app/_services/api-call";
import Link from "next/link";
import React from "react";

const ExamSingle = async ({
  exam_id,
  data,
}: {
  exam_id: string;
  data?: any;
}) => {
  let exam_details: any;
  exam_id = decodeURIComponent(exam_id);
  let course_id = exam_id?.split(",")?.[0];
  let module_id = exam_id?.split(",")?.[1];
  let content_id = exam_id?.split(",")?.[2];
  if (!data) {
    await show({
      api_key: "ADMIN_COURSE_API",
      addon: `${course_id}/modules/${module_id}/contents/${content_id}`,
    }).then((resp: any) => {
      if (resp?.status === "success") {
        exam_details = resp?.data;
      }
    });
  } else {
    exam_details = data;
  }
  return (
    <div className="w-[1000px] relative max-h-[900px] bg-white px-2 overflow-y-auto pl-5 pr-5 rounded-3xl">
      <div className="sticky top-0 flex justify-between items-center bg-white z-10 p-3">
        <div className="font-bold">
          <span>{exam_details?.title}</span>
          {/* <br />
          <span>{exam_details?.duration}</span> */}
          <br />
          <span>{exam_details?.total_marks}</span>
        </div>
        <Link
          href={`/admin/courses/${data ? "details" : "edit"}/${content_id}${
            data ? "#admin-course-contents" : "/contents"
          }`}
          scroll={false}
        ></Link>
      </div>
      {exam_details?.questions?.map((question: any, q_i: number) => (
        <div
          className="flex flex-col justify-start items-stretch border mb-4 p-1  pl-4 pr-4"
          key={q_i}
        >
          <div className="flex justify-between bg-slate-600 text-white font-bold px-5">
            <span>Question {q_i + 1}</span>
            {/* <span>Mark: {question?.mark}</span> */}
          </div>
          <div
            className="remove-all p-stylecontent"
            style={{ margin: "0 0 8px 0" }}
            dangerouslySetInnerHTML={{ __html: question?.title ?? "" }}
          />
          {question?.options?.map((option: any, o_i: number) => (
            <div
              key={o_i}
              className="flex justify-start items-center gap-x-1 mb-1"
            >
              <input type="checkbox" readOnly checked={!!option?.is_answer} />
              <div
                className="remove-all p-stylecontent"
                dangerouslySetInnerHTML={{ __html: option?.title ?? "" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExamSingle;
