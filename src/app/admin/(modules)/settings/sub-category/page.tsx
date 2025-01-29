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
          path: (tada: any) => `/admin/settings/sub-category/edit/${tada?.id}`,
          className: "border-green-600 text-green-800",
        },
        {
          tooltip: "Delete",
          icon: "TrashIcon",
          path: (tada: any) =>
            `/admin/settings/sub-category?delete_modal_id=${tada?.id}`,
          className: "border-red-600 text-red-800",
        },
      ],
    },
  ];

  return (
    <CommonLayout
      title="Sub-Category"
      buttons={[
        {
          title: "Add Sub-Category",
          route: "/admin/settings/sub-category/add",
          className: "border-emerald-700 text-emerald-800",
        },
      ]}
    >
      <Accordion
        items={[
          {
            header: <h4>Open Search</h4>,
            body: <Search />,
          },
        ]}
      />
      <DataTable
        table_structure={table_struct}
        api_key={`ADMIN_SUB_CATEGORY_API`}
      />
    </CommonLayout>
  );
};

export default Page;
