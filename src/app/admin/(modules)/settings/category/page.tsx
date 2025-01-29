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
      view: "Course Type",
      control: "course_type.title_en",
    },
    {
      view: "Actions",
      control: [
        {
          tooltip: "Edit",
          icon: "PencilIcon",
          path: (tada: any) => `/admin/settings/category/edit/${tada?.id}`,
          className: "border-green-600 text-green-800",
        },
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
    <CommonLayout
      title="Category"
      buttons={[
        {
          title: "Add Category",
          route: "/admin/settings/category/add",
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
        api_key={`ADMIN_CATEGORY_API`}
      />
    </CommonLayout>
  );
};

export default Page;
