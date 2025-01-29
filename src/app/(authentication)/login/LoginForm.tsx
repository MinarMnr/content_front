"use client";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import InputField from "@/app/_components/InputField";
import { show } from "@/app/_services/api-call";
import {
  EyeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { Field, Form, Formik, FormikHelpers, useField } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoginForm = ({ ...props }: any) => {
  const { captchaChange, setFieldValue } = props;
  const [captchaImage, setCaptchaImage] = useState("");
  const [type, setType] = useState(true);

  const [isTick, setIsTick] = useState(false);
  useEffect(() => {
    callCaptcha();
  }, [captchaChange]);

  const callCaptcha = () => {
    show({ api_key: "RECAPTCHA_API", addon: "api/math", is_base: true })
      .then((resp: any) => {
        if (resp?.status === "success") {
          setCaptchaImage(resp?.data?.img);
          setFieldValue("captcha_key", resp?.data?.key);
          setIsTick(false);
        } else {
          setCaptchaImage("");
        }
        setCaptchaImage(resp?.img);
        setFieldValue("captcha_key", resp?.key);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    const interval = setInterval(() => {
      callCaptcha();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const getCaptcha: () => Promise<void> = async () => {
    const response = await fetch("/api/captcha/api/math", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setCaptchaImage(data?.img);
      setFieldValue("captcha_key", data?.key);
      setIsTick(false);
    } else {
      setCaptchaImage("");
    }
  };
  return (
    <Form className="p-20 pl-14 pr-14 pb-9 flex flex-col gap-y-2">
      <h2 className="text-center text-green-50 mb-8 text-xl">
        Sign in to Edutube
      </h2>
      <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
        <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
          <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
        </span>

        <InputField
          className="py-1 border-0 w-70"
          name="email"
          type="text"
          placeholder="Enter Your Username/Email"
        />
      </div>

      <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all mt-4">
        <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
          <LockClosedIcon className="size-6 top-1 left-1 relative text-gray-300" />
        </span>

        <InputField
          className="py-1 border-0 w-70"
          name="password"
          type={type ? "password" : "text"}
          placeholder="Enter Your Password"
        />

        <span
          className="pt-0 pb-0 relative right-3"
          onClick={() => setType(!type)}
        >
          <EyeIcon className="size-5 top-2  relative text-gray-500 " />
        </span>
      </div>
      {/* <div className="text-end">
        <a
          href="/forget-password"
          className="text-gray-200 text-md relative underline"
        >
          Forgot Password?
        </a>
      </div> */}

      <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all gap-x-1">
        <span className="pl-4 w-2/5">
          {captchaImage ? (
            <Image
              src={captchaImage}
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
          onClick={() => getCaptcha()}
        >
          <DynamicHeroIcon s_icon="ArrowPathIcon" className="size-4" />
        </button>
        {/* <input
                      {...field}
                      placeholder="Enter Captcha Result"
                      type="text"
                      className="py-1 border-0 w-40 h-10 text-center"
                    /> */}

        <InputField
          name="captcha_result"
          type="text"
          placeholder="Type result here"
          //className="py-1 w-full border-l-0 h-10 pl-2  text-lg"
          className="py-1 border-0 w-40 h-10 text-center"
        />
      </div>

      <div className="pt-2 mt-4">
        <button
          className="w-full text-white  py-3 rounded-full text-lg bg-login hover:text-green-800"
          type="submit"
        >
          Sign In
        </button>
      </div>

      <div className="spe-login relative">
        <span className="absolute or-spnan bg-green-800 text-white pl-4 pr-4 italic">
          {/* or */}
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
