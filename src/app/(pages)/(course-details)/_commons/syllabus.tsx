"use client";

import Accordion from "@/app/_components/accordion";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { AccordionModel } from "@/app/lib/accordion";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { post } from "@/app/_services/api-call";
import { toast } from "react-toastify";
import Modal from "@/app/admin/_reusables/modal";
import MediaPlayer from "@/app/_components/media-player";
import LangTra from "@/app/_components/lang-tra";

const Syllabus = ({
  modules,
  course_id,
  show_header = true,
  current,
  setModal,
  full_view,
}: {
  modules: any[];
  course_id?: string;
  show_header?: boolean;
  current?: {
    module: number;
    content: number;
  };
  setModal?: any;
  full_view?: boolean;
}) => {
  const [interModal, setInterModal] = useState<any>();

  const handleClick = async (content: any, module: any) => {
    if (setModal) {
      setModal({
        type: "loading",
      });
      switch (content?.content_type) {
        case "Exam":
          setModal({
            type: "exam",
            course_id: course_id,
            content_id: Number(content?.id),
            module_id: Number(module?.id),
          });
          break;
        case "Audio/Video":
          post({
            api_key: "CONTENT_API",
            body: {},
            addon: content?.id,
          }).then((resp: any) => {
            if (resp?.status == "success") {
              setModal({
                type: "media",
                course_id: course_id,
                content_url: resp?.data?.url,
                content_id: Number(content?.id),
                module_id: Number(module?.id),
                extension: resp?.data?.extension,
                progress: resp?.data?.progress,
              });
            } else {
              toast.error(resp?.error);
            }
          });
          break;
        case "Document":
          post({
            api_key: "CONTENT_API",
            body: {},
            addon: content?.id,
          }).then((resp: any) => {
            if (resp?.status == "success") {
              setModal({
                type: "document",
                course_id: course_id,
                content_url: resp?.data?.url,
                content_id: Number(content?.id),
                module_id: Number(module?.id),
                extension: resp?.data?.extension,
                progress: resp?.data?.progress,
              });
            } else {
              toast.error(resp?.error);
            }
          });
          break;
      }
    } else if (!!setInterModal) {
      setInterModal({
        type: "loading",
      });
      switch (content?.content_type) {
        case "Exam":
          setInterModal({
            type: "exam",
            course_id: course_id,
            content_id: Number(content?.id),
            module_id: Number(module?.id),
          });
          break;
        case "Audio/Video":
          post({
            api_key: "CONTENT_API",
            body: {},
            addon: content?.id,
          }).then((resp: any) => {
            if (resp?.status == "success") {
              setInterModal({
                type: "media",
                course_id: course_id,
                content_url: resp?.data?.url,
                content_id: Number(content?.id),
                module_id: Number(module?.id),
                extension: resp?.data?.extension,
                progress: resp?.data?.progress,
              });
            } else {
              toast.error(resp?.error);
            }
          });
          break;
        case "Document":
          post({
            api_key: "CONTENT_API",
            body: {},
            addon: content?.id,
          }).then((resp: any) => {
            if (resp?.status == "success") {
              setInterModal({
                type: "document",
                course_id: course_id,
                content_url: resp?.data?.url,
                content_id: Number(content?.id),
                module_id: Number(module?.id),
                extension: resp?.data?.extension,
                progress: resp?.data?.progress,
              });
            } else {
              toast.error(resp?.error);
            }
          });
          break;
      }
    }
  };

  let accordionList: AccordionModel[] = modules?.map(
    (module: any, m_i: number) => ({
      header: (
        <div
          key={m_i}
          className="container mx-auto bg-green-800  px-4 py-2 flex gap-x-3 justify-start items-center border border-green-800"
        >
          <div className="bg-green-200 aspect-square rounded-full p-3 w-fit">
            <BookOpenIcon className="size-5 text-white" />
          </div>
          <span className="font-bold text-white text-xl mt-1 basis-4/6">
            {module?.title}
          </span>
          <label className="text-white text-sm font-medium mt-1 float-right w-10 h-10 text-center leading-10 rounded-3xl bg-green-200 border border-green-600">
            <LangTra
              control="value"
              data={{
                value: module?.module_contents_user_progress
                  ? module?.module_contents_user_progress
                  : 0,
              }}
            />
            %
          </label>
          <label className="text-green-200 text-sm mt-1 float-right text-center">
            <LangTra
              control="value"
              data={{ value: module?.formatted_duration }}
            />
          </label>
        </div>
      ),
      body: (
        <div
          key={m_i}
          className={`container mx-auto w-full px-8 py-4 flex bg-white justify-start items-start border-x border-green-800 ${
            m_i === modules?.length - 1 ? "border-b" : ""
          }`}
        >
          <div className="w-full">
            <div className="flex flex-col justify-start items-stretch text-gray-400 chap-area relative">
              {module?.module_contents?.map((content: any, c_i: number) => (
                <div
                  key={m_i + "_" + c_i}
                  className="flex flex-row justify-start items-start py-2 chap-list relative  ps-4"
                >
                  <button
                    className={`basis-5/6 flex items-center gap-2 relative ${
                      m_i === current?.module && current?.content === c_i
                        ? "bg-slate-300"
                        : "bg-white"
                    }`}
                    onClick={(e) => {
                      handleClick(content, module);
                    }}
                  >
                    <DynamicHeroIcon
                      className="size-8 text-green-700"
                      s_icon={
                        content?.content_type === "Audio/Video"
                          ? "MusicalNoteIcon"
                          : content?.content_type === "Document"
                          ? "DocumentTextIcon"
                          : "PresentationChartBarIcon"
                      }
                    />
                    <span className="text-green-700 underline">
                      {content?.title}
                    </span>
                    <DynamicHeroIcon
                      s_icon={
                        content?.access_type === "Guest"
                          ? "LockOpenIcon"
                          : "LockClosedIcon"
                      }
                      className="size-4"
                    />
                  </button>
                  <div className="basis-1/1">
                    <button className="px-0 py-1 basis-3/12 flex items-center gap-2 rounded-lg font-normal text-green-800">
                      <LangTra
                        control="value"
                        data={{ value: content?.formatted_duration }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    })
  );

  return (
    <>
      {show_header ? (
        <div className="text-3xl font-semibold mb-6">
          <LangTra control="course_details.course_content" />
        </div>
      ) : null}
      {interModal ? (
        <Modal closeModal={setInterModal}>
          <MediaPlayer
            {...interModal}
            c_class="w-[800px] h-[450px]"
            resolutions={[]}
          />
        </Modal>
      ) : null}
      <Accordion items={accordionList} init_open={[current?.module ?? 0]} />
    </>
  );
};

export default Syllabus;
