"use client";

import React, { useRef, useState } from "react";
import NextImage from "next/image";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { convertToFile } from "@/app/_services/modifier";

const ImageResize = ({
  image_url,
  ratio,
  onSubmit,
  image_style,
}: {
  image_url: string;
  ratio: number;
  onSubmit: Function;
  image_style?: string;
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState<string>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const showImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event?.target?.files?.length) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  async function onDownloadCropClick() {
    let temp_canvas = document.createElement("canvas");
    let scale_x =
      (imgRef.current?.naturalWidth ?? 0) / (imgRef.current?.width ?? 1);
    let scale_y =
      (imgRef.current?.naturalHeight ?? 0) / (imgRef.current?.height ?? 1);
    temp_canvas["width"] = (completedCrop?.width ?? 0) * scale_x;
    temp_canvas["height"] = (completedCrop?.height ?? 0) * scale_y;
    let painter = temp_canvas?.getContext("2d");
    let image = new Image();
    image.onload = () => {
      painter?.drawImage(
        image,
        (completedCrop?.x ?? 0) * scale_x * -1,
        (completedCrop?.y ?? 0) * scale_y * -1
      );
      convertToFile(temp_canvas?.toDataURL("image/png"))?.then((file) => {
        onSubmit(file).then(() => setModal(false));
      });
    };
    if (imgSrc) {
      image.src = imgSrc;
    }
  }

  return (
    <>
      {!!modal && (
        <div className="fixed w-full h-screen top-0 left-0 flex justify-center items-center bg-[#00000044] z-10">
          <div className="w-[650px] h-auto bg-white rounded-lg flex flex-col">
            <div className="w-full flex-grow min-h-40">
              <input type="file" accept="image/*" onChange={showImage} />
              {imgSrc ? (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={ratio}
                >
                  <img
                    style={{ width: "100%", maxHeight: "70vh" }}
                    ref={imgRef}
                    src={imgSrc}
                    alt="Please select an Image"
                  />
                </ReactCrop>
              ) : (
                <span className="text-xl text-red-400">Please select an Image</span>
              )}
            </div>
            <div className="hidden">
              <canvas id="canvvasss"></canvas>
            </div>
            <div className="w-full flex justify-end items-center p-2 gap-2">
              <button
                className="bg-red-600 text-white rounded-md px-4 py-2"
                onClick={() => {
                  setImgSrc("");
                  setModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-600 text-white rounded-md px-4 py-2"
                onClick={onDownloadCropClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <NextImage
        src={image_url}
        alt=""
        quality={100}
        width={500}
        height={500}
        className={image_style ?? ""}
        onClick={() => {
          setModal(true);
        }}
      />
    </>
  );
};

export default ImageResize;
