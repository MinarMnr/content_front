"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { post } from "@/app/_services/api-call";
import Modal from "@/app/admin/_reusables/modal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// {
//   data: any;
//   url: string;
//   icon: SolidIconName;
//   addon?: string,
// }

const FeatureChange = ({ data, url, icon, addon, ...others }: any) => {
  const [modalStatus, setModalStatus] = useState(false);
  const router = useRouter();

  return (
    <>
      {modalStatus && (
        <Modal closeModal={setModalStatus}>
          <div className="bg-white p-8 rounded-3xl">
            <div className="border border-solid-all p-5">
            <div className="w-full text-2xl bg-white text-black mb-5">
              Do you want to make the entry as
              {data?.is_featured ? " Un-Featured" : " Featured"}?
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => {
                  setModalStatus(false);
                }}
                className="w-1/3 bg-red-600 text-white py-2 rounded-lg mr-3"
              >
                No
              </button>
              <button
                className="w-1/3 bg-emerald-600 text-white py-2 rounded-lg"
                onClick={() => {
                  post({
                    api_key: url,
                    body: {
                      ...data,
                      is_featured: Number(!data?.is_featured),
                      _method: "PUT",
                    },
                    addon: addon ?? "",
                    is_form: true,
                  }).then((resp: any) => {
                    if (resp?.status === "success") {
                      toast.success(resp?.message);
                      router.refresh();
                      setModalStatus(false);
                    } else {
                      toast.error(resp?.errors?.is_featured[0] ?? resp?.error);
                    }
                  });
                }}
              >
                Yes
              </button>
            </div>
            </div>
          </div>
        </Modal>
      )}
      <button
        {...others}
        onClick={() => {
          setModalStatus(true);
        }}
        className={`p-2 border-2 rounded-lg m-1 ${
          data?.is_featured
            ? "bg-orange-600 text-white"
            : " bg-slate-600 text-white"
        }`}
        title={
          data?.is_featured
            ? `Remove from featured list`
            : "Add to featured list"
        }
      >
        <DynamicHeroIcon s_icon={icon} className="size-4" />
      </button>
    </>
  );
};

export default FeatureChange;
