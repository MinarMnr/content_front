"use client";

import { Field, FieldArray } from "formik";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";
import { quill_formats, quill_modules } from "@/app/_resources/quill-custom";
import "react-quill-new/dist/quill.snow.css";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const OptionForm = ({
  option_list,
  q_i,
  setFieldValue,
  setFieldTouched,
}: {
  option_list: any[];
  q_i: number;
  setFieldValue: any;
  setFieldTouched: any;
}) => {
  return (
    <FieldArray name={`questions.${q_i}.options`}>
      {({ remove, push }) => (
        <>
          {option_list?.map((option: any, o_i: number) => (
            <div
              key={`${q_i}-${o_i}`}
              className="col-span-2 flex justify-start items-start flex-wrap bg-gray-100"
            >
              <div className="flex justify-between items-center w-full border">
                <span className="ml-2 text-green-700 text-md">
                 <strong>Option</strong> {`${o_i + 1}`}
                  <sup className="text-red-700">*</sup>
                </span>
                <button
                  className="p-2 text-center text-red-700 rounded-md flex justify-center"
                  type="button"
                  onClick={() => remove(q_i)}
                >
                  <DynamicHeroIcon s_icon="TrashIcon" className="size-4" />
                </button>
              </div>
              <Field name={`questions.${q_i}.options.${o_i}.title`}>
                {({ field, meta }: any) => (
                  <div className="flex flex-col justify-start items-stretch w-full bg-white">
                    <ReactQuill
                      theme="snow"
                      id={field?.name}
                      value={field?.value}
                      onChange={(value) => setFieldValue(field?.name, value)}
                      onBlur={() => {
                        setFieldTouched(field?.name);
                      }}
                      placeholder="Enter Option"
                      className="h-[70px] mb-5"
                    />
                    <p className="text-sm text-red-400 h-5  mt-0">
                      {meta?.touched && meta?.error ? meta?.error : null}
                    </p>
                  </div>
                )}
              </Field>
              <Field name={`questions.${q_i}.options.${o_i}.is_answer`}>
                {({ field, meta }: any) => (
                  <div className="w-3/3 flex justify-start items-center gap-x-6 border w-full border-top-0 ">
                    <label className="pl-2" htmlFor={field?.name}>Is Answer</label>
                    <input
                      {...field}
                      checked={!!field?.value}
                      onChange={(e) =>
                        setFieldValue(field?.name, Number(!!e?.target?.checked))
                      }
                      onBlur={() => {
                        setFieldTouched(field?.name);
                      }}
                      placeholder="Is Answer"
                      className="border border-gray-500 rounded h-10 p-1"
                      type="checkbox"
                      id={field?.name}
                    />
                    <p className="text-sm text-red-400 h-5">
                      {meta?.touched && meta?.error ? meta?.error : null}
                    </p>
                  </div>
                )}
              </Field>
              {/* <Field name={`questions.${q_i}.options.${o_i}.upload_file`}>
                {({ field, meta }: any) => (
                  <div className="w-2/3 flex flex-col justify-start items-stretch">
                    <label htmlFor={field?.name}>File Upload</label>
                    <input
                      id={field?.name}
                      placeholder="Upload File"
                      className="border border-gray-500 rounded h-10 p-1"
                      type="file"
                      onChange={(event) =>
                        setFieldValue(field?.name, event?.target?.files?.[0])
                      }
                      onBlur={() => {
                        setFieldTouched(field?.name);
                      }}
                    />
                    <p className="text-sm text-red-400 h-5">
                      {meta?.touched && meta?.error ? meta?.error : null}
                    </p>
                  </div>
                )}
              </Field> */}
            </div>
          ))}
          <button
            onClick={() => {
              push({
                title: "",
                is_answer: 0,
                // upload_file: null
              });
            }}
            className="col-span-2 py-2 text-center border border-dashed border-gray-400 bg-gray-50"
            type="button"
          >
            Add Option
          </button>
        </>
      )}
    </FieldArray>
  );
};

const ExamForm = ({
  question_list,
  setFieldValue,
  setFieldTouched,
}: {
  question_list: any[];
  setFieldValue: any;
  setFieldTouched: any;
}) => {
  return (
    <>
      <FieldArray name="questions">
        {({ remove, push }) => (
          <>
            <div className="max-h-[500px] overflow-y-auto col-span-8 grid-cols-8 grid gap-1 question-area bg-gray-50 p-3 pt-0">
              {question_list?.map((question: any, q_i: number) => (
                <Fragment key={q_i}>
                  <div className="col-span-8 flex justify-between items-center relative">
                    <span className="font-bold text-lg bg-green-100 w-full p-3 border-l-2 border-green-700 mt-4 text-green-700">
                      Question {q_i + 1}
                      <sup className="text-red-700">*</sup>
                    </span>
                    <button
                      className="p-2 text-center bg-red-600 text-white rounded-md flex justify-center aspect-square absolute right-2 top-6 "
                      type="button"
                      onClick={() => remove(q_i)}
                    >
                      <DynamicHeroIcon s_icon="TrashIcon" className="size-5" />
                    </button>
                  </div>
                  <Field name={`questions.${q_i}.title`}>
                    {({ field, meta }: any) => (
                      <div className="col-span-8 flex flex-col justify-start items-stretch w-full bg-white">
                        {/* <label htmlFor={field?.name}>
                          Question {`${q_i + 1}`}
                          <sup className="text-red-700">*</sup>
                        </label> */}
                        <ReactQuill
                          theme="snow"
                          id={field?.name}
                          value={field?.value}
                          onChange={(value) =>
                            setFieldValue(field?.name, value)
                          }
                          onBlur={() => {
                            setFieldTouched(field?.name);
                          }}
                          placeholder="Enter Question"
                          className="h-[140px] mb-5"
                          modules={quill_modules}
                          formats={quill_formats}
                        />
                        <p className="text-sm text-red-400 h-5  mt-4">
                          {meta?.touched && meta?.error ? meta?.error : null}
                        </p>
                      </div>
                    )}
                  </Field>
                  {/* <div className="col-span-2 flex flex-col justify-start items-stretch pt-6">
                    <Field name={`questions.${q_i}.mark`}>
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                          <label htmlFor={field?.name}>Mark</label>
                          <input
                            {...field}
                            placeholder="Mark"
                            className="border border-gray-500 rounded h-10 p-1"
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    <Field name={`questions.${q_i}.upload_file`}>
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                          <label htmlFor={field?.name}>File Upload</label>
                          <input
                            id={field?.name}
                            placeholder="Upload File"
                            className="border border-gray-500 rounded h-10 p-1"
                            type="file"
                            onChange={(event) =>
                              setFieldValue(
                                field?.name,
                                event?.target?.files?.[0]
                              )
                            }
                            onBlur={() => {
                              setFieldTouched(field?.name);
                            }}
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                  </div> */}
                  <div className="col-span-8 grid grid-cols-6 gap-2 bg-white">
                    <OptionForm
                      option_list={question?.options}
                      q_i={q_i}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          


           <button
              onClick={() => {
                push({ title: "", mark: "", upload_file: null });
              }}
              className="col-span-8 py-4 text-center border border-dashed m-auto w-99 bg-gray-50 border-green-700 rounded-lg"
              type="button"
            >
              <b>Add Question</b>
            </button>
           

          </>
        )}
      </FieldArray>
    </>
  );
};

export default ExamForm;
