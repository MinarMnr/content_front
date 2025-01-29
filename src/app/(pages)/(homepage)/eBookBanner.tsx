"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/app/translations";
import { useLanguage } from "@/app/context/LanguageContext";

const EBookBanner = ({ ...props }: any) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      {...props}
      className={`grid grid-cols-11 gap-x-4 mt-12 bg-gray-all relative pt-10 ebook-section  ${props?.className}`}
    >
 <div className="tp-hero-3-shape">
   <div className="tp-hero-3-shape-1">
   <Image
           
            src={"/a-letter.png.webp"}
            alt={""}
            width={700}
            height={700}
          />
   </div>
   <div className="tp-hero-3-shape-2">
   <Image
           
           src={"/b-letter.png.webp"}
           alt={""}
           width={700}
           height={700}
         />

    
   </div>
   <div className="tp-hero-3-shape-3">
   <Image
           
           src={"/c-letter.png.webp"}
           alt={""}
           width={700}
           height={700}
         />
      
   </div>
</div> 


      <div
        className="h-96 col-span-5 relative"
        style={{
          background:
            "linear-gradient(to left bottom, #f8f8f8 50%,  #1d746a 50%)",
        }}
      >
        <div className="absolute flex justify-center items-center right-1/4 w-1/3 aspect-square bgg-e rounded-full ebook-img">
          <Image
            className="w-5/6 h-5/6"
            style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
            src={"/e-book-banner.png"}
            alt={""}
            width={700}
            height={700}
          />
        </div>
      </div>
      <div className="h-96 col-span-6 flex flex-col justify-center items-start space-y-3">
        <div className="text-5xl text-gray-8d00">{t.home_e_book.e_book}</div>
        {/* <div className="text-green-800 text-3xl pb-2">Click to collect</div> */}
        <Link
          href={"/all-ebooks"}
          className="px-12 w-fit py-3 bg-gradient-to-r bg-green-800 hover:bg-green-900 text-white rounded-full mt-6 ebook-btn"
        >
          {t.home_e_book.collect}
        </Link>
      </div>
    </div>
  );
};

export default EBookBanner;
