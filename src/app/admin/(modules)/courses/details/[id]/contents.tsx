import Accordion from "@/app/_components/accordion";
import React from "react";
import {
  SingleModuleBody,
  SingleModuleHeader,
} from "../../_course_reuse/single-module";
import { AccordionModel } from "@/app/lib/accordion";
import { headers } from "next/headers";
import Modal from "@/app/admin/_reusables/modal";
import ExamSingle from "../../_course_reuse/exam-single";

const Contents = async ({ data }: { data: any }) => {
  let params: string | null = (await headers()).get("x-current-params");
  let exam_modal_id: string | undefined = params?.match(
    /(?<=exam_modal_id\=)[^&]+/
  )?.[0];
  let exam_data: any;
  let file_url: string | undefined = params?.match(/(?<=file_url\=)[^&]+/)?.[0];

  const moduleList: AccordionModel[] = data?.course_modules?.map(
    (tada: any, index: number) => ({
      header: (
        <SingleModuleHeader
          module={tada}
          courseId={data?.url_slug}
          controls={false}
        />
      ),
      body: (
        <div
          className={`w-full px-8 py-4 border-x ${
            data?.course_modules?.length - 1 === index ? "border-b" : ""
          }`}
        >
          <SingleModuleBody
            contents={tada?.module_contents}
            course_id={data?.url_slug}
            module_id={`${index}`}
            controls={false}
          />
        </div>
      ),
    })
  );

  if (exam_modal_id) {
    let temp_url = decodeURIComponent(exam_modal_id);
    // (data?.course_modules as any[])?.some((module: any) => {
    //   if(module?.id === Number(temp_url?.split(",")?.[1])){
    //     exam_data = module?.
    //     return true;
    //   }
    //   return false;
    // })
    exam_data =
      data?.course_modules?.[Number(temp_url?.split(",")?.[1])]
        ?.module_contents?.[Number(temp_url?.split(",")?.[2])];
  }

  return (
    <>
      {exam_modal_id && (
        <Modal>
          <ExamSingle exam_id={exam_modal_id} data={exam_data} />
        </Modal>
      )}
      {file_url ? (
        <Modal>
          <div className="bg-white p-3">
            <iframe
              src={`${decodeURIComponent(file_url)}`?.replaceAll("+", " ")}
              className="w-[800px] h-[450px]"
            ></iframe>
          </div>
        </Modal>
      ) : null}
      <div className="w-full text-3xl font-semibold mb-6">Course Content</div>
      <div>
        <Accordion items={moduleList} init_open={[0]} />
      </div>
    </>
  );
};

export default Contents;
