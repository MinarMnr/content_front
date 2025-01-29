"use client";
import InputField from "@/app/_components/InputField";
import InputSelect from "@/app/_components/InputSelect";
import { RootState } from "@/app/store.ts";
import {
  EyeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { Field, Form, Formik, FormikHelpers, useField } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { show } from "@/app/_services/api-call";
import { quill_formats, quill_modules } from "@/app/_resources/quill-custom";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CourseAddForm = ({ ...props }: any) => {
  const { values, setFieldValue } = props;
  const token = useSelector((state: RootState) => state.auth.token);
  const [courseType, setCourseType] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const getCourseType: () => Promise<void> = async () => {


      await show({
        api_key: "ADMIN_COURSE_TYPE_API",
        parameters: {
          page: 1,
          size: -1,
        },
      }).then((response: any) => {
        if (response.status === "success") {
          setCourseType(response.data);
        } else {
          setCourseType([]);
        }
      });
    };

    getCourseType();
  }, []);

  const getCategory = async (courseTypeId: any) => {

    await show({
      api_key: "ADMIN_CATEGORY_API",
      parameters: {
        course_type_id: courseTypeId,
        page: 1,
        size: -1,
      },
    }).then((response: any) => {
      if (response.status === "success") {
        setCategory(response.data);
      } else {
        setCategory([]);
      }
    });
  };

  const getSubCategory = async (categoryId: any) => {


    await show({
      api_key: "ADMIN_SUB_CATEGORY_API",
      parameters: {
        category_id: categoryId,
        page: 1,
        size: -1,
      },
    }).then((response: any) => {
      if (response.status === "success") {
        setSubCategory(response.data);
      } else {
        setSubCategory([]);
      }
    });
  };

  return (

    <>
      <Form className="flex flex-wrap -mx-2 ">
        <div className="flex flex-wrap  bg-gray-50 border border-dashed  w-full p-3">
          {/* <div className="flex flex-col justify-start items-stretch w-full"> */}
          <div className="w-full md:w-1/2 px-2">
            <InputField
              label="Course Title"
              className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
              name="title"
              type="text"
              required={true}
              placeholder="Enter Your title"
            />
          </div>

          {/* <div className="flex flex-col justify-start items-stretch w-full"> */}
          <div className="w-full md:w-1/2 px-2">
            <InputField
              label="Sub Title"
              className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
              name="sub_title"
              required={true}
              type="text"
              placeholder="Enter Your sub title"
            />
          </div>
          {/* <div className="flex flex-col justify-start items-stretch w-full mt-1"> */}
          <div className="w-full md:w-1/3 px-2 mt-4">
            <InputSelect
              name="course_type_id"
              label="Course Type"
              required={true}
              options={courseType}
              placeholder="Select a Type"
              valueKey="id"
              labelKey="title_en"
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue("course_type_id", value);
                setFieldValue("category_id", "");
                setFieldValue("sub_category_id", "");
                getCategory(value);
              }}
            />
          </div>

          {/* <div className="flex flex-col justify-start items-stretch w-full mt-1"> */}
          <div className="w-full md:w-1/3 px-2 mt-4">
            <InputSelect
              name="category_id"
              label="Category"
              required={true}
              options={category}
              placeholder="Select a category"
              valueKey="id"
              labelKey="title_en"
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue("category_id", value);
                setFieldValue("sub_category_id", "");
                getSubCategory(value);
              }}
            />
          </div>

          {/* <div className="flex flex-col justify-start items-stretch w-full mt-1"> */}
          <div className="w-full md:w-1/3 px-2 mt-4">
            <InputSelect
              name="sub_category_id"
              label="Sub Category"
              options={subCategory}
              placeholder="Select a Sub Category"
              valueKey="id"
              labelKey="title_en"
            />
          </div>
        </div>


        <div className="w-full px-2 flex flex-col mb-4 mt-8">
          <label className=" block mb-1 text-gray-600">
            <span>
              {" "}
              Course Description <span className="text-red-600">*</span>
            </span>
          </label>

          <ReactQuill
            theme="snow"
            value={values?.description}
            onChange={(value) => setFieldValue("description", value)}
            placeholder="Write your course description"
            className="h-36 block w-full "
            modules={quill_modules}
            formats={quill_formats}
          />
        </div>

        <div className="w-full px-2 flex flex-col mb-4 mt-12">
          <label className=" flex flex-col  text-gray-600 mb-2">
            Course Requirement
          </label>

          <ReactQuill
            theme="snow"
            value={values?.requirement}
            onChange={(value) => setFieldValue("requirement", value)}
            placeholder="Write your course Requirement"
            className="h-36 block w-full"
            modules={quill_modules}
            formats={quill_formats}
          />
        </div>


        <div className="w-full px-2 flex justify-end mb-4 mt-12">
          <button
            type="button"
            className="px-10 py-2 bg-red-600 text-white rounded-xl m-1"
          // onClick={resetForm}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-10 py-2 bg-emerald-600 text-white rounded-xl m-1"
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
};

export default CourseAddForm;
