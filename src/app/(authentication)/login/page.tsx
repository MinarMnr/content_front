"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginModel } from "./Login";
import { Formik } from "formik";
import LoginForm from "./LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/reducers/authSlice";
import { LOGIN } from "../action";

const Login = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [captchaChange, setCaptchaChange] = useState(false);

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
            <div className="bg-green-800 pt-0 shadow-gray-500">
              <Link href="/">
                <div className="header-login relative ">
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

              {/* <Formik
                initialValues={LoginModel}
                enableReinitialize={true}
                validationSchema={LoginModel.validation()}
                onSubmit={async (values, { resetForm }) => {
                  setCaptchaChange(false);
                  const response = await LOGIN({
                    email: values.email,
                    password: values.password,
                    captcha_key: values.captcha_key,
                    captcha_result: values.captcha_result,
                  });
                  if (response?.status === 'success') {
                    // const { token, user } = response?.data;
                    // document.cookie = `edutube-auth-user-client = ${JSON.stringify(user)}`;
                    // document.cookie = `edutube-auth-user-token = ${token}`;
                    // dispatch(
                    //   setCredentials({ email: user.email, token: token })
                    // );
                    toast.success("Success!");
                    router.push("/admin");
                  } else {
                    if (response?.error) {
                      toast.error(response?.error);
                    } else if (response?.errors) {
                      toast.error(response.errors.captcha_result[0]);
                    } else {
                      toast.error(response?.message);
                    }
                    setCaptchaChange(true);

                    resetForm({});
                  }
                }}
              >
                {(props) => (
                  <LoginForm {...props} captchaChange={captchaChange} />
                )}
              </Formik> */}

              <div className="flex pl-14 pb-10">
                <div className="text-xl text-white">
                  <span className="mr-3 font-normal">
                    <a
                      href="/forget-password"
                      className="text-gray-200 text-lg relative underline"
                    >
                      Forgot Password?
                    </a>
                  </span>
                  <Link href={"/register"}>
                    <button className="border border-dashed border-gray-400 p-2 pl-5 pr-5 ml-2 rounded-full text-green-100 text-lg hover:bg-green-900 hover:text-white">
                      Create an account
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

export default Login;
