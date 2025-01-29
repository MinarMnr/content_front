import Image from "next/image";
import React from "react";
import Banner from "../../../../public/teacher/banner.png";
import LangTra from "@/app/_components/lang-tra";

const EbookBanner = () => {
  return (
    <div className="overflow-hidden relative banner-all heiht-custom-banner">
      <div className="w-full h-full top-0 absolute m-auto px-32">
        <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
          <div className="basis-full flex flex-col justify-right items-center py-24">
            {" "}
            <span className="text-3xl mt-5 font-normal  text-white">
              {" "}
              <LangTra control="all_ebook.ebook" />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookBanner;
