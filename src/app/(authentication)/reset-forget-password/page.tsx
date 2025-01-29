"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ResetForgetPasswordModel } from "./ResetForgetPassword";
import { Formik } from "formik";
import ResetForgetPasswordForm from "./ResetForgetPasswordForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Forget = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const resetToken = searchParams.get("token");
  const resetEmail = searchParams.get("email");

  const [resetSuccess, setResetSuccess] = useState(false);

  if (!resetToken || !resetEmail) {
    router.push("/forget-password");
  }

  return (
    <div className="container mx-auto pt-50 pb-90px pl-20 pr-20 mt-8">
      {resetSuccess && (
        <div className="flex w-full justify-center mb-14">
          <Link
            href="/login"
            className="block p-2 rounded-lg text-center animate-blink"
          >
            <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 text-lg">
              Password reset successful. Click here to{" "}
              <span className="text-red-500 text-2xl">LOGIN</span> and access
              your account.
            </p>
          </Link>
        </div>
      )}

      {/* <ToastContainer /> */}

      <div className="flex w-full">
        <div className="md:w-2/4">
          <h3 className="text-4xl  text-green-800 text-center">
            Reset Forgot Password
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
            <div className="bg-green-800  rounded-xl pt-0 shadow-gray-500">
              <Link href="/login">
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

              <Formik
                initialValues={ResetForgetPasswordModel}
                enableReinitialize={true}
                validationSchema={ResetForgetPasswordModel.validation()}
                onSubmit={async (values, { resetForm }) => {
                  setResetSuccess(false);
                  let data = {
                    ...values,
                    token: resetToken,
                    email: resetEmail,
                  };

                  const response = await fetch(
                    "http://192.168.1.192:8004/api/forgot-reset-password",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  );
                  const res = await response.json();

                  if (response.ok && res) {
                    //toast.success(res?.message || "Password reset successful");
                    //router.push("/login");
                    setResetSuccess(true);
                    resetForm({});
                  } else {
                    if (res?.error) {
                      toast.error(res?.error);
                    } else if (res?.errors) {
                      toast.error(res.errors.password[0]);
                    } else {
                      toast.error(res?.message);
                    }

                    resetForm({});
                  }
                }}
              >
                {(props) => <ResetForgetPasswordForm {...props} />}
              </Formik>

              {/* <div className="flex pl-14 pb-10">
                <div className="md:w-1/3"></div>

                <div className="md:w-2/3 text-end pr-14">
                  <Link href={"/forget-password"}>
                    <button className="border border-dashed border-gray-400 p-2 pl-5 pr-5 rounded-full text-green-100 hover:bg-green-900 hover:text-white">
                      Forgot Password
                    </button>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
