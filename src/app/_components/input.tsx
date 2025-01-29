"use client";

import React, { useState } from "react";

const Input = ({ size, data, setData, ...props }: any) => {
  return (
    <div className="w-full flex flex-col justify-start items-start p-1 all-form-custom">
      {size === "sm" && (
        <label className="text-sm text-gray-800" htmlFor={props?.id}>
          {props?.label}
        </label>
      )}
      <input
        {...props}
        value={props?.name ? data?.[props?.name] : data}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setData(props?.name ? {
            ...data,
            [props?.name]: e?.target?.value,
          } : e?.target?.value);
        }}
        className={`w-full text-black ${props?.inp_style}`}
      />
      {size === "sm" && (
        <span className="w-full text-xs min-h-3 text-red-500">
          {props?.error ?? ""}
        </span>
      )}
    </div>
  );
};

export default Input;
