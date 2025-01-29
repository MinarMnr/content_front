import CommonLayout from "@/app/admin/_reusables/common-layout";
import DataTable from "@/app/admin/_reusables/data-table";
import { TableStruct } from "@/app/lib/data-table";
import React from "react";
import Search from "./search";
import Accordion from "@/app/_components/accordion";
import StatusChange from "@/app/admin/_reusables/status-change";

const Page = () => {
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
      view: "Code",
      control: "code",
    },
    {
      view: "Type",
      control: "type",
    },
    {
      view: "Discount",
      control: (tada: any) => `${tada?.discount}${tada?.discount_type === 'Fixed' ? '/=' : tada?.discount_type === 'Percentage' ? '%' : ''}`,
    },
    {
      view: "Redeem Date",
      control: "redeem_from",
    },
    {
      view: "Expire Date",
      control: "expire_at",
    },
    {
      view: 'Courses',
      control: (tada: any) => (
        <div className="flex flex-wrap justify-start items-start gap-1">
          {tada?.courses?.map((bada: any, b_i: number) => (
            <span className="rounded-full px-2 py-1 text-center bg-yellow-600 text-white whitespace-nowrap" key={`coupon-${b_i}`}>
              {bada?.title}{bada?.code ? ` (${bada?.code})` : ''}
            </span>
          ))}
        </div>
      ),
    },
    {
      view: "Status",
      control: (tada: any) => (
        <StatusChange
          api_key="ADMIN_COUPON_API"
          addon={`${tada?.id}/update/status`}
          data={tada}
          revalidate_route="admin/settings/coupons"
        />
      ),
    },
    {
      view: "Actions",
      control: [
        {
          tooltip: "Edit",
          icon: "PencilIcon",
          path: (tada: any) => `/admin/settings/coupon/edit/${tada?.id}`,
          className: "border-green-600 text-green-800",
        },
        {
          tooltip: "Delete",
          icon: "TrashIcon",
          path: (tada: any) =>
            `/admin/settings/coupon?delete_modal_id=${tada?.id}`,
          className: "border-red-600 text-red-800",
        },
      ],
    },
  ];

  return (
    <CommonLayout
      title="Coupon"
      buttons={[
        {
          title: "Add Coupon",
          route: "/admin/settings/coupon/add",
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
      <DataTable table_structure={table_struct} api_key={`ADMIN_COUPON_API`} />
    </CommonLayout>
  );
};

export default Page;
