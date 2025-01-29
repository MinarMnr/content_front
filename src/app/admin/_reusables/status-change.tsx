"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { update } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import React from "react";
import { toast } from "react-toastify";

const StatusChange = ({
  api_key,
  addon,
  data,
  revalidate_route,
}: {
  api_key: string;
  addon: string;
  data: any;
  revalidate_route: string;
}) => {
  const changeStatus = () => {
    update({
      api_key,
      body: {
        ...data,
        status: Number(!data?.status),
      },
      addon,
    }).then((resp: any) => {
      if (resp?.status === "success") {
        toast.success(resp?.message);
        revalidated(revalidate_route);
      } else {
        toast.error(resp?.error);
      }
    });
  };

  return (
    <div
      className={`cursor-pointer px-2 rounded-full flex items-center justify-between border w-fit ${
        data?.status ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
      }`}
      onClick={changeStatus}
      title={!!data?.status ? "Published" : "Un Published"}
    >
      {!!data?.status && <span className="text-sm me-2 font-bold">Active</span>}
      <span
        className={`p-2 rounded-full bg-white ${
          data?.status ? "text-emerald-700" : "text-red-700"
        }`}
      >
        <DynamicHeroIcon
          className={`size-4 rounded-full aspect-square`}
          o_icon={
            !!data?.status ? "DocumentCheckIcon" : "ExclamationTriangleIcon"
          }
        />
      </span>
      {!data?.status && (
        <span className="text-sm ms-2 font-bold">Inactive</span>
      )}
    </div>
  );
};

export default StatusChange;
