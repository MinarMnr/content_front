import CommonLayout from "@/app/admin/_reusables/common-layout";
import DataTable from "@/app/admin/_reusables/data-table";
import { TableStruct } from "@/app/lib/data-table";
import React from "react";
import Search from "./search";
import Accordion from "@/app/_components/accordion";
import { show } from "@/app/_services/api-call";

const Page = async () => {
  let couponList: any[] = [];
  await show({
    api_key: "ADMIN_EBOOK_API",
    parameters: {
      page: 1,
      size: -1,
      type: "All",
    },
  }).then((resp: any) => {
    couponList = resp?.data;
  });

  const table_struct: TableStruct[] = [
    {
      view: "SL",
      control: "sl",
    },
    {
      view: "Title",
      control: "title",
    },
    {
      view: "Type",
      control: "course_type.title_en",
    },
    {
      view: "Category",
      control: "category.title_en",
    },
    {
      view: "Sub Category",
      control: "sub_category.title_en",
    },
    {
      view: "Actions",
      control: [
        {
          tooltip: "Edit",
          icon: "PencilIcon",
          path: (tada: any) => `/admin/ebook/edit/${tada?.id}`,
          className: "bg-green-600 text-white",
        },
        // {
        //   tooltip: "Details",
        //   icon: "EyeIcon",
        //   path: (tada: any) => `/admin/ebook/details/${tada?.url_slug}`,
        //   className: "bg-sky-600 text-white",
        // },
        {
          tooltip: "Delete",
          icon: "TrashIcon",
          path: (tada: any) => `/admin/ebook?delete_modal_id=${tada?.id}`,
          className: "bg-red-600 text-white",
        },
      ],
    },
  ];

  return (
    <CommonLayout
      title="E book"
      buttons={[
        {
          title: "Add E-book",
          route: "/admin/ebook/add",
          className: "border-emerald-700 bg-green-800 rounded text-white",
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
      <DataTable table_structure={table_struct} api_key={`ADMIN_EBOOK_API`} />
    </CommonLayout>
  );
};

export default Page;
