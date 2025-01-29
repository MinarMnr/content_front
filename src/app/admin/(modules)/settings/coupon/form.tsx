"use client";

import { post, show, update } from "@/app/_services/api-call";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { revalidated } from "@/app/actions";
import MultiCheckbox from "@/app/_components/multi-checkbox";

const Page = ({ edit_data, addon }: { edit_data?: any; addon?: string }) => {
  const router = useRouter();

  const discount_type = [
    {
      id: "Fixed",
      title_en: "Fixed",
    },
    {
      id: "Percentage",
      title_en: "Percentage",
    },
  ];
  const coupon_type = [
    {
      id: "All",
      title_en: "All",
    },
    {
      id: "Course",
      title_en: "Course",
    },
  ];

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    show({
      api_key: "ADMIN_COURSE_API",
      parameters: {
        page: 1,
        size: -1,
      },
    }).then((resp: any) => {
      setCourseList(resp?.data);
    });
  }, []);

  return (
    <Formik
      initialValues={{
        title: edit_data?.title ?? "",
        code: edit_data?.code ?? "",
        discount_type: edit_data?.discount_type ?? "Fixed",
        discount: edit_data?.discount ?? "",
        type: edit_data?.type ?? "",
        courses: edit_data?.courses ?? [],
        redeem_from: edit_data?.redeem_from
          ? edit_data?.redeem_from?.split(" ")?.[0]
          : "",
        expire_at: edit_data?.expire_at
          ? edit_data?.expire_at?.split(" ")?.[0]
          : "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Title is required"),
        code: Yup.string().required("Code is required"),
        discount: Yup.number()
          .required("Discount is required")
          .min(1, "Discount can not be less than 1"),
        redeem_from: Yup.date().required("Redeem date is required"),
        expire_at: Yup.date()
          .required("Expire date is required")
          .min(
            Yup.ref("redeem_from"),
            "Expire date can not be before redeem date"
          ),
      })}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(true);
        (edit_data ? update : post)({
          api_key: "ADMIN_COUPON_API",
          body: values,
          addon: addon ?? "",
        })
          .then((resp: any) => {
            if (resp?.status === "success") {
              revalidated(`/admin/settings/coupon`);
              router.push(`/admin/settings/coupon`);
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
        touched,
        errors,
        isSubmitting,
        resetForm,
        setFieldValue,
        values,
      }: {
        touched: any;
        errors: any;
        isSubmitting: boolean;
        resetForm: () => void;
        setFieldValue: any;
        values: any;
      }) => (
        <Form className="w-full grid grid-cols-2 gap-x-1">
          <Field name="title">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
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
          <Field name="code">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="code">
                  Code<sup className="text-red-700">*</sup>
                </label>
                <input
                  {...field}
                  placeholder="Code"
                  className="border border-gray-300 rounded h-10 p-1"
                />
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <div className="flex flex-col">
            <label htmlFor="discount">
              Discount<sup className="text-red-700">*</sup>
            </label>
            <div className="flex w-full border border-gray-300 rounded">
              <Field name="discount">
                {({ field, meta }: any) => (
                  <input
                    {...field}
                    placeholder="Discount"
                    className="h-10 ms-1 p-1 flex-grow"
                    type="number"
                  />
                )}
              </Field>
              <Field name="discount_type">
                {({ field, meta }: any) => (
                  <div className="flex px-3 h-full bg-slate-300 gap-x-6">
                    {discount_type?.map((tada: any) => (
                      <div
                        className="w-fit flex items-center gap-1"
                        key={`discount_type_${tada?.id}`}
                      >
                        <input
                          {...field}
                          className="h-10"
                          type="radio"
                          value={tada?.id}
                          id={`discount_type_${tada?.id}`}
                          checked={field?.value === tada?.id}
                        />
                        <label
                          htmlFor={`discount_type_${tada?.id}`}
                          style={{ marginBottom: "0px" }}
                        >
                          {tada?.title_en === "Percentage" ? "%" : "/="}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </Field>
            </div>
            <p className="text-sm text-red-400 h-5">
              {touched?.discount && errors?.discount ? errors?.discount : null}
            </p>
          </div>
          <Field name="type">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="type">Type</label>
                <select
                  {...field}
                  className="border border-gray-300 rounded h-10 p-1"
                >
                  <option>Select Type</option>
                  {coupon_type?.map((tada: any) => (
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
          <Field name="redeem_from">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="redeem_from">
                  Redeem Date<sup className="text-red-700">*</sup>
                </label>
                <input
                  {...field}
                  placeholder="Redeem Date"
                  className="border border-gray-300 rounded h-10 p-1"
                  type="date"
                />
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <Field name="expire_at">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="expire_at">
                  Expire Date<sup className="text-red-700">*</sup>
                </label>
                <input
                  {...field}
                  placeholder="Expire Date"
                  className="border border-gray-300 rounded h-10 p-1"
                  type="date"
                />
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          {values?.type === "Course" && (
            <Field name="courses">
              {({ field, meta }: any) => (
                <MultiCheckbox
                  name={field?.name}
                  label="Affiliated Courses"
                  setFieldValue={setFieldValue}
                  value={values?.courses}
                  dataList={courseList}
                  text_accessor="title"
                  className="col-span-2 mb-2"
                />
              )}
            </Field>
          )}
          <div className="flex justify-end items-center col-span-2 gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-xl"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl"
              disabled={isSubmitting}
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
