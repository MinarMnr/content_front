import Image from "next/image";
import React from "react";
import Banner from "../../../../public/teacher/banner.png";
import LangTra from "@/app/_components/lang-tra";

const ProfileBanner = ({name_key}: {name_key: string}) => {
  return (
    <div className="overflow-hidden relative banner-all heiht-custom-banner">
      <div className="w-full h-full top-0 absolute m-auto px-32">
        <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
          <div className="basis-full flex flex-col justify-right items-center py-24">
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2">
              <h2 className="text-white text-4xl font-normal">
                <LangTra control={name_key} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
