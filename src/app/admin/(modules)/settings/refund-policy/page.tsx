import CommonLayout from "@/app/admin/_reusables/common-layout";
import DataTable from "@/app/admin/_reusables/data-table";
import { TableStruct } from "@/app/lib/data-table";
import React from "react";
import Search from "./search";
import Accordion from "@/app/_components/accordion";

const Page = () => {
  const table_struct: TableStruct[] = [
    {
      view: "SL",
      control: "sl",
    },
    {
      view: "Title in English",
      control: "title_en",
    },
    {
      view: "Title in Bangla",
      control: "title_bn",
    },
    {
      view: "Actions",
      control: [
        {
          tooltip: "Edit",
          icon: "PencilIcon",
          path: (tada: any) => `/admin/settings/term/edit/${tada?.id}`,
          className: "border-green-600 text-green-800",
        },
        {
          tooltip: "Delete",
          icon: "TrashIcon",
          path: (tada: any) =>
            `/admin/settings/term?delete_modal_id=${tada?.id}`,
          className: "border-red-600 text-red-800",
        },
      ],
    },
  ];

  return (
    <CommonLayout
      title="Refund Policy"
      buttons={[
        {
          title: "Add Refund Policy",
          route: "/admin/settings/refund-policy/add",
          className: "border-emerald-700 text-emerald-800",
        },
      ]}
    >
      <Accordion
        className="dashboard-acc-custom"
        items={[
          {
            header: (
              <h4 className="border border-gray-100 p-2 font-bold text-green-800 border-l-2 border-l-green-700 pl-4 bg-gray-50">
                Open Search
              </h4>
            ),
            body: <Search />,
          },
        ]}
      />
      <DataTable
        table_structure={table_struct}
        api_key={`ADMIN_COURSE_TYPE_API`}
      />
    </CommonLayout>
  );
};

export default Page;
