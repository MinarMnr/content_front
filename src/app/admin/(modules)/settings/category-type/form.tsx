"use client";

import { post, update } from "@/app/_services/api-call";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { revalidated } from "@/app/actions";

const Page = ({ edit_data, addon }: { edit_data?: any; addon?: string }) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        title_en: edit_data?.title_en ?? "",
        title_bn: edit_data?.title_bn ?? "",
      }}
      validationSchema={Yup.object().shape({
        title_en: Yup.string().required("Title in English is required"),
        title_bn: Yup.string().optional(),
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
          .catch((error: any) => {})
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
        <Form className="w-full grid grid-cols-2 gap-x-1 all-form-custom">
          <Field name="title_en">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="title_en">Title in English</label>
                <input
                  {...field}
                  placeholder="Title in English"
                  className="border border-gray-300 rounded h-10 p-1"
                />
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <Field name="title_bn">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="title_bn">Title in Bangla</label>
                <input
                  {...field}
                  placeholder="Title in Bangla"
                  className="border border-gray-300 rounded h-10 p-1"
                />
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <div className="flex justify-end items-center col-span-2 gap-3">
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
