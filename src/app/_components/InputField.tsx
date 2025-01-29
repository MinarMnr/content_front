import React from "react";
import { useField } from "formik";

const InputField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="block text-gray-600 mb-2">
        {label} {props?.required && <span className="text-red-600">*</span>}
      </label>
      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <p className="mt-3 text-sm text-red-600">{meta.error}</p>
      ) : null}
    </>
  );
};

export default InputField;
