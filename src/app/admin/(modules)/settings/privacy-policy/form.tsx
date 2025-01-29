"use client";

import { post, update } from "@/app/_services/api-call";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { revalidated } from "@/app/actions";
import { quill_formats, quill_modules } from "@/app/_resources/quill-custom";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Page = ({ edit_data, addon }: { edit_data?: any; addon?: string }) => {
  const router = useRouter();


  return (
    <Formik
      initialValues={{
        title_en: edit_data?.title_en ?? "",
        title_bn: edit_data?.title_bn ?? "",
        terms: edit_data?.terms ?? "",
      }}
      validationSchema={Yup.object().shape({

      })}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(true);
        (edit_data ? update : post)({
          api_key: "ADMIN_COURSE_TYPE_API",
          body: values,
          addon: addon ?? "",
        })
          .then((resp: any) => {
            if (resp?.status === "success") {
              revalidated(`/admin/settings/category-type`);
              router.push(`/admin/settings/category-type`);
            } else if (resp?.code === 422) {
              formikHelpers.setErrors(
                Object.entries(resp?.errors)?.reduce(
                  (
                    pV: { [key: string]: string },
                    [key, value]: [string, any]
                  ) => {
                    return {
                      ...pV,
                      [key]: value?.[0],
                    };
                  },
                  {}
                )
              );
            }
          })
          .catch((error: any) => { })
          .finally(() => {
            formikHelpers.setSubmitting(false);
          });
      }}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
        resetForm,
      }: {
        values: any;
        setFieldValue: (
          field: string,
          value: any,
          shouldValidate?: boolean
        ) => void;
        isSubmitting: boolean;
        resetForm: () => void;
      }) => (
        <Form className="flex flex-wrap -mx-2">
          <div className="w-full px-2 flex flex-col mb-4 mt-8">
            <label className="flex flex-col text-gray-600 mb-2">
              Privacy Policy
            </label>

            <ReactQuill
              theme="snow"
              value={values?.terms}
              onChange={(value) => setFieldValue("terms", value)}
              placeholder="Write your Privacy Policy"
              className="h-36 block w-full"
              modules={quill_modules}
              formats={quill_formats}
            />
          </div>


          <div className="w-full px-2 flex justify-end mb-4 mt-12">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-xl"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl"
            >
              {addon ? "Update" : "Save"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Page;
