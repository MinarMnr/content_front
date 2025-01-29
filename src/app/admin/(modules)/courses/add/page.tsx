"use client";
import CommonLayout from "@/app/admin/_reusables/common-layout";
import React from "react";
import { Formik } from "formik";
import { CourseAddModel } from "./CourseAdd";
import { toast } from "react-toastify";
import CourseAddForm from "./CourseAddForm";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store.ts";
import { post } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";

const Page = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  return (
    <CommonLayout
      title="Add New Course"
      buttons={[
        {
          title: "Go Back",
          route: "/admin/courses",
          className: `border-red-600 text-red-500 bg-red-700 text-white rounded`,
        },
      ]}
    >
      <Formik
        initialValues={CourseAddModel}
        enableReinitialize={true}
        validationSchema={CourseAddModel.validation()}
        onSubmit={async (values, { resetForm }) => {
          //return;
          // const response = await fetch(
          //   "http://192.168.1.192:8004/api/course-management/course",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${token}`,
          //     },
          //     body: JSON.stringify({
          //       // email: values.email,
          //       // password: values.password,
          //       // captcha_key: values.captcha_key,
          //       // captcha_result: values.captcha_result
          //       ...values,
          //     }),
          //   }
          // );
          try {
            // Assuming post already returns a parsed response
            const result: any = await post({
              api_key: "ADMIN_COURSE_API",
              body: values,
              addon: "",
            });

            if (result?.status == "success") {
              toast.success("Success!");
              revalidated(`/admin/courses`);

              router.push(`/admin/courses`);
            } else {
              if (result.error) {
                toast.error(result.error);
              } else {
                toast.error("An unexpected error occurred.");
              }
            }
          } catch (error) {
            toast.error("Network error or server is unreachable.");
          }
        }}
      >
        {(props) => <CourseAddForm {...props} type="add" />}
      </Formik>
    </CommonLayout>
  );
};

export default Page;
