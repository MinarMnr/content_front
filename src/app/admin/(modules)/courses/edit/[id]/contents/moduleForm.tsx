"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { update, post, show } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ModuleForm = ({
  api_url,
  edit_id,
}: {
  api_url: string;
  edit_id?: string;
}) => {
  const router = useRouter();

  return (
    <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-10 fixed justify-center items-center flex">
      <Formik
        initialValues={{
          title: "",
          order_no: "",
          is_published: false,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
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
                  `/admin/courses/edit/${api_url?.split("/")?.[0]}/contents`
                );
                router.push(
                  `/admin/courses/edit/${api_url?.split("/")?.[0]}/contents`
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
          setValues,
        }: {
          isSubmitting: boolean;
          resetForm: any;
          setFieldValue: any;
          setFieldTouched: any;
          setValues: any;
        }) => {
          useEffect(() => {
            if (!!edit_id) {
              show({
                api_key: "ADMIN_COURSE_API",
                addon: `${api_url}/${edit_id}`,
              }).then((resp: any) => {
                setValues(resp?.data);
              });
            }
          }, [edit_id]);
          return (
            <div className="w-2/3 bg-white relative rounded-3xl">
              <Link
                href={`/admin/courses/edit/${
                  api_url?.split("/")?.[0]
                }/contents`}
                className="p-2 rounded-full bg-red-500 text-white absolute -right-4 -top-3"
              >
                <DynamicHeroIcon s_icon="XMarkIcon" className="size-4" />
              </Link>
              <div className="modal-inner w-full p-6">
                <Form className="grid grid-cols-8  gap-2 border pt-10">
                  <Field name="title">
                    {({ field, meta }: any) => (
                      <div className="col-span-6 flex flex-col justify-start items-stretch mt-5 ml-5">
                        <label htmlFor="title">
                          Title<sup className="text-red-700">*</sup>
                        </label>
                        <input
                          {...field}
                          placeholder="Title"
                          className="border border-gray-300 rounded h-10 p-1"
                        />
                        <p className="text-sm text-red-400 h-5">
                          {meta?.touched && meta?.error ? meta?.error : null}
                        </p>
                      </div>
                    )}
                  </Field>
                  <Field name="is_published">
                    {({ field, meta }: any) => (
                      <div className="col-span-2 flex justify-start items-center gap-x-6 m-3 mt-9">
                        <label htmlFor="is_published">Publish Content?</label>
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
          );
        }}
      </Formik>
    </div>
  );
};

export default ModuleForm;
