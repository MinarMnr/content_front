"use client";
import InputField from "@/app/_components/InputField";
import InputSelect from "@/app/_components/InputSelect";

import { Form } from "formik";

import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { show } from "@/app/_services/api-call";
import InputTextArea from "@/app/_components/InputTextArea";
import { getClientCookie } from "@/app/_services/storage";
import MediaPlayer from "@/app/_components/media-player";

const RequestCourseForm = ({ ...props }: any) => {
  const { values, setFieldValue } = props;
  const [courseType, setCourseType]: any = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [user, setUser] = useState<any>(null);

  let videoUrl = "http://192.168.1.179:8040/videos/barishal.m3u8";

  const [currentContent, setCurrentContent] = useState<{
    type: "media";
    content_id: number;
    content_url?: string;
    course_id: number;
    module_id: number;
    extension?: string;
  } | null>(null);

  useEffect(() => {
    setCurrentContent({
      type: "media",
      content_id: 1,
      content_url: videoUrl,
      extension: "m3u8",
      course_id: 1,
      module_id: 1,
    });
    const getCourseType: () => Promise<void> = async () => {
      await show({
        api_key: "COURSE_TYPE_API",
        parameters: {
          page: 1,
          size: -1,
        },
      }).then((response: any) => {
        if (response.status === "success") {
          let res = [
            ...response.data,
            {
              id: 3,
              title_en: "Other",
              title_bn: "অন্যান্য",
            },
          ];

          setCourseType(...courseType, res);
        } else {
          setCourseType([]);
        }
      });
    };

    getCourseType();
  }, []);

  const getCategory = async (courseTypeId: any) => {
    await show({
      api_key: "CATEGORY_API",
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
      api_key: "SUB_CATEGORY_API",
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

  useEffect(() => {
    let userData = getClientCookie("edutube-auth-user");
    if (userData) {
      setUser(userData);
      setFieldValue("name", userData?.name_en ?? "");
      setFieldValue("mobile_no", userData?.phone ?? "");
    }
  }, []);

  return (
    <>
      <div className={`py-10 grid grid-cols-1 gap-y-2`}>
        <MediaPlayer
          {...currentContent}
          c_class="w-[800px] h-[450px]"
          resolutions={[]}
        />
        <div className="container mx-auto pt-50 pb-90px pl-28 pr-28 mt-8">
          <div className="text-2xl font-bold text-center">Request a Course</div>
          <Form className="flex flex-wrap -mx-2 ">
            <div className="flex flex-wrap  bg-gray-50 border border-dashed  w-full p-3">
              <div className="w-full md:w-1/2 px-2 mt-4">
                <InputField
                  label="User Name"
                  className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
                  name="name"
                  type="text"
                  required={true}
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="w-full md:w-1/2 px-2 mt-4">
                <InputField
                  label="User Mobile No"
                  className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
                  name="mobile_no"
                  type="text"
                  required={true}
                  placeholder="Enter Your Mobile No"
                />
              </div>

              <div className="w-full md:w-1/3 px-2 mt-4">
                <InputSelect
                  name="course_type_id"
                  label="Course Type"
                  options={courseType}
                  placeholder="Select a Type"
                  valueKey="id"
                  labelKey="title_en"
                  onChange={(e: any) => {
                    const value = e.target.value;
                    setFieldValue("course_type_id", value);
                    setFieldValue("category_id", "");
                    setFieldValue("sub_category_id", "");
                    value != 3 && getCategory(value);
                  }}
                />
              </div>
              {values.course_type_id != 3 ? (
                <>
                  <div className="w-full md:w-1/3 px-2 mt-4">
                    <InputSelect
                      name="category_id"
                      label="Category"
                      options={category}
                      placeholder="Select a category"
                      valueKey="id"
                      labelKey="title_en"
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setFieldValue("category_id", value);
                        setFieldValue("sub_category_id", "");
                        value != 3 && getSubCategory(value);
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
                </>
              ) : (
                <div className="w-8/12 md:w-3/5  px-1 mt-3">
                  <InputField
                    label="Other Types"
                    className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
                    name="other_type"
                    type="text"
                    placeholder="Please specify your desired Course Type, Category, or Sub-Category"
                  />
                </div>
              )}

              <div className="w-full md:w-full px-2 mt-4">
                <InputField
                  label="Course Title"
                  className="border border-gray-300 rounded h-10 p-1 w-full pl-3"
                  name="title"
                  type="text"
                  required={true}
                  placeholder="Enter Your Course title"
                />
              </div>

              <div className="w-full md:w-full px-2 mt-4">
                <InputTextArea
                  label="Course Description"
                  className="border border-gray-300 rounded h-16 p-1 w-full pl-3"
                  name="description"
                  required={true}
                  placeholder="Enter Your Course Description"
                  rows={4}
                  cols={12}
                ></InputTextArea>
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
                Submit Request
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RequestCourseForm;
