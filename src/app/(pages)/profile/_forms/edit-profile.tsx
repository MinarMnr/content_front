"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { kill, show, update } from "@/app/_services/api-call";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { revalidated } from "@/app/actions";
import TextEditor from "@/app/_components/text-editor";
import LangTra from "@/app/_components/lang-tra";

const EditPro = ({ edit_data }: { edit_data?: any }) => {
  const router = useRouter();

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    show({
      api_key: "DIVISON_API",
      parameters: {
        page: 1,
        size: -1,
      },
    }).then((resp: any) => {
      setDivisions(resp?.data);
    });
  }, [edit_data]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name_en: edit_data?.name_en ?? "",
        email: edit_data?.email ?? "",
        phone: edit_data?.phone ?? "",
        address: edit_data?.address ?? "",
        division_code: edit_data?.division_code ?? "",
        district_code: edit_data?.district_code ?? "",
        upload_image: "",
        about: edit_data?.about ?? "",
        educations: edit_data?.educations?.length
          ? edit_data?.educations
          : new Array<{
              institute: string;
              level: string;
              class: string;
              group: string;
              id?: number;
            }>(0),
        experiences: edit_data?.experiences?.length
          ? edit_data?.experiences
          : new Array<{
              designation: string;
              // type: string;
              institute: string;
              location: string;
              start_date: string;
              end_date: string;
              id?: number;
            }>(0),
      }}
      validationSchema={Yup.object().shape({
        name_en: Yup.string().required("Name is required"),
        email: Yup.string()
          .required("Email is required")
          .email("Please enter a valid email"),
        district_code: Yup.string().when("$division_code", {
          is: (v: any) => !!v,
          then: (schema) => schema.required("District is required"),
          otherwise: (schema) => schema.optional(),
        }),
        educations: Yup.array().of(
          Yup.object().shape({
            institute: Yup.string().optional(),
            level: Yup.string().required("Educational level is required"),
          })
        ),
        experiences: Yup.array().of(
          Yup.object().shape({
            designation: Yup.string().required("Designation is required"),
            // type: Yup.string().required("Type is required"),
            start_date: Yup.string().required("Start date is required"),
            end_date: Yup.string().optional(),
            institute: Yup.string().optional(),
            location: Yup.string().optional(),
          })
        ),
      })}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(true);
        update({ api_key: "PROFILE_API", body: values, addon: "" })
          .then((resp: any) => {
            if (resp?.status === "success") {
              toast.success(resp?.message);
              revalidated("/profile");
              router.push("/profile?segment=details");
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
            } else {
              toast.error(resp?.message);
            }
          })
          .catch((error: any) => {
            toast.error(error?.message);
          })
          .finally(() => {
            formikHelpers.setSubmitting(false);
          });
      }}
    >
      {({
        isSubmitting,
        resetForm,
        values,
        setFieldValue,
      }: {
        values: any;
        isSubmitting: boolean;
        resetForm: any;
        setFieldValue: Function;
      }) => {
        useEffect(() => {
          show({
            api_key: "DISTRICT_API",
            parameters: {
              page: 1,
              size: -1,
              division_code: values?.division_code,
            },
          }).then((resp: any) => {
            setDistricts(resp?.data);
          });
        }, [values?.division_code]);

        return (
          <Form className="w-[1080px] grid grid-cols-2 gap-x-1 max-h-[70vh] overflow-auto no-scrollbar modal-area mt-2">
            <div className=" border  top-0 col-span-2 text-xl font-bold text-cyan-900 my-2 bg-gray-100 p-2">
              <LangTra control="profile.basic_info" />
            </div>
            <Field name="name_en">
              {({ field, meta }: any) => (
                <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                  <label htmlFor="name_en">
                    <LangTra control="profile.name" />
                  </label>
                  <input
                    {...field}
                    placeholder="Name"
                    className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                  />
                  <p className="text-sm text-red-400 h-5">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </div>
              )}
            </Field>
            <Field name="email">
              {({ field, meta }: any) => (
                <div className="flex flex-col justify-start items-stretch w-full pe-1">
                  <label htmlFor="email">
                    {" "}
                    <LangTra control="profile.email" />
                  </label>
                  <input
                    {...field}
                    placeholder="E-Mail"
                    className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                  />
                  <p className="text-sm text-red-400 h-5">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </div>
              )}
            </Field>
            <Field name="phone">
              {({ field, meta }: any) => (
                <div className="flex flex-col justify-start items-stretch w-full ps-1">
                  <label htmlFor="phone">
                    {" "}
                    <LangTra control="profile.phone" />
                  </label>
                  <input
                    {...field}
                    placeholder="Mobile No."
                    className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                  />
                  <p className="text-sm text-red-400 h-5">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </div>
              )}
            </Field>
            <Field name="division_code">
              {({ field, meta }: any) => (
                <div className="flex flex-col justify-start items-stretch w-full pe-1">
                  <label htmlFor="division_code">
                    {" "}
                    <LangTra control="profile.division" />
                  </label>
                  <select
                    {...field}
                    className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                  >
                    <option>Select Division</option>
                    {divisions?.map((tada: any) => (
                      <option
                        key={tada?.division_code}
                        value={tada?.division_code}
                      >
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
            <Field name="district_code" cl>
              {({ field, meta }: any) => (
                <div className="flex flex-col justify-start items-stretch w-full ps-1">
                  <label htmlFor="district_code">
                    <LangTra control="profile.district" />
                  </label>
                  <select
                    {...field}
                    className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                  >
                    <option>Select District</option>
                    {districts?.map((tada: any) => (
                      <option
                        key={tada?.district_code}
                        value={tada?.district_code}
                      >
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
            <Field name="address">
              {({ field, meta }: any) => (
                <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                  <label htmlFor="address">
                    <LangTra control="profile.address" />
                  </label>
                  <textarea
                    {...field}
                    placeholder="Address"
                    className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                    rows={4}
                  ></textarea>
                  <p className="text-sm text-red-400 h-5">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </div>
              )}
            </Field>
            <Field name="about">
              {({ field, meta }: any) => (
                <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                  <label htmlFor="about">
                    <LangTra control="profile.about" />
                  </label>
                  <TextEditor
                    formControl={{
                      value: field?.value,
                      setFieldValue,
                      key: "about",
                      placeholder: "About",
                    }}
                  />
                  <p className="text-sm text-red-400 h-5">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </div>
              )}
            </Field>

            <div className="border-b  top-0 col-span-2 text-xl font-bold text-cyan-900 my-2 bg-gray-100 p-2 mt-6">
              <LangTra control="profile.edu_info" />
            </div>
            <FieldArray name="educations">
              {({ remove, push }) => (
                <>
                  {values?.educations?.map((tada: any, index: number) => (
                    <Fragment key={index}>
                      <div className="col-span-2 flex justify-between">
                        <span>{index + 1}.</span>
                        <button
                          type="button"
                          className="px-2 py-2 rounded-lg bg-orange-600 text-white flex justify-center items-center"
                          onClick={() => {
                            if (tada?.id) {
                              kill({
                                api_key: "PROFILE_EDUCATION_REMOVE_API",
                                addon: tada?.id,
                              }).then((resp: any) => {
                                toast.success(resp?.message);
                                remove(index);
                              });
                            } else {
                              remove(index);
                            }
                          }}
                        >
                          <DynamicHeroIcon
                            className="size-4"
                            s_icon="TrashIcon"
                          />
                        </button>
                      </div>
                      <Field name={`educations.${index}.institute`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full pe-1">
                            <label htmlFor={`educations.${index}.institute`}>
                              <LangTra control="profile.institute" />
                            </label>
                            <input
                              {...field}
                              placeholder="Institute"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`educations.${index}.level`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full ps-1">
                            <label htmlFor={`educations.${index}.level`}>
                              <LangTra control="profile.edu_level" />
                            </label>
                            <input
                              {...field}
                              placeholder="Educational Level"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`educations.${index}.class`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full pe-1">
                            <label htmlFor={`educations.${index}.class`}>
                              <LangTra control="profile.class" />
                            </label>
                            <input
                              {...field}
                              placeholder="Class"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`educations.${index}.group`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full ps-1">
                            <label htmlFor={`educations.${index}.group`}>
                              <LangTra control="profile.group" />
                            </label>
                            <input
                              {...field}
                              placeholder="Group"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                    </Fragment>
                  ))}
                  <div className="col-span-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-sky-600 text-white flex justify-center items-center float-right rounded-lg ps-12 pe-12"
                      onClick={() =>
                        push({
                          institute: "",
                          level: "",
                          class: "",
                          group: "",
                        })
                      }
                    >
                      <DynamicHeroIcon
                        className="size-4 mr-2 -ml-2"
                        s_icon="PlusIcon"
                      />
                      <LangTra control="profile.add" />
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            <div className="border-b  top-0 col-span-2 text-xl font-bold text-cyan-900 my-2 bg-gray-100 p-2 mt-6">
              <LangTra control="profile.exp_info" />
            </div>
            <FieldArray name="experiences">
              {({ remove, push }) => (
                <>
                  {values?.experiences?.map((tada: any, index: number) => (
                    <Fragment key={index}>
                      <div className="col-span-2 flex justify-between">
                        <span>{index + 1}.</span>
                        <button
                          type="button"
                          className="px-4 py-2 bg-orange-600 text-white flex justify-center items-center"
                          onClick={() => {
                            if (tada?.id) {
                              kill({
                                api_key: "PROFILE_EXPERIENCE_REMOVE_API",
                                addon: tada?.id,
                              }).then((resp: any) => {
                                toast.success(resp?.message);
                                remove(index);
                              });
                            } else {
                              remove(index);
                            }
                          }}
                        >
                          <DynamicHeroIcon
                            className="size-4"
                            s_icon="TrashIcon"
                          />
                        </button>
                      </div>
                      {/* <Field name={`experiences.${index}.type`}>
                      {({ field, meta }: any) => (
                        <div className="flex flex-col justify-start items-stretch w-full">
                          <label htmlFor={`experiences.${index}.type`}>
                            Type
                          </label>
                          <input
                            {...field}
                            placeholder="Type"
                            className="border border-gray-500 rounded h-10 p-1"
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field> */}
                      <Field name={`experiences.${index}.designation`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full pe-1">
                            <label htmlFor={`experiences.${index}.designation`}>
                              <LangTra control="profile.designation" />
                            </label>
                            <input
                              {...field}
                              placeholder="Designation"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`experiences.${index}.institute`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full ps-1">
                            <label htmlFor={`experiences.${index}.institute`}>
                              <LangTra control="profile.company_name" />
                            </label>
                            <input
                              {...field}
                              placeholder="Company Name"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`experiences.${index}.location`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full ps-1">
                            <label htmlFor={`experiences.${index}.location`}>
                              <LangTra control="profile.company_location" />
                            </label>
                            <input
                              {...field}
                              placeholder="Company Location"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`experiences.${index}.start_date`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full ps-1">
                            <label htmlFor={`experiences.${index}.start_date`}>
                              <LangTra control="profile.start_date" />
                            </label>
                            <input
                              {...field}
                              placeholder="Start Date"
                              type="date"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name={`experiences.${index}.end_date`}>
                        {({ field, meta }: any) => (
                          <div className="flex flex-col justify-start items-stretch w-full">
                            <label htmlFor={`experiences.${index}.end_date`}>
                              <LangTra control="profile.end_date" />
                            </label>
                            <input
                              {...field}
                              placeholder="End Date"
                              type="date"
                              className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                    </Fragment>
                  ))}
                  <div className="col-span-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-sky-600 text-white flex justify-center items-center float-right rounded-lg ps-12 pe-12"
                      onClick={() =>
                        push({
                          designation: "",
                          type: "",
                          institute: "",
                          location: "",
                          start_date: "",
                          end_date: "",
                        })
                      }
                    >
                      <DynamicHeroIcon
                        className="size-4 mr-2 -ml-2"
                        s_icon="PlusIcon"
                      />
                      <LangTra control="profile.add" />
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
            <div className="sticky  py-2 bottom-0 flex justify-end items-center col-span-2 gap-3 bg-gray-50 p-3 mt-6  border-gray-200 border-t">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-full"
                onClick={resetForm}
              >
                <LangTra control="all_courses.reset" />
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-full"
                disabled={isSubmitting}
              >
                <LangTra control="all_courses.update" />
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditPro;
