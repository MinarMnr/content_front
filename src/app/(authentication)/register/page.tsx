"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useSearchParams } from "next/navigation";

import {
  UserIcon,
  DevicePhoneMobileIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { Field, Formik, FormikHelpers, Form } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormikProps } from "@/app/_services/FormikCreate";
import * as Yup from "yup";
import { post } from "@/app/_services/api-call";
import { toast } from "react-toastify";

const Page = (props: any) => {
  const searchParams = useSearchParams();

  const queryData: any = searchParams.get("res");

  const result = JSON.parse(atob(decodeURIComponent(queryData)));

  const router = useRouter();
  !result && router.push("/");

  let initial = {};
  if (result?.is_exist == 1) {
    initial = {
      type: ["", Yup.string().required("Type is required")],
      name_en: [
        result?.payload?.name_en,
        Yup.string().required("Name is required"),
      ],
      code: [result?.code, Yup.string().required("Code is required")],
      phone: [
        result?.payload?.phone,
        Yup.string().required("Mobile No is required"),
      ],
      email: [
        result?.payload?.email,
        Yup.string().required("Email is required").email("Enetr a valid email"),
      ],
    };
  } else {
    initial = {
      type: ["", Yup.string().required("Type is required")],
      name_en: ["", Yup.string().required("Name is required")],
      phone: [
        result?.payload?.phone,
        Yup.string().required("Mobile No is required"),
      ],
      code: [result?.code, Yup.string().required("Code is required")],
      email: [
        "",
        Yup.string().required("Email is required").email("Enetr a valid email"),
      ],
      //signature: ["", Yup.string().optional()],
      password: ["", Yup.string().required("Password is required")],
      password_confirmation: [
        "",
        Yup.string()
          .required("Confirm Password is required")
          .oneOf([Yup.ref("password")], "Confirm Password must match Password"),
      ],
    };
  }

  const registerForm = new FormikProps(
    initial,
    (values: any, formikHelpers: FormikHelpers<any>) => {
      formikHelpers.setSubmitting(true);
      post({ api_key: "COMPLETE_REGISTER_API", body: values, addon: "" })
        .then((resp: any) => {
          console.log(resp, "sad");
          //return;
          if (resp?.status === "success") {
            router.push(resp?.data);
            toast.success("Success!");
            formikHelpers.resetForm({});
            // setTimeout(() => {
            //   router.push("/register/success");
            // }, 1000);
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
            resp?.message && toast.error(resp?.message);
          } else {
            resp?.message && toast.error(resp?.message);
          }
        })
        .catch((error: any) => {
          error?.message && toast.error(error?.message);
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    }
  );

  return (
    <div className="container mx-auto pt-50 pb-90px pl-20 pr-20 mt-8">
      {/* <ToastContainer /> */}
      <div className="flex w-full">
        <div className="md:w-2/4">
          <h3 className="text-4xl  text-green-800 text-center">
            Free online courses with <br />
            animation, videos
          </h3>
          <Image
            className="mx-auto"
            src={"/left-pic.svg"}
            alt={""}
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-2/4">
          <div className="pl-28 pr-28 login-right">
            <div className="bg-green-800  pt-0 shadow-gray-500">
              <Link href="/">
                <div className="header-login relative rounded-t-xl">
                  <div className="logo-login  bg-white rounded-full">
                    <Image
                      className="mx-auto relative top-11"
                      src={"/logo.png"}
                      alt={""}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </Link>

              <Formik {...registerForm?.getFormik()}>
                {({
                  isSubmitting,
                  setFieldValue,
                  errors,
                }: {
                  isSubmitting: boolean;
                  setFieldValue: any;
                  errors: any;
                }) => {
                  //useEffect(() => {}, []);
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
                                <option value="Learner">Student</option>
                                <option value="Instructor">Teacher</option>
                              </select>
                            </div>
                            <p className="pl-5 text-xs text-red-400 h-4">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </>
                        )}
                      </Field>
                      <Field name="name_en">
                        {({ field, meta }: any) => (
                          <>
                            <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                              <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                                <InformationCircleIcon className="size-6 top-1 left-1 relative text-gray-300" />
                              </span>
                              <input
                                {...field}
                                disabled={result?.is_exist == 1 ? true : false}
                                placeholder="Name"
                                className={`py-1 border-0 w-70 ${
                                  result?.is_exist == 1 && "text-gray-600"
                                }`}
                              />
                            </div>
                            <p className="pl-5 text-xs text-red-400 h-4">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
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
                                disabled={result?.is_exist == 1 ? true : false}
                                placeholder="E-Mail"
                                className={`py-1 border-0 w-70 ${
                                  result?.is_exist == 1 && "text-gray-600"
                                }`}
                              />
                            </div>
                            <p className="pl-5 text-xs text-red-400 h-4">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </>
                        )}
                      </Field>
                      <Field name="phone">
                        {({ field, meta }: any) => (
                          <>
                            <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                              <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                                <DevicePhoneMobileIcon className="size-6 top-1 left-1 relative text-gray-300" />
                              </span>
                              <input
                                {...field}
                                disabled={true}
                                placeholder="Mobile No"
                                className="py-1 border-0 w-70 text-gray-600"
                              />
                            </div>
                            <p className="pl-5 text-xs text-red-400 h-4">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </>
                        )}
                      </Field>
                      {result?.is_exist == 0 && (
                        <>
                          <Field name="password">
                            {({ field, meta }: any) => (
                              <>
                                <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                                  <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                                    <LockClosedIcon className="size-6 top-1 left-1 relative text-gray-300" />
                                  </span>
                                  <input
                                    {...field}
                                    placeholder="Password"
                                    type="password"
                                    className="py-1 border-0 w-70"
                                  />
                                </div>
                                <p className="pl-5 text-xs text-red-400 h-4">
                                  {meta?.touched && meta?.error
                                    ? meta?.error
                                    : null}
                                </p>
                              </>
                            )}
                          </Field>
                          <Field name="password_confirmation">
                            {({ field, meta }: any) => (
                              <>
                                <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                                  <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                                    <LockClosedIcon className="size-6 top-1 left-1 relative text-gray-300" />
                                  </span>
                                  <input
                                    {...field}
                                    placeholder="Confirm Password"
                                    type="password"
                                    className="py-1 border-0 w-70"
                                  />
                                </div>
                                <p className="pl-5 text-xs text-red-400 h-4">
                                  {meta?.touched && meta?.error
                                    ? meta?.error
                                    : null}
                                </p>
                              </>
                            )}
                          </Field>
                        </>
                      )}
                      <div className="pt-2">
                        <button
                          className="w-full text-white  py-3 rounded-full text-lg bg-login hover:text-green-800"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Register
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

              <div className="w-full pl-20 pr-20">
                <div className="spe-login relative mt-0-custom mb-7">
                  <span className="absolute or-spnan bg-green-800 text-white pl-4 pr-4 italic">
                    or
                  </span>
                </div>
              </div>
              <div className="flex pl-14 pb-10">
                <div className="text-lg mr-3 text-white">
                  Already have an account?
                  <Link href="/api/auth/authorize">
                    <button className="border border-dashed border-gray-400 p-2 pl-5 pr-5 ml-2 rounded-full text-green-100 text-lg hover:bg-green-900 hover:text-white">
                      Sign in →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
