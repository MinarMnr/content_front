"use client";

import { UserIcon } from "@heroicons/react/20/solid";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormikProps } from "@/app/_services/FormikCreate";
import * as Yup from "yup";
import { post } from "@/app/_services/api-call";
import { toast } from "react-toastify";

const Step3 = ({
  cache_storer,
  data,
  setData,
}: {
  cache_storer: any;
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}) => {
  const router = useRouter();
  const form3 = new FormikProps(
    {
      type: ["", Yup.string().required("Type is required")],
      name_en: ["", Yup.string().required("Name is required")],
      email: [
        "",
        Yup.string().required("Email is required").email("Enetr a valid email"),
      ],
      signature: ["", Yup.string().optional()],
      password: ["", Yup.string().required("Password is required")],
      password_confirmation: [
        "",
        Yup.string()
          .required("Confirm Password is required")
          .oneOf([Yup.ref("password")], "Confirm Password must match Password"),
      ],
    },
    (values: any, formikHelpers: FormikHelpers<any>) => {
      formikHelpers.setSubmitting(true);
      post({ api_key: "REGISTER_API", body: values, addon: "" })
        .then((resp: any) => {
          if (resp?.status === "success") {
            toast.success("Success!");
            formikHelpers.resetForm({});
            setTimeout(() => {
              router.push("/register/success");
            }, 3000);
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
    }
  );

  return (
    <Formik {...form3?.getFormik()}>
      {({
        isSubmitting,
        setFieldValue,
        errors,
      }: {
        isSubmitting: boolean;
        setFieldValue: any;
        errors: any;
      }) => {
        useEffect(() => {
          if (data?.signature) {
            setFieldValue("signature", data?.signature);
          } else {
            router.push("/register?step=1");
          }
        }, [data?.signature]);
        return (
          <Form className="p-20 pl-14 pr-14 pb-9 flex flex-col gap-y-1">
            <h2 className="text-center text-green-50 mb-2 text-xl">
              Welcome to Edutube! Let’s begin the adventure
            </h2>
            <Field name="type">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <select {...field} className="py-1 border-0 w-70">
                      <option>Select User Type</option>
                      <option value="Learner">Learner / Student</option>
                      <option value="Instructor">Instructor / Teacher</option>
                    </select>
                  </div>
                  <p className="pl-5 text-xs text-red-400 h-4">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </>
              )}
            </Field>
            <Field name="name_en">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <input
                      {...field}
                      placeholder="Name"
                      className="py-1 border-0 w-70"
                    />
                  </div>
                  <p className="pl-5 text-xs text-red-400 h-4">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </>
              )}
            </Field>
            <Field name="email">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <input
                      {...field}
                      placeholder="E-Mail"
                      className="py-1 border-0 w-70"
                    />
                  </div>
                  <p className="pl-5 text-xs text-red-400 h-4">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </>
              )}
            </Field>
            <Field name="password">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <input
                      {...field}
                      placeholder="Password"
                      type="password"
                      className="py-1 border-0 w-70"
                    />
                  </div>
                  <p className="pl-5 text-xs text-red-400 h-4">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </>
              )}
            </Field>
            <Field name="password_confirmation">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <input
                      {...field}
                      placeholder="Confirm Password"
                      type="password"
                      className="py-1 border-0 w-70"
                    />
                  </div>
                  <p className="pl-5 text-xs text-red-400 h-4">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </>
              )}
            </Field>
            <div className="pt-2">
              <button
                className="w-full text-white  py-3 rounded-full text-lg bg-login hover:text-green-800"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </div>
            {errors?.signature ? (
              <div className="w-full text-center text-red-500">
                {errors?.signature}
              </div>
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step3;
