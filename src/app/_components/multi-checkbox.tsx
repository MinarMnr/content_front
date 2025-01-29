"use client";

import React, { useEffect, useState } from "react";

function access(data: any, access: string | Function) {
  if (typeof access === "string") {
    return data?.[access];
  } else {
    return access(data);
  }
}

// {
//   name: string;
//   label: string;
//   setFieldValue: any;
//   value: any[];
//   dataList: any[];
//   output_key?: string;
//   text_accessor?: string | Function;
//   value_accessor?: string | Function;
// }

const MultiCheckbox = ({
  name,
  label,
  setFieldValue,
  value,
  dataList,
  output_key,
  text_accessor = "title_en",
  value_accessor = "id",
  isFormik = true,
  ...others
}: any) => {
  const [openModal, setOpenModal] = useState<boolean | null>(null);
  const [checkValue, setCheckValue] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (value && Array.isArray(value) && dataList && Array.isArray(dataList)) {
      setCheckValue(
        value?.reduce((pV: any, cV: any) => {
          let found = dataList?.find((tada: any) => {
            return (
              Number(access(tada, value_accessor)) ===
              Number(output_key ? cV?.[output_key] : cV)
            );
          });
          return {
            ...pV,
            [output_key ? cV?.[output_key] : cV]: access(found, text_accessor),
          };
        }, {})
      );
    }
  }, [value, dataList]);

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", (e) => {
      if (
        !(e?.target as HTMLInputElement)?.id?.startsWith(`multiselect_${name}`)
      ) {
        setOpenModal(false);
      }
    });
  }, []);

  useEffect(() => {
    if (openModal === false) {
      if (isFormik) {
        setFieldValue(
          name,
          Object.keys(checkValue)?.map((tada: any) =>
            output_key ? { [output_key]: tada } : tada
          )
        );
      } else {
        setFieldValue(
          Object.keys(checkValue)?.map((tada: any) =>
            output_key ? { [output_key]: tada } : tada
          )
        );
      }
    }
  }, [openModal]);

  return (
    <div className={others?.className}>
      <label id={`multiselect_${name}_label`}>{label}</label>
      <div className="relative">
        <div className="min-h-10 w-full border  rounded-md flex px-1 flex-wrap justify-start items-center gap-x-2 gap-y-1">
          {Object.values(checkValue)?.map((tada: any, index: number) => (
            <span
              className="px-2 py-1 bg-gray-200 rounded-full"
              key={index}
              id={`multiselect_${name}_${index}_selected`}
            >
              {tada}
            </span>
          ))}
          <input
            type="text"
            id={`multiselect_${name}_input`}
            onFocus={(e) => setOpenModal(true)}
            placeholder="Enter search text"
            className="flex-grow"
            value={search}
            onChange={(e) => {
              setSearch(e?.target?.value);
            }}
          />
        </div>
        <div className="absolute bg-white max-h-80 overflow-y-auto">
          {openModal &&
            dataList?.map(
              (tada: any, index: number) =>
                (!search ||
                  new RegExp(`${search}`, "i").test(
                    access(tada, text_accessor) as string
                  )) && (
                  <div
                    key={index}
                    className={`border-b px-2 py-1 border flex items-center justify-start`}
                  >
                    <input
                      id={`multiselect_${name}_${index}_box`}
                      type="checkbox"
                      checked={!!checkValue?.[access(tada, value_accessor)]}
                      className="me-2"
                      onChange={(e) => {
                        if (checkValue?.[access(tada, value_accessor)]) {
                          let x = JSON.parse(JSON.stringify(checkValue));
                          delete x?.[access(tada, value_accessor)];
                          setCheckValue(x);
                        } else {
                          setCheckValue({
                            ...(checkValue ?? {}),
                            [access(tada, value_accessor)]: access(
                              tada,
                              text_accessor
                            ),
                          });
                        }
                      }}
                    />
                    <label
                      htmlFor={`multiselect_${name}_${index}_box`}
                      id={`multiselect_${name}_${index}_label`}
                      className="flex-grow"
                    >
                      {access(tada, text_accessor)}
                    </label>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default MultiCheckbox;
