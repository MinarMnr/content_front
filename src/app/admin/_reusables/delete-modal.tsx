"use client";

import { kill } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({
  api_endpoint,
  data_id,
  revalidate_route,
  modal_control,
}: {
  api_endpoint: string;
  data_id: string;
  revalidate_route?: string;
  modal_control?: any;
}) => {
  const router = useRouter();
  return (
    <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-10 fixed justify-center items-center flex">
      <div className="bg-white p-8 rounded-3xl">
        <div className="modal-inner w-full">
          <div className=" gap-2 border pt-10 p-6">
            <div className="w-full text-2xl bg-white text-black mb-5">
              Do you want to delete the entry?
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => {
                  if (modal_control) {
                    modal_control(undefined);
                  } else if (revalidate_route) {
                    router.push(
                      revalidate_route?.startsWith("/")
                        ? `${revalidate_route}`
                        : `/${revalidate_route}`
                    );
                  } else {
                    router.back();
                  }
                }}
                className="w-1/3 bg-red-600 text-white py-2 rounded-lg me-3"
              >
                No
              </button>
              <button
                className="w-1/3 bg-emerald-600 text-white py-2 rounded-lg"
                onClick={() => {
                  kill({ api_key: api_endpoint, addon: `${data_id}` }).then(
                    (resp: any) => {
                      if (resp?.status === "success") {
                        toast.success(resp?.message);
                        revalidated(revalidate_route ?? "");
                        if (modal_control) {
                          modal_control(undefined);
                        } else if (revalidate_route) {
                          router.push(
                            revalidate_route?.startsWith("/")
                              ? `${revalidate_route}`
                              : `/${revalidate_route}`
                          );
                        } else {
                          router.back();
                        }
                      } else {
                        toast.error(resp?.error);
                      }
                    }
                  );
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
