"use client";

import React, { useEffect } from "react";
import { quill_formats, quill_modules } from "@/app/_resources/quill-custom";

import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TextEditor = ({
  formControl,
}: {
  formControl: { [key: string]: any };
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={formControl?.value}
      onChange={(value) => formControl?.setFieldValue(formControl?.key, value)}
      placeholder={formControl?.placeholder}
      className="h-40 mb-5"
      modules={quill_modules}
      formats={quill_formats}
    />
  );
};

export default TextEditor;
