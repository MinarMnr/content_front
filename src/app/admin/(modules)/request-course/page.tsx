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
    api_key: "ADMIN_REQUEST_COURSE",
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
      view: "User Name",
      control: "name",
    },
    {
      view: "Mobile No",
      control: "phone",
    },

    {
      view: "Title",
      control: "title",
    },
    {
      view: "Description",
      control: "description",
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
      view: "Other Types",
      control: "other_type",
    },
    {
      view: "Actions",
      control: [
        {
          tooltip: "Delete",
          icon: "TrashIcon",
          path: (item: any) =>
            `/admin/request-course?delete_modal_id=${item?.id}`,
          className: "bg-red-600 text-white",
        },
      ],
    },
  ];

  return (
    <CommonLayout title="New Course Request List" buttons={[]}>
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
        api_key={`ADMIN_REQUEST_COURSE`}
      />
    </CommonLayout>
  );
};

export default Page;
