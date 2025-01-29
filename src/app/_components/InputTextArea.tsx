import React from "react";
import { useField } from "formik";

const InputTextArea = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="block text-gray-600 mb-2">
        {label} {props?.required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        {...props}
        {...field}
        className={`form-control ${props.className ? props.className : ""}
           ${meta.touched && meta.error ? "is-invalid" : ""}`}
      />

      {meta.touched && meta.error ? (
        <p className="mt-3 text-sm text-red-600">{meta.error}</p>
      ) : null}
    </>
  );
};

export default InputTextArea;
