"use client";

import MultiCheckbox from "@/app/_components/multi-checkbox";
import { post, show, update } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const Page = ({ edit_data, addon }: { edit_data?: any; addon?: string }) => {
  const router = useRouter();
  const [allCourseType, setAllCourseType]: [
    any[],
    React.Dispatch<React.SetStateAction<any>>
  ] = useState([]);
  const [allSubCategory, setSubCategory] = useState<any[]>([]);

  useEffect(() => {
    show({
      api_key: "ADMIN_COURSE_TYPE_API",
      parameters: { page: 1, size: -1 },
    })
      .then((resp: any) => {
        setAllCourseType(resp?.data);
      })
      .catch((error: any) => {
        setAllCourseType([]);
      });
    show({
      api_key: "ADMIN_SUB_CATEGORY_API",
      parameters: { page: 1, size: -1 },
    })
      .then((resp: any) => {
        setSubCategory(resp?.data);
      })
      .catch((error: any) => {
        setSubCategory([]);
      });
  }, []);

  const handleRedirect = async () => {
    revalidatePath(`/admin/settings/category`, "page");

    router.push(`/admin/settings/category`);
  };

  return (
    <Formik
      initialValues={{
        title_en: edit_data?.title_en ?? "",
        title_bn: edit_data?.title_bn ?? "",
        course_type_id: edit_data?.course_type_id
          ? Number(edit_data?.course_type_id)
          : "",
        category_map: edit_data?.sub_categories ?? [],
      }}
      validationSchema={Yup.object().shape({
        title_en: Yup.string().required("Title in English is required"),
        title_bn: Yup.string().optional(),
        course_type_id: Yup.number().required("Course Type is required"),
      })}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(true);
        (edit_data ? update : post)({
          api_key: "ADMIN_CATEGORY_API",
          body: values,
          addon: addon ?? "",
        })
          .then((resp: any) => {
            if (resp?.status === "success") {
              revalidated("/admin/settings/category");
              router.push(`/admin/settings/category`);
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
        values,
      }: {
        isSubmitting: boolean;
        resetForm: any;
        setFieldValue: any;
        values: any;
      }) => (
        <Form className="w-full grid grid-cols-2 gap-x-1">
          <Field name="course_type_id">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="course_type_id">Course Type</label>
                <select
                  {...field}
                  className="border border-gray-500 rounded h-10 p-1"
                >
                  <option>Select Course Type</option>
                  {allCourseType?.map((tada: any) => (
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
          <Field name="title_en">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="title_en">Title in English</label>
                <input
                  {...field}
                  placeholder="Title in English"
                  className="border border-gray-500 rounded h-10 p-1"
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
                  className="border border-gray-500 rounded h-10 p-1"
                />
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <Field name="category_map">
            {({ field, meta }: any) => (
              <MultiCheckbox
                name={field?.name}
                label="Affiliated Sub categories"
                setFieldValue={setFieldValue}
                value={values?.category_map}
                dataList={allSubCategory}
                output_key="id"
              />
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

// checked={
//   !!values?.category_map?.find(
//     (bada: any) =>
//       Number(bada?.sub_category_id) === Number(tada?.id)
//   )
// }
// onChange={(e) => {
//   console.log(e);
//   if (e?.target?.checked) {
//     setFieldValue(
//       values?.category_map?.filter(
//         (bada: any) =>
//           Number(bada?.sub_category_id) !== Number(tada?.id)
//       )
//     );
//   } else {
//     setFieldValue([
//       ...values?.category_map,
//       {
//         sub_category_id: tada?.id,
//       },
//     ]);
//   }
// }}
