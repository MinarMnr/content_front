"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { post, update } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { Field, Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import "react-quill-new/dist/quill.snow.css";
import { quill_formats, quill_modules } from "@/app/_resources/quill-custom";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const FaqForm = ({
  api_url,
  edit_data,
  edit_id,
}: {
  api_url: string;
  edit_data?: any;
  edit_id?: string;
}) => {
  const router = useRouter();

  return (
    <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-10 fixed justify-center items-center flex">
      <Formik
        initialValues={{
          question: edit_data?.question ?? "",
          answer: edit_data?.answer ?? "",
          order_no: edit_data?.order_no ?? "",
          is_published: edit_data?.is_published ?? false,
        }}
        validationSchema={Yup.object().shape({
          question: Yup.string().required("Question is required"),
          answer: Yup.string().required("Answer is required"),
        })}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          formikHelpers.setSubmitting(true);
          (edit_id ? update : post)({
            api_key: "ADMIN_COURSE_API",
            body: values,
            addon: `${api_url}${edit_id ? `/${edit_id}` : ""}`,
          })
            .then((resp: any) => {
              if (resp?.status === "success") {
                toast.success(resp?.message);
                revalidated(
                  `admin/courses/edit/${api_url?.split("/")?.[0]}/faqs`
                );
                router.push(
                  `/admin/courses/edit/${api_url?.split("/")?.[0]}/faqs`
                );
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
          isSubmitting,
          resetForm,
          setFieldValue,
          setFieldTouched,
        }: {
          isSubmitting: boolean;
          resetForm: any;
          setFieldValue: any;
          setFieldTouched: any;
        }) => (
          <div className="w-[1000px] bg-white relative rounded-3xl">
            <Link
              href={`/admin/courses/edit/${api_url?.split("/")?.[0]}/faqs`}
              className="p-2 rounded-full bg-red-500 text-white absolute -right-4 -top-3"
            >
              <DynamicHeroIcon s_icon="XMarkIcon" className="size-5" />
            </Link>
            <div className="modal-inner w-full p-6">
              <Form className="grid grid-cols-8  gap-2 border pt-10">
                <Field name="question">
                  {({ field, meta }: any) => (
                    <div className="col-span-6 flex flex-col justify-start items-stretch pl-5 pe5">
                      <label htmlFor="question">
                        Question<sup className="text-red-700">*</sup>
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={field?.value}
                        onChange={(value) => {
                          setFieldValue("question", value);
                        }}
                        onBlur={() => {
                          setFieldTouched("question");
                        }}
                        placeholder="Enter Question"
                        className="h-[100px] mb-5"
                        modules={quill_modules}
                        formats={quill_formats}
                      />
                      <p className="text-sm text-red-400 h-5">
                        {meta?.touched && meta?.error ? meta?.error : null}
                      </p>
                    </div>
                  )}
                </Field>
                <div className="col-span-2 pt-6">
                  {/* <Field name="order_no">
                  {({ field, meta }: any) => (
                    <div className="w-full flex justify-start items-start">
                      <input
                        {...field}
                        placeholder="Order No."
                        className="border border-gray-500 rounded h-7 w-28 p-1"
                      />
                      <label htmlFor="order_no" className="flex-grow mt-1">
                        Order No.
                      </label>
                      <p className="text-sm text-red-400 h-5">
                        {meta?.touched && meta?.error ? meta?.error : null}
                      </p>
                    </div>
                  )}
                </Field> */}
                  <Field name="is_published">
                    {({ field, meta }: any) => (
                      <div className="flex justify-start items-center gap-x-6">
                        <label htmlFor="is_published">Is Published?</label>
                        <input
                          {...field}
                          checked={field?.value}
                          onChange={(e) =>
                            setFieldValue("is_published", !!e?.target?.checked)
                          }
                          onBlur={() => {
                            setFieldTouched("is_published");
                          }}
                          placeholder="Publish Content?"
                          className="border border-gray-500 rounded h-10 p-1"
                          type="checkbox"
                          id="is_published"
                        />
                        <p className="text-sm text-red-400 h-5">
                          {meta?.touched && meta?.error ? meta?.error : null}
                        </p>
                      </div>
                    )}
                  </Field>
                </div>
                <Field name="answer">
                  {({ field, meta }: any) => (
                    <div className="col-span-8 flex flex-col justify-start items-stretch pl-5 pe-5">
                      <label htmlFor="answer">
                        Answer<sup className="text-red-700">*</sup>
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={field?.value}
                        onChange={(value) => {
                          setFieldValue("answer", value);
                        }}
                        onBlur={() => {
                          setFieldTouched("answer");
                        }}
                        placeholder="Enter Answer"
                        className="h-[100px] mb-5"
                        modules={quill_modules}
                        formats={quill_formats}
                      />
                      <p className="text-sm text-red-400 h-5">
                        {meta?.touched && meta?.error ? meta?.error : null}
                      </p>
                    </div>
                  )}
                </Field>
                <div className="col-span-8 flex justify-end items-center p-4 gap-2 border-t bg-gray-50 mt-10 ">
                  <button
                    className="bg-red-600 text-white rounded-md px-8 py-2"
                    type="button"
                    disabled={!!isSubmitting}
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="bg-emerald-600 text-white rounded-md px-8 py-2"
                    type="submit"
                    disabled={!!isSubmitting}
                  >
                    {edit_id ? "Update" : "Save"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default FaqForm;
