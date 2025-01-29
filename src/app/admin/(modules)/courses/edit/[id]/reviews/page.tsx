import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import DataTable from "@/app/admin/_reusables/data-table";
import { TableStruct } from "@/app/lib/data-table";
import React from "react";
import FeatureChange from "../../../_course_reuse/feature-change";

const Page = async (props: any) => {
  let courseId = (await props?.params)?.id;

  const table_struct: TableStruct[] = [
    {
      view: "SL",
      control: "sl",
    },
    {
      view: "Star",
      control: (tada: any) => (
        <div className="flex">
          {Array.from({ length: 5 }, (bada: any, b_i: number) => (
            <DynamicHeroIcon
              s_icon="StarIcon"
              className={`size-3 ${b_i < Number(tada?.rating_point) ? 'text-yellow-400' : 'text-gray-400'}`}
              key={b_i}
            />
          ))}
        </div>
      ),
    },
    {
      view: "Comment",
      control: (tada: any) => (
        <div className="remove-all" dangerouslySetInnerHTML={{ __html: tada?.comments ?? "" }} />
      ),
    },
    {
      view: "Is Featured",
      control: [
        {
          action: async (tada: any) => {
            "use server";
            return (
              <FeatureChange
                data={tada}
                url={`ADMIN_COURSE_API`}
                icon={`FlagIcon`}
                addon={`ratings/${tada?.id}/update-feature-status`}
              />
            );
          },
        },
      ],
    },
    {
      view: "Actions",
      control: [
        {
          tooltip: "Delete",
          icon: "TrashIcon",
          path: (tada: any) =>
            `/admin/settings/category?delete_modal_id=${tada?.id}`,
          className: "border-red-600 text-red-800",
        },
      ],
    },
  ];

  return (
    <>
      <div className="w-full flex ">

      </div>
      <DataTable
        table_structure={table_struct}
        api_key={`ADMIN_COURSE_API`}
        addon={`${courseId}/ratings`}
      />
    </>
  );
};

export default Page;
