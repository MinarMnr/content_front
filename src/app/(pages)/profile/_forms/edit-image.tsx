"use client";

import ImageResize from "@/app/_components/image-resize";
import { post } from "@/app/_services/api-call";
import { revalidated } from "@/app/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const EditImage = ({
  image_url,
  ratio,
}: {
  image_url: string;
  ratio: number;
}) => {
  const router = useRouter();

  let onSubmit = async (file: any) => {
    return post({
      api_key: "PROFILE_API",
      body: {
        upload_profile: file,
        _method: "PATCH",
      },
      addon: "",
      is_form: true,
    })
      .then((resp: any) => {
        if (resp?.status === "success") {
          toast.success(resp?.message);
          revalidated("/profile");
          router.push("/profile?segment=details");
        } else {
          toast.error(resp?.message);
        }
      })
      .catch((error: any) => {
        toast.error(error?.message);
      });
  };

  return (
    <ImageResize image_url={image_url} ratio={ratio} onSubmit={onSubmit} image_style={`rounded-full w-44 h-44 mx-auto mb-4 border-2`} />
  );
};

export default EditImage;
