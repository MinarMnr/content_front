import React from "react";
import Form from "../../form";
import { show } from "@/app/_services/api-call";
import CommonLayout from "@/app/admin/_reusables/common-layout";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  let form_val: any = {};
  await show({ api_key: "ADMIN_SUB_CATEGORY_API", addon: params?.id }).then(
    (resp: any) => {
      form_val = resp?.data;
    }
  );
  return (
    <CommonLayout
      title="Edit Sub-Category"
      buttons={[
        {
          title: "Go Back",
          route: "/admin/settings/sub-category",
          className: `border-red-700 text-red-500`,
        },
      ]}
    >
      <Form addon={params?.id} edit_data={form_val} />
    </CommonLayout>
  );
};

export default Page;
