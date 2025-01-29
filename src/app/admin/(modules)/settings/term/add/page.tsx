import CommonLayout from "@/app/admin/_reusables/common-layout";
import React from "react";
import Form from "../form";

const Page = () => {
  return (
    <CommonLayout
      title="Add Terms and Condition"
      buttons={[
        {
          title: "Go Back",
          route: "/admin/settings/term",
          className: `border-red-700 text-red-500`
        },
      ]}
    >
      <Form />
    </CommonLayout>
  );
};

export default Page;
