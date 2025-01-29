import InputField from "@/app/_components/InputField";
import { UserIcon, LockClosedIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Form } from "formik";
import Link from "next/link";
import { useState } from "react";

const ResetForgetPasswordForm = ({ ...props }: any) => {
  const [passEye, setPassEye] = useState(true);
  const [passConEye, setPassConEye] = useState(true);

  return (
    <Form className="p-20 pl-14 pr-14 pb-9 flex flex-col gap-y-2">
      <h2 className="text-center text-green-50 mb-8">Reset Forget Password</h2>
      {/* <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
        <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
          <UserIcon className="size-6 top-1 left-1 relative text-gray-300" />
        </span>

        <InputField
          className="py-1 border-0 w-70"
          name="email"
          type="email"
          placeholder="Enter Your Email"
        />
      </div> */}

      <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
        <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
          <LockClosedIcon className="size-6 top-1 left-1 relative text-gray-300" />
        </span>

        <InputField
          className="py-1 border-0 w-70"
          name="password"
          type={passEye ? "password" : "text"}
          placeholder="Enter New Password"
        />
        <span className="pt-0 pb-0" onClick={() => setPassEye(!passEye)}>
          <EyeIcon className="size-5 top-1  relative text-black" />
        </span>
      </div>

      <div className="flex bg-white rounded-full pt-2 pb-2 relative field-all">
        <span className="p-3 pt-0 pb-0 pr-4 border-r mr-2">
          <LockClosedIcon className="size-6 top-1 left-1 relative text-gray-300" />
        </span>

        <InputField
          className="py-1 border-0 w-70"
          name="password_confirmation"
          type={passConEye ? "password" : "text"}
          placeholder="Enter Password Again"
        />
        <span className="pt-0 pb-0" onClick={() => setPassConEye(!passConEye)}>
          <EyeIcon className="size-5 top-1  relative text-black" />
        </span>
      </div>

      <div className="pt-2 mt-4">
        <button
          className="w-full text-white  py-3 rounded-full text-lg bg-login hover:text-green-800"
          type="submit"
        >
          Reset Password
        </button>
      </div>

      {/* <div className="spe-login relative">
        <span className="absolute or-spnan bg-green-800 text-white pl-4 pr-4 italic">or</span>
      </div> */}
    </Form>
  );
};

export default ResetForgetPasswordForm;
