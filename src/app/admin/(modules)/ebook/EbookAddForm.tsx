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
import { show } from "@/app/_services/api-call";
import { getFIleUrl } from "@/app/_services/modifier";

const EbookAddForm = ({ ...props }: any) => {
  const { values, setFieldValue } = props;
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
    if (props?.type == "edit") {
      getCategory(values?.course_type_id);
      getSubCategory(values?.category_id);
    }

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

  const [imgState, setImgState] = useState({
    path: "",
  });

  const handleFileChange = (e: any) => {
    if (e.target.files[0] !== undefined) {
      setImgState({
        ...imgState,
        path: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setImgState({
        ...imgState,
        path: "",
      });
    }
  };

  return (
    <>
      <Form className="flex flex-wrap -mx-2 ">
        <div className="flex flex-wrap  bg-gray-50 border border-dashed  w-full p-3">
          <div className="w-full md:w-1/2 px-2 mt-4">
            <InputField
              label="E-book Title"
              className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
              name="title"
              type="text"
              required={true}
              placeholder="Enter Your title"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 mt-4">
            <InputField
              label="Ebook Url"
              className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
              name="upload_file"
              type="text"
              required={true}
              placeholder="Enter Your ebook url"
            />
          </div>

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

          <div className="w-full md:w-1/3 px-2 mt-4">
            <InputSelect
              name="is_published"
              label="Is published?"
              required={true}
              options={[
                {
                  id: 1,
                  value: "YES",
                },
                {
                  id: 0,
                  value: "NO",
                },
              ]}
              placeholder="Select a Status"
              valueKey="id"
              labelKey="value"
            />
          </div>

          <div className="w-full md:w-1/3 px-2 mt-4">
            <label className="block mb-2 text-gray-600">
              Upload Thumbnail Image{" "}
              {props?.type == "add" ? (
                <span className="text-red-600">*</span>
              ) : null}
            </label>
            <input
              type="file"
              accept="image/*"
              id="upload_thumbnail"
              name="upload_thumbnail"
              required={props?.type == "add" ? true : false}
              defaultValue={
                values &&
                values.upload_thumbnail &&
                values?.upload_thumbnail?.path
              }
              //style={{ display: "none" }}
              onInput={(event: any) => {
                setFieldValue("upload_thumbnail", event.currentTarget.files[0]);
                handleFileChange(event);
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mt-4">
            {imgState.path && (
              <div className="donor-image">
                <img
                  className="img-fluid rounded "
                  src={imgState.path ?? imgState.path}
                  id="preview-image"
                  alt=""
                  style={{ height: "90px", width: "80px" }}
                />
              </div>
            )}

            {values?.upload_thumbnail?.path && !imgState?.path && (
              <div className="donor-image">
                <img
                  className="img-fluid rounded "
                  src={getFIleUrl(values?.upload_thumbnail?.path, true)}
                  id="preview-image"
                  alt=""
                  style={{ height: "90px", width: "80px" }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-2 flex justify-end mb-4 mt-12">
          <button
            type="button"
            className="px-10 py-2 bg-red-600 text-white rounded-xl m-1"
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

export default EbookAddForm;
