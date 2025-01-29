import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  let setCookie = "";
  if (!(await headers()).get("x-current-params")) {
    return redirect(`register?step=1`);
  }

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
            <div className="bg-green-800   pt-0 shadow-gray-500">
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
              <Form cache_storer={setCookie} />
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
                  <Link href={"/login"}>
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
