"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { post } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import Modal from "@/app/admin/_reusables/modal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PublishUn = ({
  data,
  url,
  show_radio,
}: {
  data: any;
  url: string;
  show_radio?: boolean;
}) => {
  const [modalStatus, setModalStatus] = useState(false);
  const router = useRouter();

  return (
    <>
      {modalStatus ? (
        <Modal closeModal={setModalStatus}>
          <div className="bg-white p-8 rounded-3xl">
            <div className="modal-inner w-full">
              <div className=" gap-2 border pt-10 p-6">
                <div className="w-full text-2xl bg-white text-black mb-5">
                  Do you want to {data?.is_published ? "Un-Publish" : "Publish"}{" "}
                  the entry?
                </div>
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => {
                      revalidated(
                        `admin/courses/edit/${url?.split("/")?.[0]}/contents`
                      );
                      setModalStatus(false);
                    }}
                    className="w-1/3 bg-red-600 text-white py-2 rounded-lg text-lg me-3 font-normal"
                  >
                    No
                  </button>
                  <button
                    className="w-1/3 bg-emerald-600 text-white py-2 rounded-lg text-lg font-normal"
                    onClick={() => {
                      post({
                        api_key: "ADMIN_COURSE_API",
                        body: {
                          ...data,
                          is_published: Number(!data?.is_published),
                          _method: "PUT",
                        },
                        addon: url,
                        is_form: true,
                      }).then((resp: any) => {
                        if (resp?.status === "success") {
                          toast.success(resp?.message);
                          router.refresh();
                          setModalStatus(false);
                        } else {
                          toast.error(resp?.error);
                        }
                      });
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      <div
        className={`cursor-pointer px-3 py-1 rounded-md flex items-center justify-between  ${
          show_radio
            ? data?.is_published
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
            : data?.is_published
            ? "text-emerald-700 bg-white"
            : "text-red-700 bg-white border"
        }`}
        onClick={(e) => {
          e?.preventDefault();
          e?.stopPropagation();
          setModalStatus(!modalStatus);
        }}
        title={!!data?.is_published ? "Published" : "Un Published"}
      >
        {show_radio
          ? !!data?.is_published && (
              <span className="text-sm me-2 rounded-md font-bold">
                Published
              </span>
            )
          : null}
        <span
          className={
            show_radio
              ? `p-2 rounded-md bg-white ${
                  data?.is_published ? "text-emerald-700" : "text-red-700"
                }`
              : ``
          }
        >
          <DynamicHeroIcon
            className={`size-4 rounded-md aspect-square`}
            o_icon={
              !!data?.is_published
                ? "DocumentCheckIcon"
                : "ExclamationTriangleIcon"
            }
          />
        </span>
        {show_radio
          ? !!data?.is_published || (
              <span className="text-sm ms-2 font-bold">Un Published</span>
            )
          : null}
      </div>
    </>
  );
};

export default PublishUn;
