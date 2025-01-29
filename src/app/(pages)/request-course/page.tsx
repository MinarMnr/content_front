"use client";
import CommonLayout from "@/app/admin/_reusables/common-layout";
import React from "react";
import { Formik } from "formik";
import { RequestCourseModel } from "./RequestCourse";
import { toast } from "react-toastify";
import RequestCourseForm from "./RequestCourseForm";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store.ts";
import { post } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";

const Page = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={RequestCourseModel}
      enableReinitialize={true}
      validationSchema={RequestCourseModel.validation()}
      onSubmit={async (values: any, { resetForm, setSubmitting }) => {
        values.course_type_id == 3
          ? (values.course_type_id = "")
          : values.course_type_id;
        //return;
        try {
          const result: any = await post({
            api_key: "REQUESTED_COURSE",
            body: {
              ...values,
              _method: "POST",
            },
            addon: ``,
            is_form: false,
          }).then((resp: any) => {
            setSubmitting(false);
            if (resp?.status === "success") {
              toast.success(resp?.message);
              router.push(`/request-course`);

              resetForm({});
            } else {
              if (result.error) {
                toast.error(result.error);
              } else {
                toast.error("An unexpected error occurred.");
              }
            }
          });
        } catch (error) {
          toast.error("Network error or server is unreachable.");
        }
      }}
    >
      {(props) => <RequestCourseForm {...props} type="add" />}
    </Formik>
  );
};

export default Page;
