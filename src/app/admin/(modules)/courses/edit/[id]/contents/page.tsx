import { headers } from "next/headers";
import React from "react";
import Link from "next/link";
import "@/app/_scss/accordion.scss";
import DeleteModal from "@/app/admin/_reusables/delete-modal";
import Modal from "@/app/admin/_reusables/modal";
import ModuleForm from "./moduleForm";
import ContentForm from "./contentForm";
import ExamSingle from "../../../_course_reuse/exam-single";
import AllContents from "./all-contents";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";

const Page = async (props: any) => {
  let courseId: string = (await props?.params)?.id;
  let params: string | null = (await headers()).get("x-current-params");

  let add_modal: string | undefined = params?.match(/add_modal\=add/)?.[0];
  let edit_modal_id: string | undefined = params?.match(
    /(?<=edit_modal_id\=)[^&]+/
  )?.[0];
  let add_content: string | undefined = params?.match(/add_content\=add/)?.[0];
  let edit_content_id: string | undefined = params?.match(
    /(?<=edit_content_id\=)[^&]+/
  )?.[0];
  let delete_modal_id: string | undefined = params?.match(
    /(?<=delete_modal_id\=)[^&]+/
  )?.[0];
  let delete_content_id: string | undefined = params?.match(
    /(?<=delete_content_id\=)[^&]+/
  )?.[0];
  let exam_modal_id: string | undefined = params?.match(
    /(?<=exam_modal_id\=)[^&]+/
  )?.[0];
  let file_url: string | undefined = params?.match(/(?<=file_url\=)[^&]+/)?.[0];

  return (
    <>
      {delete_content_id ? (
        <DeleteModal
          api_endpoint={"ADMIN_COURSE_API"}
          data_id={`${courseId}/modules/${delete_modal_id}/contents/${delete_content_id}`}
          revalidate_route={`admin/courses/edit/${courseId}/contents`}
        />
      ) : delete_modal_id ? (
        <DeleteModal
          api_endpoint={"ADMIN_COURSE_API"}
          data_id={`${courseId}/modules/${delete_modal_id}`}
          revalidate_route={`admin/courses/edit/${courseId}/contents`}
        />
      ) : null}
      {add_modal || (edit_modal_id && !(add_content || edit_content_id)) ? (
        <Modal closeModal={'no-show'}>
          <ModuleForm api_url={`${courseId}/modules`} edit_id={edit_modal_id} />
        </Modal>
      ) : null}
      {edit_modal_id && (add_content || edit_content_id) ? (
        <Modal closeModal={'no-show'}>
          <ContentForm
            api_url={`${courseId}/modules/${edit_modal_id}/contents`}
            edit_id={edit_content_id}
          />
        </Modal>
      ) : null}
      {exam_modal_id ? (
        <Modal>
          <ExamSingle exam_id={exam_modal_id} />
        </Modal>
      ) : null}
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
      <div className="no-expand-icon">
        {/* <Accordion items={moduleList} init_open={[0]} /> */}
        <div className="flex justify-end">
          <Link
            className="w-40 py-2 bg-green-800 ps-5 text-center my-1 inline-flex text-white rounded-md gap-x-2"
            href={`/admin/courses/edit/${courseId}/contents?add_modal=add`}
          >
            <DynamicHeroIcon s_icon="PlusIcon" className="size-6 text-white" />
            Add Module
          </Link>
        </div>
        <AllContents courseId={courseId} />
      </div>

      {/* <div className="grid grid-cols-2 items-center w-full">
        <div className="flex justify-start">
          <Link
            className="w-2/4 px-4 py-2 text-green-700 border-2 border-green-900 border-dashed text-center rounded hover:bg-emerald-50 transition"
            href={`/admin/courses/edit/${courseId}/contents?add_modal=add`}
          >
            Add Module
          </Link>
        </div>
   
      </div> */}
    </>
  );
};

export default Page;
