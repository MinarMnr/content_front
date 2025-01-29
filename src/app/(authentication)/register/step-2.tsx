"use client";

import { UserIcon } from "@heroicons/react/20/solid";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormikProps } from "@/app/_services/FormikCreate";
import * as Yup from "yup";
import { post } from "@/app/_services/api-call";
import { toast } from "react-toastify";
import Timer from "@/app/_components/timer";

const Step2 = ({
  cache_storer,
  data,
  setData,
}: {
  cache_storer: any;
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}) => {
  const router = useRouter();

  const [timer, setTimer]: [
    "resume" | "pause" | "reset" | "finish" | undefined,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState(undefined);
  const [remain, setRemain] = useState(0);

  const form2 = new FormikProps(
    {
      mobile_no: ["", Yup.string().optional()],
      otp_code: [
        "",
        Yup.string()
          .required("OTP is required")
          .length(4, "OTP must contain 4 digits"),
      ],
    },
    (values: any, formikHelpers: FormikHelpers<any>) => {
      formikHelpers.setSubmitting(true);
      post({ api_key: "OTP_CONFIRM_API", body: values, addon: "" })
        .then((resp: any) => {
          if (resp?.status === "success") {
            toast.success(resp?.message);
            formikHelpers.resetForm({});
            router.push("/register?step=3");
            setData({
              ...data,
              ...resp?.data,
            });
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
    <Formik {...form2.getFormik()}>
      {({
        isSubmitting,
        setFieldValue,
        resetForm,
        setErrors,
      }: {
        isSubmitting: boolean;
        setFieldValue: any;
        resetForm: any;
        setErrors: any;
      }) => {
        useEffect(() => {
          if (data?.mobile_no) {
            setFieldValue("mobile_no", data?.mobile_no);
          } else {
            router.push("/register?step=1");
          }
        }, [data?.mobile_no]);

        return (
          <Form className="p-20 pl-14 pr-14 pb-9 flex flex-col gap-y-1">
            <h2 className="text-center text-green-50 mb-2 text-xl">
              Welcome to Edutube! Let’s begin the adventure
            </h2>
            <Field name="otp_code">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <input
                      {...field}
                      placeholder="OTP"
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
                Confirm OTP
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 underline text-white"
                onClick={() => {
                  post({
                    api_key: "REGISTER_REQUEST_API",
                    body: {
                      mobile_no: data?.mobile_no,
                      resend: true,
                    },
                    addon: "",
                  }).then((resp: any) => {
                    if (resp?.status === "success") {
                      resetForm();
                      toast.success(resp?.message);
                      setRemain(resp?.expire_seconds);
                      setTimer("reset");
                      setTimeout(() => {
                        setTimer("resume");
                      });
                      setTimeout(() => {
                        setTimer(undefined);
                      }, resp?.expire_seconds);
                    } else if (resp?.code === 422) {
                      setErrors({
                        otp_code: resp?.errors?.mobile_no?.[0],
                      });
                    } else {
                      toast.error(resp?.error);
                    }
                  });
                }}
                disabled={!!timer}
              >
                Resend OTP
              </button>
              <Timer
                remaining={`${remain} s`}
                format={"s"}
                className="small-timer"
                control={timer}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step2;
