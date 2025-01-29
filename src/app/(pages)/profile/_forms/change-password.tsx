"use client";

import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { post } from "@/app/_services/api-call";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        previous_password: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={Yup.object().shape({
        previous_password: Yup.string().required(
          "Previous password is required"
        ),
        password: Yup.string()
          .required("Password is required")
          .notOneOf(
            [Yup.ref("previous_password")],
            "Password can't match previous password"
          ),
        password_confirmation: Yup.string()
          .required("Confirm password is required")
          .oneOf([Yup.ref("password")], "Confirm password must match Password"),
      })}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(true);
        post({ api_key: "CHANGE_PASSWORD_API", body: values, addon: "" })
          .then((resp: any) => {
            if (resp?.status === "success") {
              toast.success("Success!");
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
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <Form className="w-[500px] flex flex-col gap-x-1 max-h-[70vh] overflow-auto modal-area">
          <h2 className="text-start text-green-700 text-2xl mt-4 mb-3 relative -top-4">
            Update your password
          </h2>
          <Field name="previous_password">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch py-2 text-left">
                <label htmlFor="previous_password">Previous Password</label>
                <input
                  {...field}
                  id={"previous_password"}
                  placeholder="Previous Password"
                  className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                />
                <p className="text-sm text-red-400">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <Field name="password">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch py-2 text-left">
                <label htmlFor="password">New Password</label>
                <input
                  {...field}
                  id="password"
                  placeholder="Password"
                  type="password"
                  className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                />
                <p className="text-sm text-red-400">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <Field name="password_confirmation">
            {({ field, meta }: any) => (
              <div className="flex flex-col justify-start items-stretch py-2 text-left">
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                  {...field}
                  id="password_confirmation"
                  placeholder="Confirm Password"
                  type="password"
                  className="py-2 border border-gray-300 rounded-md ps-4 mt-1"
                />
                <p className="text-sm text-red-400">
                  {meta?.touched && meta?.error ? meta?.error : null}
                </p>
              </div>
            )}
          </Field>
          <div className="pt-2 mt-4">
            <button
              className="w-full bg-green-800 border border-green-800 text-white  py-2 rounded-full text-lg bg-login hover:bg-white hover:text-green-800"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
