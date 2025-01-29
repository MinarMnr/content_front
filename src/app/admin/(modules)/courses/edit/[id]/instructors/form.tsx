"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { update, post, show } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const InstructorForm = ({
  api_url,
  edit_data,
  edit_id,
}: {
  api_url: string;
  edit_data?: any;
  edit_id?: string;
}) => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const types: any[] = [
    // {
    //   id: "Owner",
    //   title_en: "Owner",
    // },
    {
      id: "Maintainer",
      title_en: "Maintainer",
    },
    {
      id: "Guest",
      title_en: "Guest",
    },
  ];

  useEffect(() => {
    show({
      api_key: "ADMIN_INSTRUCTOR_API",
      parameters: {
        page: 1,
        size: -1
      },
    }).then((resp: any) => {
      if (resp?.status === "success") {
        setUsers(resp?.data);
      } else {
        setUsers([]);
      }
    });
  }, []);
  return (
    <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-10 fixed justify-center items-center flex">
      <Formik
        initialValues={{
          user_id: edit_data?.user_id ?? "1",
          type: edit_data?.type ?? "",
        }}
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
                  `admin/courses/edit/${api_url?.split("/")?.[0]}/instructors`
                );
                router.push(
                  `/admin/courses/edit/${api_url?.split("/")?.[0]}/instructors`
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
          <div className="w-[700px] bg-white relative  rounded-3xl">
            <Link
              href={`/admin/courses/edit/${
                api_url?.split("/")?.[0]
              }/instructors`}
              className="p-2 rounded-full bg-red-500 text-white absolute -right-4 -top-3"
            >
              <DynamicHeroIcon s_icon="XMarkIcon" className="size-5" />
            </Link>

            <div className="modal-inner w-full p-6">
              <Form className="grid grid-cols-2   border ">
                <Field name="user_id">
                  {({ field, meta }: any) => (
                    <div className="flex flex-col justify-start items-stretch w-full mt-12 pl-5 pr-1">
                      <label htmlFor="user_id">Instructor</label>
                      <select
                        {...field}
                        className="border border-gray-300 rounded h-10 p-1"
                      >
                        <option>Select Instructor</option>
                        {(users as any[])?.map((tada: any) => (
                          <option key={tada?.id} value={tada?.id}>
                            {tada?.name_en}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-red-400 h-5">
                        {meta?.touched && meta?.error ? meta?.error : null}
                      </p>
                    </div>
                  )}
                </Field>
                <Field name="type">
                  {({ field, meta }: any) => (
                    <div className="flex flex-col justify-start items-stretch w-full mt-12 pr-5 pl-1">
                      <label htmlFor="type">Instructor Type</label>
                      <select
                        {...field}
                        className="border border-gray-300 rounded h-10 p-1"
                      >
                        <option>Select Instructor Type</option>
                        {types?.map((tada: any) => (
                          <option key={tada?.id} value={tada?.id}>
                            {tada?.title_en}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-red-400 h-5">
                        {meta?.touched && meta?.error ? meta?.error : null}
                      </p>
                    </div>
                  )}
                </Field>
                <div className="col-span-8 flex justify-end items-center p-4 gap-2 border-t bg-gray-50 mt-10 ">
                  <button
                    className="bg-red-600 text-white rounded-md px-4 py-2"
                    type="button"
                    disabled={!!isSubmitting}
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="bg-emerald-600 text-white rounded-md px-4 py-2"
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

export default InstructorForm;
