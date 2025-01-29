"use client";

import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import DynamicHeroIcon from "../_components/DynamicHeroIcon";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Footer = ({ ...props }: any) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <div
        {...props}
        className={`container mx-auto pl-28 pr-28 relative text-xs ${props?.className}`}
      >
        <div className="sho-an shapemover right-auto -left-14 opacity-60 top-10">
          <Image
            src={"/program-3-shape-1.webp"}
            alt={""}
            width={700}
            height={700}
          />
        </div>
        <div className="w-full border-b border-gray-200 border-dotted grid grid-cols-7 gap-3 py-10 footer-grid">
          <div className="col-span-2 flex flex-col justify-start items-start">
            <div className="text-2xl font-medium mb-6 title-all">
              {t.footer.follow_us}
            </div>
            <div className="flex justify-start items-start gap-2">
              <Image
                className="object-cover w-8 h-8 rounded-full hover:opacity-80 cursor-pointer"
                width={40}
                height={40}
                alt=""
                src={"/footer-icons/facebook.png"}
              />
              <Image
                className="object-cover w-8 h-8 rounded-full hover:opacity-80 cursor-pointer"
                width={40}
                height={40}
                alt=""
                src={"/footer-icons/x.jpg"}
              />
              <Image
                className="object-cover w-8 h-8 rounded-full hover:opacity-80 cursor-pointer"
                width={40}
                height={40}
                alt=""
                src={"/footer-icons/youtube.jpg"}
              />
              <Image
                className="object-cover w-8 h-8 rounded-full hover:opacity-80 cursor-pointer"
                width={40}
                height={40}
                alt=""
                src={"/footer-icons/google-plus.png"}
              />
              <Image
                className="object-cover w-8 h-8 rounded-full hover:opacity-80 cursor-pointer"
                width={40}
                height={40}
                alt=""
                src={"/footer-icons/instagram.png"}
              />
            </div>
          </div>
          <div className="col-span-3 px-8 footer-all-block">
            <div className="text-2xl mb-6 title-link-all font-medium">
              {t.footer.contact_us}
            </div>
            <div className="grid grid-rows-3 gap-y-4">
              <div className="flex justify-start items-center gap-x-4">
                <div>
                  <MapPinIcon className="size-7 " />
                </div>
                <div className="text-sm ">{t.footer.address}</div>
              </div>
              <div className="flex justify-start items-center gap-x-4">
                <DynamicHeroIcon s_icon={"PhoneIcon"} className={"size-7 "} />
                <div className="text-sm ">{t.footer.phone}</div>
              </div>
              {/* <div className="flex justify-start items-center gap-x-4">
              <ClipboardDocumentCheckIcon className="size-7 " />
            
              <div className="text-sm ">Trade License#005720/2022</div>
            </div> */}
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="text-2xl mb-6 title-link-all2 font-medium">
              {t.footer.know_us}
            </div>
            <div className="grid grid-rows-2 border-b border-gray-200 border-dotted gap-y-2 pb-4">
              <div className="text-sm font-medium">
                <a href="">{t.footer.about_us}</a>
              </div>
              <div className="text-sm font-medium">
                <a href="">{t.footer.contact_us}</a>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-y-2 pt-4">
              <div className="text-sm font-medium">
                <a href="/request-course">{t.footer.request_course}</a>
              </div>
              {/* <div className="text-sm ">
              <a href="">Live Classes</a>
            </div> */}
              <div className="text-sm font-medium">
                <a href="">{t.footer.become_tutor}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 py-6 footer-bottom">
          <div className="text-left  text-sm font-light">
            {t.footer.copyright}
          </div>
          <div className="text-right text-green-800 cursor-pointer flex flex-row justify-end text-sm footer-bottom-list">
            <span className="border-r border-gray-200 px-2 hover:text-green-600">
              {t.footer.terms_cond}
            </span>
            <span className="border-r text-green-800 hover:text-green-600  px-2">
              {t.footer.refund}
            </span>
            <span className="border-r text-green-800 hover:text-green-600 px-2">
              {t.footer.privacy}
            </span>
            <span className="border-r text-green-800  hover:text-green-600  px-2">
              {t.footer.help}
            </span>
            <span className="px-2 hover:text-green-600 ">{t.footer.map}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/* <div className="w-full grid grid-cols-2 py-4 px-5 container mx-auto ps-16 pe-16">
       <div className="text-left  text-sm font-light">
         © Copyright 2020 Edutube BD|All Rights Reserved
       </div>
       <div className="text-right text-green-800 cursor-pointer flex flex-row justify-end text-sm footer-bottom-list">
         <span className="border-r border-gray-200 px-2 hover:text-green-600">
           Terms & Conditions
         </span>
         <span className="border-r text-green-800 hover:text-green-600  px-2">
           Refund Policy
         </span>
         <span className="border-r text-green-800 hover:text-green-600 px-2">
           Privacy Policy
         </span>
         <span className="border-r text-green-800  hover:text-green-600  px-2">
           Help
         </span>
         <span className="px-2 hover:text-green-600 ">Site Map</span>
       </div>
     </div> */}
      </div>
    </>
  );
};

export default Footer;
