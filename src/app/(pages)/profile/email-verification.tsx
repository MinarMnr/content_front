"use client";

import LangTra from "@/app/_components/lang-tra";
import { post } from "@/app/_services/api-call";
import { CheckIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const EmailVerification = ({
  email,
  verified,
}: {
  email: string;
  verified: boolean;
}) => {
  const router = useRouter();
  return (
    <p
      className={`text-sm text-gray-500 mb-1 flex`}
      title={verified ? "Email is verified" : "Email is unverified"}
    >
      <LangTra control="profile.email" />: {email}{" "}
      {verified ? (
        <CheckIcon className="mx-2 rounded-full size-4 text-white font-black bg-emerald-600" />
      ) : (
        <>
          <ShieldExclamationIcon className="mx-2 rounded-full size-4 text-white font-black bg-sky-600" />
          <button
            onClick={() => {
              post({
                api_key: "EMAIL_VERIFICATION_API",
                body: {},
                addon: "",
              }).then((resp: any) => {
                if (resp?.status === "success") {
                  toast.success(resp?.message);
                  window.setTimeout(() => {
                    router.refresh();
                  }, 2000);
                } else {
                  toast.error(resp?.message);
                }
              });
            }}
            className="underline"
          >
            Verify Email
          </button>
        </>
      )}
    </p>
  );
};

export default EmailVerification;
