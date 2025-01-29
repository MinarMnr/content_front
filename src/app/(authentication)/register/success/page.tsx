import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container flex justify-center items-center">
      <div className="w-[800px] h-[720px] flex flex-col justify-center items-center">
        <div className="text-2xl text-center font-bold text-emerald-800">
          You have succesfully created an account in EDUTUBE
        </div>
        <div className="text-xl text-center font-bold text-emerald-600 mb-4">
          An invitation link is sent to your registered email. Please check your
          inbox for verification link
        </div>

        <Link
          href="/api/auth/authorize"
          className="px-4 py-2 bg-green-700 text-white font-black rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Page;
