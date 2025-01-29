import React from "react";
import Form from "./form";
import { show } from "@/app/_services/api-call";

const Page = async (props: any) => {
  const params = await props.params;
  let courseDetails: any = {};
  let course_type: any = [];
  let category: any = [];
  let discount_type: any = [];

  await show({ api_key: "ADMIN_COURSE_API", addon: params?.id }).then(
    (resp: any) => {
      courseDetails = resp?.data;
    }
  );
  await show({
    api_key: "ADMIN_COURSE_TYPE_API",
    parameters: {
      page: 1,
      size: -1,
    },
  }).then((resp: any) => {
    course_type = resp?.data;
  });
  await show({
    api_key: "ADMIN_CATEGORY_API",
    parameters: {
      page: 1,
      size: -1,
    },
  }).then((resp: any) => {
    category = resp?.data;
  });
  discount_type = [
    {
      id: "Fixed",
      title_en: "Fixed",
    },
    {
      id: "Percentage",
      title_en: "Percentage",
    },
  ];

  return (
    <Form
      edit_data={courseDetails}
      addon={params?.id}
      dropdowns={{
        course_type: course_type,
        category: category,
        discount_type: discount_type,
      }}
    />
  );
};

export default Page;
