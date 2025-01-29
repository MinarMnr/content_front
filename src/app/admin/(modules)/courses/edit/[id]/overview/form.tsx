"use client";

import { kill, post, show, update } from "@/app/_services/api-call";
import { Field, Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "react-quill-new/dist/quill.snow.css";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { toast } from "react-toastify";
import { convertToBase64, getFIleUrl } from "@/app/_services/modifier";
import Modal from "@/app/admin/_reusables/modal";
import Image from "next/image";
import { quill_formats, quill_modules } from "@/app/_resources/quill-custom";
import DeleteModal from "@/app/admin/_reusables/delete-modal";
import MultiCheckbox from "@/app/_components/multi-checkbox";
import ImageResize from "@/app/_components/image-resize";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const OverviewForm = ({
  edit_data,
  addon,
  dropdowns,
}: {
  edit_data?: any;
  addon?: string;
  dropdowns?: {
    course_type: any[];
    category: any[];
    discount_type: any[];
  };
}) => {
  const router = useRouter();
  const [modalUrl, setModalUrl] = useState<string>();
  const [deleteModal, setDeleteModal] = useState<number | null>(null);

  const [sub_category, setSubCategory] = useState([]);
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    show({
      api_key: "ADMIN_ACTIVE_COUPON_API",
      parameters: {
        page: 1,
        size: -1,
        type: "Course",
      },
    }).then((resp: any) => {
      setCouponList(resp?.data);
    });
  }, []);

  return (
    <>
      {modalUrl ? (
        <Modal closeModal={setModalUrl}>
          <div className="w-[700px] h-[420px]">
            <iframe
              src={`${modalUrl}`}
              allowFullScreen
              loading="eager"
              aria-controls="true"
              className="w-full h-full"
            ></iframe>
          </div>
        </Modal>
      ) : null}
      {deleteModal && (
        <DeleteModal
          api_endpoint={"ADMIN_COURSE_API"}
          data_id={`${addon}/trailers/${deleteModal}`}
          revalidate_route={`admin/courses/edit/${addon}/overview`}
          modal_control={setDeleteModal}
        />
      )}
      <Formik
        initialValues={{
          title: edit_data?.title ?? "",
          sub_title: edit_data?.sub_title ?? "",
          description: edit_data?.description ?? "",
          specification: edit_data?.specification ?? "",
          requirement: edit_data?.requirement ?? "",
          who_can_take: edit_data?.who_can_take ?? "",
          achievement: edit_data?.achievement ?? "",
          course_type_id: edit_data?.course_type_id ?? "",
          category_id: edit_data?.category_id ?? "",
          sub_category_id: edit_data?.sub_category_id ?? "",
          fee: edit_data?.fee ?? "",
          discount: edit_data?.discount ?? "",
          discount_type: edit_data?.discount_type ?? "Fixed",
          final_fee: "",
          is_published: !!edit_data?.is_published,
          course_coupons:
            edit_data?.course_coupons && edit_data?.course_coupons?.length
              ? edit_data?.course_coupons?.map((tada: any) => tada?.id)
              : [],
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
          sub_title: Yup.string().required("Sub title is required"),
          description: Yup.string().required("Description is required"),
          specification: Yup.string().optional(),
          requirement: Yup.string().optional(),
          who_can_take: Yup.string().optional(),
          achievement: Yup.string().optional(),
          course_type_id: Yup.string().required("Course type is required"),
          category_id: Yup.string().required("Category is required"),
          sub_category_id: Yup.string().required("Sub category is required"),
          fee: Yup.number()
            .required("Fee is required")
            .min(0, "Fee can not be negative"),
          discount: Yup.string().optional(),
          discount_type: Yup.string().optional(),
          is_published: Yup.boolean(),
        })}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          formikHelpers.setSubmitting(true);
          post({
            api_key: "ADMIN_COURSE_API",
            body: {
              ...values,
              is_published: Number(values?.is_published),
              _method: "PUT",
            },
            addon: addon ?? "",
            is_form: true,
          })
            .then((resp: any) => {
              if (resp?.status === "success") {
                toast.success(resp?.message);
                router.refresh();
              } else if (resp?.code === 422) {
                formikHelpers.setErrors(
                  Object.entries(resp?.errors)?.reduce(
                    (
                      pV: { [key: string]: string },
                      [key, value]: [string, any]
                    ) => {
                      return {
                        ...pV,
                        [key]: value?.[0],
                      };
                    },
                    {}
                  )
                );
              }
            })
            .catch((error: any) => {})
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          setSubmitting,
          values,
          resetForm,
        }: {
          isSubmitting: boolean;
          setFieldValue: any;
          setFieldTouched: any;
          setSubmitting: any;
          values: any;
          resetForm: any;
        }) => {
          useEffect(() => {
            show({
              api_key: "ADMIN_SUB_CATEGORY_API",
              parameters: {
                page: 1,
                size: -1,
                category_id: values?.category_id,
              },
            }).then((resp: any) => {
              setSubCategory(resp?.data);
            });
          }, [values?.category_id]);

          useEffect(() => {
            setFieldValue(
              "final_fee",
              values?.fee
                ? (values?.discount_type === "Fixed"
                    ? Number(values?.fee) - Number(values?.discount)
                    : Number(values?.fee) -
                      (Number(values?.fee) * Number(values?.discount)) / 100
                  )?.toFixed(2)
                : "Free"
            );
          }, [values?.discount_type, values?.discount, values?.fee]);

          let thumbnailUpload = async (image: any) => {
            return post({
              api_key: "ADMIN_COURSE_API",
              body: {
                upload_thumbnail: image,
                is_published: 1,
                _method: "PUT",
              },
              addon: `${addon}/upload-thumbnail`,
              is_form: true,
            }).then((resp: any) => {
              setSubmitting(false);
              if (resp?.status === "success") {
                toast.success(resp?.message);
                router.refresh();
              } else {
                toast.error("The thumbnail file could not be saved");
              }
            });
          };

          return (
            <Form>
              <div className="w-full flex justify-start items-stretch gap-3 py-4">
                <div className="w-2/3 flex flex-col justify-start items-stretch gap-2">
                  <Field name="description">
                    {({ field, meta }: any) => (
                      <div className="flex flex-col justify-start items-stretch w-full">
                        <label htmlFor="description">
                          Description<sup className="text-red-700">*</sup>
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={field?.value}
                          onChange={(value) => {
                            setFieldValue("description", value);
                          }}
                          onBlur={() => {
                            setFieldTouched("description");
                          }}
                          placeholder="Enter Course Description"
                          className="h-[520px] mb-5"
                          modules={quill_modules}
                          formats={quill_formats}
                        />
                        <p className="text-sm text-red-400 h-5 mt-12">
                          {meta?.touched && meta?.error ? meta?.error : null}
                        </p>
                      </div>
                    )}
                  </Field>
                  <Field name="specification">
                    {({ field, meta }: any) => (
                      <div className="flex flex-col justify-start items-stretch w-full">
                        <label htmlFor="specification">
                          What you'll learn ?
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={field?.value}
                          onChange={(value) =>
                            setFieldValue("specification", value)
                          }
                          onBlur={() => {
                            setFieldTouched("specification");
                          }}
                          placeholder="Enter Course Specification"
                          className="h-[400px] mb-5"
                          modules={quill_modules}
                          formats={quill_formats}
                        />
                        <p className="text-sm text-red-400 h-5  mt-12">
                          {meta?.touched && meta?.error ? meta?.error : null}
                        </p>
                      </div>
                    )}
                  </Field>
                  <Field name="requirement">
                    {({ field, meta }: any) => (
                      <div className="flex flex-col justify-start items-stretch w-full">
                        <label htmlFor="requirement">Requirement</label>
                        <ReactQuill
                          theme="snow"
                          value={field?.value}
                          onChange={(value) =>
                            setFieldValue("requirement", value)
                          }
                          onBlur={() => {
                            setFieldTouched("requirement");
                          }}
                          placeholder="Enter Course Requirements"
                          className="h-[400px] mb-5"
                          modules={quill_modules}
                          formats={quill_formats}
                        />
                        <p className="text-sm text-red-400 h-5  mt-12">
                          {meta?.touched && meta?.error ? meta?.error : null}
                        </p>
                      </div>
                    )}
                  </Field>
                </div>
                <div className="w-1/3 flex flex-col my-6 bg-gray-50 border border-gray-100 p-3">
                  <div className={`sticky top-[80px] w-full h-60 flex gap-x-1`}>
                    <div
                      className={`w-1/3 h-full border border-dashed border-gray-300 ${
                        isSubmitting ? "bg-gray-50" : "bg-gray-50"
                      }`}
                    >
                      <ImageResize
                        image_url={getFIleUrl(edit_data?.thumbnail?.path, true)}
                        ratio={4 / 3}
                        onSubmit={thumbnailUpload}
                        image_style={`h-full w-full flex flex-col justify-center items-center gap-y-2`}
                      />
                      {/* <input
                        type="file"
                        accept="image/*"
                        id="upload_thumbnail"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          let image = e?.target?.files?.[0];
                          setSubmitting(true);
                          post({
                            api_key: "ADMIN_COURSE_API",
                            body: {
                              upload_thumbnail: image,
                              is_published: 1,
                              _method: "PUT",
                            },
                            addon: `${addon}/upload-thumbnail`,
                            is_form: true,
                          }).then((resp: any) => {
                            setSubmitting(false);
                            if (resp?.status === "success") {
                              toast.success(resp?.message);
                              router.refresh();
                            } else {
                              toast.error(
                                "The thumbnail file could not be saved"
                              );
                            }
                          });
                        }}
                      />
                      <button
                        className="h-3/4 w-full flex flex-col justify-center items-center gap-y-2"
                        onClick={() => {
                          document.getElementById("upload_thumbnail")?.click();
                        }}
                        disabled={!!isSubmitting}
                        type="button"
                      >
                        <DynamicHeroIcon
                          s_icon="PlusCircleIcon"
                          className="size-10 mt-12 text-gray-400"
                        />
                        <span className="text-lg text-gray-500">
                          {isSubmitting ? "Uploading..." : "Upload Thumbnail"}
                        </span>
                      </button>
                      <div className="h-1/4 w-full flex flex-nowrap gap-x-1 justify-start items-stretch overflow-hidden p-1">
                        {edit_data?.thumbnail?.path ? (
                          <Image
                            onClick={(e) => {
                              setModalUrl(
                                getFIleUrl(edit_data?.thumbnail?.path, true)
                              );
                            }}
                            src={getFIleUrl(edit_data?.thumbnail?.path, true)}
                            alt=""
                            width={78}
                            height={48}
                          />
                        ) : null}
                      </div> */}
                    </div>
                    <div
                      className={`w-2/3 h-full border border-dashed border-gray-300 ${
                        isSubmitting ? "bg-gray-400" : "bg-white"
                      }`}
                    >
                      <input
                        type="file"
                        accept="video/*, image/*"
                        id="upload_trailer"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          let video = e?.target?.files?.[0];
                          setSubmitting(true);
                          post({
                            api_key: "ADMIN_COURSE_API",
                            body: {
                              upload_trailer: video,
                              is_published: 1,
                              _method: "POST",
                            },
                            addon: `${addon}/trailers`,
                            is_form: true,
                          }).then((resp: any) => {
                            setSubmitting(false);
                            if (resp?.status === "success") {
                              toast.success(resp?.message);
                              router.refresh();
                              // (edit_data?.course_trailers as any[])?.push(
                              //   resp?.data
                              // );
                            } else {
                              toast.error(
                                "The trailer file could not be saved"
                              );
                            }
                          });
                        }}
                      />
                      <button
                        className="h-3/4 w-full flex flex-col justify-center items-center gap-y-2"
                        onClick={() => {
                          document.getElementById("upload_trailer")?.click();
                        }}
                        disabled={!!isSubmitting}
                        type="button"
                      >
                        <DynamicHeroIcon
                          s_icon="PlusCircleIcon"
                          className="size-10 text-gray-400 mt-12"
                        />
                        <span className="text-lg text-gray-500">
                          {isSubmitting ? "Uploading..." : "Upload Intro"}
                        </span>
                      </button>
                      <div className="h-1/4 w-full flex flex-nowrap gap-x-1 justify-start items-stretch overflow-hidden p-1">
                        {edit_data?.course_trailers?.map(
                          (tada: any, index: number) => (
                            <div
                              key={index}
                              className="relative   w-20 hover-container-1"
                            >
                              <div className="absolute w-full h-full flex justify-center items-center gap-1 z-10 hover-child-1-flex">
                                <button
                                  className="bg-red-600 text-white p-1 aspect-square rounded-full"
                                  onClick={(e) => {
                                    setDeleteModal(tada?.id);
                                  }}
                                  type="button"
                                >
                                  <DynamicHeroIcon
                                    s_icon="TrashIcon"
                                    className="size-4"
                                  />
                                </button>
                                <button
                                  className="bg-green-600 text-white p-1 aspect-square rounded-full"
                                  onClick={(e) => {
                                    setModalUrl(
                                      getFIleUrl(tada?.trailer?.path, true)
                                    );
                                  }}
                                  type="button"
                                >
                                  <DynamicHeroIcon
                                    s_icon="PlayIcon"
                                    className="size-4"
                                  />
                                </button>
                              </div>
                              {(tada?.trailer?.path as string)?.endsWith(
                                "mp4"
                              ) ? (
                                <video
                                  className="w-full h-full"
                                  width={78}
                                  height={48}
                                >
                                  <source
                                    src={getFIleUrl(tada?.trailer?.path, true)}
                                    type="video/mp4"
                                  ></source>
                                </video>
                              ) : (
                                <Image
                                  src={getFIleUrl(tada?.trailer?.path, true)}
                                  alt=""
                                  width={78}
                                  height={48}
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sticky top-[320px] bg-white grid grid-cols-2 gap-x-1 p-3 pt-5">
                    <Field name="title">
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                          <label htmlFor="title" className="text-gray-700">
                            Title<sup className="text-red-700">*</sup>
                          </label>
                          <input
                            {...field}
                            placeholder="Title"
                            className="border border-gray-300 rounded h-9 text-md p-1 text-gray-500"
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    <Field name="sub_title">
                      {({ field, meta }: any) => (
                        <div className="col-span-2 flex flex-col justify-start items-stretch w-full">
                          <label htmlFor="sub_title" className="text-gray-700">
                            Sub Title<sup className="text-red-700">*</sup>
                          </label>
                          <input
                            {...field}
                            placeholder="Sub Title"
                            className="border  rounded h-9 text-md p-1 text-gray-500"
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    <Field name="course_type_id">
                      {({ field, meta }: any) => (
                        <div className="flex flex-col justify-start items-stretch w-full">
                          <label
                            htmlFor="course_type_id"
                            className="text-gray-700"
                          >
                            Course Type<sup className="text-red-700">*</sup>
                          </label>
                          <select
                            {...field}
                            className="border rounded  h-9 text-md  p-1 text-gray-500"
                          >
                            <option>Select Course Type</option>
                            {dropdowns?.course_type?.map((tada: any) => (
                              <option key={tada?.id} value={tada?.id}>
                                {tada?.title_en}
                              </option>
                            ))}
                          </select>
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    <Field name="category_id">
                      {({ field, meta }: any) => (
                        <div className="flex flex-col justify-start items-stretch w-full">
                          <label
                            htmlFor="category_id"
                            className="text-gray-700"
                          >
                            Category<sup className="text-red-700">*</sup>
                          </label>
                          <select
                            {...field}
                            className="border rounded  h-9 text-md p-1 text-gray-500"
                          >
                            <option>Select Category</option>
                            {dropdowns?.category?.map((tada: any) => (
                              <option key={tada?.id} value={tada?.id}>
                                {tada?.title_en}
                              </option>
                            ))}
                          </select>
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    <Field name="sub_category_id">
                      {({ field, meta }: any) => (
                        <div className="flex flex-col justify-start items-stretch w-full">
                          <label
                            htmlFor="sub_category_id"
                            className="text-gray-700"
                          >
                            Sub Category<sup className="text-red-700">*</sup>
                          </label>
                          <select
                            {...field}
                            className="border rounded h-9 text-md p-1 text-gray-500"
                          >
                            <option>Select Sub Category</option>
                            {sub_category?.map((tada: any) => (
                              <option key={tada?.id} value={tada?.id}>
                                {tada?.title_en}
                              </option>
                            ))}
                          </select>
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>
                    <Field name="fee">
                      {({ field, meta }: any) => (
                        <div className="flex flex-col justify-start items-stretch w-full">
                          <label htmlFor="fee" className="text-gray-700">
                            Fee<sup className="text-red-700">*</sup>
                          </label>
                          <input
                            {...field}
                            placeholder="Fee"
                            className="border text-gray-500 rounded h-9 text-md p-1"
                            type="number"
                          />
                          <p className="text-sm text-red-400 h-5">
                            {meta?.touched && meta?.error ? meta?.error : null}
                          </p>
                        </div>
                      )}
                    </Field>

                    <div className="col-span-2 grid grid-cols-4 p-2 bg-gray-50 mb-3 border border-dashed border-gray-200">
                      <Field name="is_published">
                        {({ field, meta }: any) => (
                          <div className="flex justify-start items-center gap-x-2 pt-6">
                            <label
                              htmlFor="is_published"
                              className="text-gray-700"
                            >
                              Published?
                            </label>
                            <input
                              {...field}
                              checked={field?.value}
                              onChange={(e) =>
                                setFieldValue(
                                  "is_published",
                                  !!e?.target?.checked
                                )
                              }
                              onBlur={() => {
                                setFieldTouched("is_published");
                              }}
                              placeholder="Publish Content?"
                              className="border border-gray-500  rounded h-10 p-1"
                              type="checkbox"
                              id="is_published"
                            />
                            <p className="text-sm text-red-400 h-5">
                              {meta?.touched && meta?.error
                                ? meta?.error
                                : null}
                            </p>
                          </div>
                        )}
                      </Field>
                      <Field name="course_coupons">
                        {({ field, meta }: any) => (
                          <MultiCheckbox
                            name={"course_coupons"}
                            label="Coupons"
                            dataList={couponList}
                            text_accessor="title"
                            value={field?.value}
                            setFieldValue={setFieldValue}
                            className="col-span-3 pl-4 text-gray-700"
                          />
                        )}
                      </Field>
                      {/* <MultiCheckbox
              name={"course_coupons"}
              label="Coupons"
              setFieldValue={setCouponModal}
              value={couponModal}
              dataList={couponList}
              text_accessor="title"
              isFormik={false}
            /> */}
                    </div>
                    <div className="col-span-2 bg-white grid grid-cols-2 gap-x-3 mb-3">
                      <button
                        type="button"
                        className="rounded-full py-1 text-center bg-pink-700 text-white"
                        disabled={!!isSubmitting}
                        onClick={() => resetForm()}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-full py-1 text-center bg-emerald-600 text-white"
                        disabled={!!isSubmitting}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default OverviewForm;

// <div className="flex flex-col justify-start items-stretch w-full">
//   <label htmlFor="discount_type">Discount Type</label>
//   <div className="flex flex-col justify-start">
//     {dropdowns?.discount_type?.map(
//       (tada: any, index: number) => (
//         <div
//           key={index}
//           className="flex justify-start gap-1"
//         >
//           <input
//             type="radio"
//             value={tada?.id}
//             checked={field?.value === tada?.id}
//             name={field?.name}
//             onChange={(e) =>
//               setFieldValue(
//                 "discount_type",
//                 e?.target?.value
//               )
//             }
//             id={`${field?.id}-${tada?.id}`}
//           />
//           <label htmlFor={`${field?.id}-${tada?.id}`}>
//             {tada?.title_en}
//           </label>
//         </div>
//       )
//     )}
//   </div>
//   <p className="text-sm text-red-400 h-5">
//     {meta?.touched && meta?.error
//       ? meta?.error
//       : null}
//   </p>
// </div>
