"use client";
import CommonLayout from "@/app/admin/_reusables/common-layout";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { EbookAddModel } from "../../EbookAdd";
import { toast } from "react-toastify";
import EbookAddForm from "../../EbookAddForm";
import { redirect, useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store.ts";
import { post, show } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";

const Page = (props: { params: Promise<{ id: string }> }) => {
  const router = useRouter();

  const params: any = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    let form_val: any = {};
    show({ api_key: "ADMIN_EBOOK_API", addon: params?.id }).then(
      (resp: any) => {
        form_val = resp?.data;
        setData(form_val);
      }
    );
  }, [params.id]);

  return (
    <CommonLayout
      title="Edit New Ebook"
      buttons={[
        {
          title: "Go Back",
          route: "/admin/ebook",
          className: `border-red-600 text-red-500 bg-red-700 text-white rounded`,
        },
      ]}
    >
      <Formik
        initialValues={EbookAddModel.fromJson(data)}
        enableReinitialize={true}
        validationSchema={EbookAddModel.validation()}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          values?.upload_thumbnail instanceof File == false &&
            delete values?.upload_thumbnail;

          try {
            const result: any = await post({
              api_key: "ADMIN_EBOOK_API",
              body: {
                ...values,
                _method: "PUT",
              },
              addon: `${values?.id}`,
              is_form: true,
            }).then((resp: any) => {
              setSubmitting(false);
              if (resp?.status === "success") {
                toast.success(resp?.message);
                revalidated(`/admin/ebook`);

                router.push(`/admin/ebook`);
                router.refresh();
              } else {
                if (result.error) {
                  toast.error(result.error);
                } else {
                  toast.error("An unexpected error occurred.");
                }
              }
            });
          } catch (error) {
            toast.error("Network error or server is unreachable.");
          }
        }}
      >
        {(props) => <EbookAddForm {...props} type="edit" />}
      </Formik>
    </CommonLayout>
  );
};

export default Page;
