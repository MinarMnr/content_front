"use client";

import React, { useEffect, useState } from "react";
import Modal from "../admin/_reusables/modal";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { post } from "../_services/api-call";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";
import LangTra from "./lang-tra";

const Star = ({
  identifier,
  size,
  gradientFill,
}: {
  identifier: string;
  size: number;
  gradientFill: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
    >
      <defs>
        <linearGradient
          id={`starGradient${identifier}`}
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" style={{ stopColor: "#ee6200", stopOpacity: 1 }} />
          <stop
            offset={`${gradientFill ? gradientFill : 0}%`}
            style={{ stopColor: "#ee6403", stopOpacity: 1 }}
          />
          <stop
            offset={`${gradientFill ? gradientFill : 0}%`}
            style={{ stopColor: "#bbbbbb", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#bbbbbb", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <polygon
        points="50,10 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
        fill={`url(#starGradient${identifier})`}
      />
    </svg>
  );
};

const RatingForm = ({
  edit_data,
  addon,
  close_modal,
  call_back,
}: {
  edit_data?: any;
  addon?: string;
  close_modal?: any;
  call_back?: any;
}) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        rating_point: edit_data?.rating_point ?? 0.0,
        comments: edit_data?.comments ?? "",
      }}
      validationSchema={Yup.object().shape({
        rating_point: Yup.string().required("Rating is required"),
      })}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(true);
        post({
          api_key: "COURSE_API",
          body: values,
          addon: addon ? `${addon}/ratings` : "",
        })
          .then((resp: any) => {
            if (resp?.status === "success") {
              toast.success(resp?.message);
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
          .catch((error: any) => {
            toast.error(error?.error);
          })
          .finally(() => {
            formikHelpers.setSubmitting(false);
            call_back();
            close_modal(false);
          });
      }}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
        resetForm,
        setFieldTouched,
      }: {
        values: any;
        setFieldValue: (
          field: string,
          value: any,
          shouldValidate?: boolean
        ) => void;
        isSubmitting: boolean;
        resetForm: () => void;
        setFieldTouched: any;
      }) => (
        <Form className="flex flex-col justify-start items-start gap-y-2 bg-white p-4 w-[800px]">
          <Field name="rating_point">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-fit">
                <label htmlFor="rating_point">
                  Rating<sup className="text-red-700">*</sup>
                </label>
                <div className="flex justify-between items-center">
                  {Array.from({ length: 5 }, (tada: unknown, i: number) => (
                    <StarIcon
                      key={i}
                      onClick={() => {
                        setFieldValue(field?.name, i + 1);
                        setFieldTouched(field?.name);
                      }}
                      className={`size-6 ${
                        field?.value >= i + 1
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-red-400 h-5">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <Field name="comments">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch w-full">
                <label htmlFor="comments">Comments</label>
                <ReactQuill
                  theme="snow"
                  value={field?.value}
                  onChange={(value) => {
                    setFieldValue(field?.name, value);
                  }}
                  onBlur={() => {
                    setFieldTouched(field?.name);
                  }}
                  placeholder="Enter Comments"
                  className="h-[200px] mb-5"
                />
                <p className="text-sm text-red-400 h-5 mt-12">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <div className="flex justify-end items-center gap-3 w-full">
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
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Rating = ({
  rating,
  cid,
  edit_data,
  url_slug,
  size,
  callback,
}: {
  rating: number;
  cid?: string;
  edit_data?: any;
  url_slug?: string;
  size?: number;
  callback?: any;
}) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal ? (
        <Modal closeModal={setModal}>
          <RatingForm
            addon={url_slug}
            edit_data={edit_data}
            close_modal={setModal}
            call_back={callback}
          />
        </Modal>
      ) : null}
      <div className="flex flex-col justify-start items-end w-fit gap-2">
        <div className="flex justify-evenly items-center z-10">
          {Array?.from({ length: 5 }, (tada: unknown, r_i: number) => (
            <Star
              key={`${r_i}`}
              identifier={`${cid}_${r_i}`}
              size={size ?? 24}
              gradientFill={
                Math.floor(rating) > r_i
                  ? 100
                  : Math.floor(rating) < r_i
                  ? 0
                  : (rating * 10 - Math.floor(rating) * 10) * 10
              }
            />
          ))}
          {rating ? (
            <label className="pl-1">
              {"( "}
              <LangTra
                control="value"
                data={{ value: Number(rating)?.toFixed(1) }}
              />
              {" )"}
            </label>
          ) : null}
        </div>
        {edit_data ? (
          <button
            className="flex-grow flex justify-start items-center pt-1 gap-1 border-b"
            onClick={() => setModal(true)}
          >
            <StarIcon className="size-6 text-orange-400" />
            <span className="pt-[5px]">
              <LangTra control="rating.add_review" />
            </span>
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Rating;
