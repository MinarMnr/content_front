"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { UserIcon } from "@heroicons/react/20/solid";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { post, show } from "@/app/_services/api-call";
import { useRouter } from "next/navigation";
import { FormikProps } from "@/app/_services/FormikCreate";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Step1 = ({ cache_storer, data, setData }: { cache_storer: any, data: any, setData: Dispatch<SetStateAction<any>> }) => {
  const [captchaImg, setCaptchaImg]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const router = useRouter();
  const form1 = new FormikProps(
    {
      mobile_no: ["", Yup.string().required("Mobile No is required")],
      captcha_key: ["", Yup.string().required()],
      captcha_result: ["", Yup.string().required("Ensure you are not a bot")],
    },
    (values: any, formikHelpers: FormikHelpers<any>) => {
      formikHelpers.setSubmitting(true);
      post({api_key: "REGISTER_REQUEST_API", body: values, addon: ""})
        .then((resp: any) => {
          if (resp?.status === "success") {
            toast.success(resp?.message);
            formikHelpers.resetForm({});
            if(resp?.code === 2001){
              router.push('/register?step=3');
            }else{
              router.push('/register?step=2');
            }
            setData({
              ...data,
              ...resp?.data
            });
          } else if (resp?.code === 422) {
            formikHelpers.setErrors(
              Object.entries(resp?.errors)?.reduce(
                (pV: { [key: string]: string }, [key, value]: [string, any]) => {
                  return {
                    ...pV,
                    [key]: value?.[0],
                  };
                },
                {}
              )
            );
            if(resp?.errors?.mobile_no?.[0] === 'OTP already sent to the mobile no. Please confirm'){
              setTimeout(() => {
                router.push('/register?step=2');
                setData({
                  ...data,
                  mobile_no: values?.mobile_no
                });
              }, 3000);
            }
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
    <Formik {...form1.getFormik()}>
      {({
        isSubmitting,
        setFieldValue,
      }: {
        isSubmitting: boolean;
        setFieldValue: any;
      }) => {
        const callCaptcha = () => {
          show({api_key: "RECAPTCHA_API", addon: "api/math", is_base: true})
            .then((resp: any) => {
              setCaptchaImg(resp?.img);
              setFieldValue("captcha_key", resp?.key);
            })
            .catch((error: any) => {});
        };
        useEffect(() => {
          callCaptcha();
        }, []);
        return (
          <Form className="p-20 pl-14 pr-14 pb-9 flex flex-col gap-y-1">
            <h2 className="text-center text-green-50 mb-2 text-xl">
              Welcome to Edutube! Let’s begin the adventure
            </h2>
            <Field name="mobile_no">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
                    <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
                      <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
                    </span>
                    <input
                      {...field}
                      placeholder="Mobile No."
                      className="py-1 border-0 w-70"
                    />
                  </div>
                  <p className="pl-5 text-xs text-red-400 h-4">
                    {meta?.touched && meta?.error ? meta?.error : null}
                  </p>
                </>
              )}
            </Field>
            <Field name="captcha_result">
              {({ field, meta }: any) => (
                <>
                  <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all gap-x-1">
                    <span className="pl-4 w-2/5">
                      {captchaImg ? (
                        <Image
                          src={captchaImg}
                          alt="Nooren Ahsan"
                          quality={100}
                          width={500}
                          height={500}
                          className="w-full"
                        />
                      ) : null}
                    </span>
                    <button
                      className="flex justify-center items-center"
                      type="button"
                      onClick={() => callCaptcha()}
                    >
                      <DynamicHeroIcon
                        s_icon="ArrowPathIcon"
                        className="size-4"
                      />
                    </button>
                    <input
                      {...field}
                      placeholder="Enter Captcha Result"
                      type="text"
                      className="py-1 border-0 w-40 h-10 text-center"
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
                Send OTP
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step1;
