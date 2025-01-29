"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ForgetPasswordModel } from "./ForgetPassword";
import { Formik } from "formik";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Forget = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto pt-50 pb-90px pl-20 pr-20 mt-8">
      {/* <ToastContainer /> */}
      <div className="flex w-full">
        <div className="md:w-2/4">
          <h3 className="text-4xl  text-green-800 text-center">
            Forgot Password
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
              <Link href="/login">
                <div className="header-login relative">
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
                initialValues={ForgetPasswordModel}
                enableReinitialize={true}
                validationSchema={ForgetPasswordModel.validation()}
                onSubmit={async (values, { resetForm }) => {
                  const response = await fetch(
                    "http://192.168.1.192:8004/api/forgot-request",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: values.email,
                      }),
                    }
                  );
                  const res = await response.json();

                  if (response.ok && res) {
                    toast.success(res.message || "Success!");
                    //router.push("/login");
                    resetForm({});
                  } else {
                    if (res?.error) {
                      toast.error(res?.error);
                    } else if (res?.errors) {
                      toast.error(res.errors.email[0] || "Failed!!");
                    } else {
                      toast.error(res?.message);
                    }

                    resetForm({});
                  }
                }}
              >
                {(props) => <ForgetPasswordForm {...props} />}
              </Formik>

              <div className="flex pl-14 pb-10">
                <div className="md:w-2/4"></div>

                <div className="md:w-2/4 text-end pr-14">
                  <Link href={"/login"}>
                    <button className="border border-dashed border-gray-400 p-2 pl-5 pr-5 rounded-full text-green-100 hover:bg-green-900 hover:text-white">
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

export default Forget;
