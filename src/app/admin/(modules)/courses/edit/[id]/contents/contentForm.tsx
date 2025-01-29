"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { update, post, show } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ExamForm from "./examForm";
import * as Yup from "yup";

const ContentForm = ({
  api_url,
  edit_id,
}: {
  api_url: string;
  edit_id?: string;
}) => {
  const router = useRouter();
  const dropdowns = {
    content_types: [
      {
        id: "Audio/Video",
        title_en: "Audio/Video",
      },
      {
        id: "Document",
        title_en: "Document",
      },
      {
        id: "Exam",
        title_en: "Exam",
      },
    ],
    access_types: [
      {
        id: "Guest",
        title_en: "Guest",
      },
      {
        id: "Authorized",
        title_en: "Authorized",
      },
      {
        id: "Subscribed",
        title_en: "Subscribed",
      },
    ],
  };

  return (
    <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-10 fixed justify-center items-center flex">
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          order_no: "",
          is_published: 0,
          content_type: "",
          duration: "",
          access_type: "",
          upload_content: null,
          exam_strict_submission: 1,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
          content_type: Yup.string().required("Content Type is Required"),
          access_type: Yup.string().required("Access Type is Required"),
        })}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          formikHelpers.setSubmitting(true);
          post({
            api_key: "ADMIN_COURSE_API",
            body: {
              ...values,
              _method: edit_id ? "PUT" : "POST",
            },
            addon: `${api_url}${edit_id ? `/${edit_id}` : ""}`,
            is_form: true,
          })
            .then((resp: any) => {
              if (resp?.status === "success") {
                toast.success(resp?.message);
                revalidated(
                  `admin/courses/edit/${api_url?.split("/")?.[0]}/contents`
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
          values,
        }: {
          isSubmitting: boolean;
          resetForm: any;
          setFieldValue: any;
          setFieldTouched: any;
          setValues: any;
          values: any;
        }) => {
          const [fileType, setFileType] = useState("");

          useEffect(() => {
            if (!!edit_id) {
              show({
                api_key: "ADMIN_COURSE_API",
                addon: `${api_url}/${edit_id}`,
              }).then((resp: any) => {
                if (resp?.status === "success") {
                  setValues(
                    (({ document, ...others }) => ({
                      ...others,
                    }))(resp?.data)
                  );
                }
              });
            }
          }, [edit_id]);
          useEffect(() => {
            switch (values?.content_type) {
              case "Audio/Video":
                setFileType("video/*, audio/*");
                break;
              case "Document":
                setFileType("image/*, .pdf, .docx");
                break;
              case "Exam":
                setFileType("EXAM");
                break;
              default:
                break;
            }
          }, [values?.content_type]);
          return (
            <div className="w-2/3 bg-white relative rounded-3xl">
              <Link
                href={`/admin/courses/edit/${
                  api_url?.split("/")?.[0]
                }/contents`}
                className="p-2 rounded-full bg-red-500 text-white absolute -right-4 -top-3"
              >
                <DynamicHeroIcon s_icon="XMarkIcon" className="size-5" />
              </Link>
              <div className="p-8">
                <div className="modal-inner w-full border">
                  <Form className="grid grid-cols-8  gap-2">
                    <Field name="title">
                      {({ field, meta }: any) => (
                        <div className="col-span-8 flex flex-col justify-start items-stretch ml-5 mr-5 mt-6">
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
                    {/* <Field name="order_no">
                  {({ field, meta }: any) => (
                    <div className="col-span-2 flex flex-col justify-start items-stretch">
                      <label htmlFor="order_no">Order No.</label>
                      <input
                        {...field}
                        placeholder="Order No."
                        className="border border-gray-500 rounded h-10 p-1"
                      />
                      <p className="text-sm text-red-400 h-5">
                        {meta?.touched && meta?.error ? meta?.error : null}
                      </p>
                    </div>
                  )}
                </Field> */}
                    <Field name="content_type">
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex flex-col justify-start items-stretch ml-5">
                          <label htmlFor="content_type">
                            Content Type<sup className="text-red-700">*</sup>
                          </label>
                          <select
                            {...field}
                            className="border border-gray-300 rounded h-10 p-1"
                          >
                            <option>Select Content Type</option>
                            {dropdowns?.content_types?.map((tada: any) => (
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
                    <Field name="access_type">
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex flex-col justify-start items-stretch">
                          <label htmlFor="access_type">
                            Access Type<sup className="text-red-700">*</sup>
                          </label>
                          <select
                            {...field}
                            className="border border-gray-300 rounded h-10 p-1"
                          >
                            <option>Select Access Type</option>
                            {dropdowns?.access_types?.map((tada: any) => (
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
                    <Field name="is_published">
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex justify-start items-center gap-x-6 pl-8">
                          <label htmlFor="is_published">Publish Content?</label>
                          <input
                            {...field}
                            checked={!!field?.value}
                            onChange={(e) =>
                              setFieldValue(
                                "is_published",
                                Number(!!e?.target?.checked)
                              )
                            }
                            onBlur={() => {
                              setFieldTouched("is_published");
                            }}
                            placeholder="Publish Content?"
                            className="border border-gray-300 rounded h-10 p-1"
                            type="checkbox"
                            id="is_published"
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    {values?.content_type == "Document" ||
                    values?.content_type == "Exam" ? (
                      <Field name="duration">
                        {({ field, meta }: any) => (
                          <div className="col-span-2 flex flex-col justify-start items-stretch pr-6">
                            <label htmlFor="duration">Duration</label>
                            <div className="flex justify-start items-stretch h-10 border border-gray-300 rounded">
                              <input
                                {...field}
                                placeholder="Enter duration in minutes"
                                className="p-1 flex-grow"
                                type="text"
                              />
                              <div className="bg-slate-200 rounded-e flex justify-center items-center p-2">
                                Minutes
                              </div>
                            </div>
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                    ) : null}
                    {fileType ? (
                      fileType !== "EXAM" ? (
                        <Field name="upload_content">
                          {({ field, meta }: any) => (
                            <div className="col-span-8 flex flex-col justify-start items-stretch">
                              <div className="flex justify-start items-center">
                                <div className="flex flex-col justify-start items-center border border-dashed p-8 ml-4 bg-gray-50">
                                  <input
                                    type="file"
                                    accept={fileType}
                                    id="upload_content"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                      let file = e?.target?.files?.[0];
                                      if (!!file) {
                                        setFieldValue("upload_content", file);
                                      } else {
                                        setFieldValue("upload_content", null);
                                      }
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("upload_content");
                                    }}
                                  />
                                  <button
                                    className="h-3/4 w-full flex flex-col justify-center items-center gap-y-2"
                                    onClick={() => {
                                      document
                                        .getElementById("upload_content")
                                        ?.click();
                                    }}
                                    disabled={!!isSubmitting}
                                    type="button"
                                  >
                                    <DynamicHeroIcon
                                      s_icon="PlusCircleIcon"
                                      className="size-10 text-gray-500"
                                    />
                                    <span className="text-xl text-gray-500">
                                      {field?.value?.name || "Upload Content"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-red-400 h-5">
                                {meta?.touched && meta?.error
                                  ? meta?.error
                                  : null}
                              </p>
                            </div>
                          )}
                        </Field>
                      ) : (
                        <ExamForm
                          question_list={values?.questions}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                        />
                      )
                    ) : null}
                    <div className="col-span-8 flex justify-end items-center p-3 gap-2 border-t bg-gray-50 mt-6">
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
                        {isSubmitting
                          ? "Submitting..."
                          : edit_id
                          ? "Update"
                          : "Save"}
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContentForm;
