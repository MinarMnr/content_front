"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";

const Modal = ({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal?: React.Dispatch<React.SetStateAction<any>> | "no-show";
}) => {
  const router = useRouter();
  return (
    <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-50 fixed justify-center items-center flex">
      <div className="relative w-auto h-auto">
        {closeModal !== "no-show" ? (
          <button
            className="p-2 rounded-full bg-red-500 text-white absolute -right-4 -top-3 z-50"
            onClick={() => (closeModal ? closeModal(undefined) : router.back())}
          >
            <XMarkIcon className="size-4" />
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Modal;
