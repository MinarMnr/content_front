import CommonLayout from "@/app/admin/_reusables/common-layout";
import React from "react";
import Tabs from "./tabs";
import Overview from "./overview";
import Image from "next/image";
import { show } from "@/app/_services/api-call";
import StickyComp from "./sticky-comp";
import Instruct from "./instructors";
import Reviews from "./review";
import Faq from "./faq";
import Contents from "./contents";

const Page = async (props: any) => {
  const params = await props?.params;
  let courseDetails: any = {};
  await show({
    api_key: "ADMIN_COURSE_API",
    addon: `${params?.id}/preview`,
  }).then((resp: any) => {
    courseDetails = resp?.data;
  });

  return (
    <CommonLayout
      title="Course Preview"
      buttons={[
        {
          title: "Edit",
          route: `/admin/courses/edit/${courseDetails?.id}`,
          className: "bg-sky-700 text-white",
        },
        {
          title: "Go Back",
          route: "/admin/courses",
          className: `bg-red-600 text-white`,
        },
      ]}
    >
      <div className="w-full h-40 overflow-hidden relative">
        <div className="absolute h-full w-full flex flex-col justify-center items-start pl-8">
          <span className="text-3xl text-white font-black ">
            {courseDetails?.title}
          </span>
          <span className="text-xl text-white font-semibold">
            {courseDetails?.sub_title}
          </span>
        </div>
        <Image
          src={`/bannerall.svg`}
          width={2560}
          height={300}
          alt=""
          className="object-cover"
        />
      </div>
      <div className="w-full banner-all-details-temp flex flex-row-reverse justify-start items-stretch gap-4 pr-4">
        <div className="w-1/4">
          <div className="sticky z-20 -mt-10 top-10 border-4 border-white shadow-sm shadow-slate-400">
            <StickyComp data={courseDetails} />
          </div>
        </div>
        <div className="w-2/3">
          <div className="mb-8 sticky top-0 z-10">
            <Tabs />
          </div>
          <div id="admin-course-overview" className="mb-8">
            <Overview data={courseDetails} />
          </div>
          <div id="admin-course-contents" className="mb-8">
            <Contents data={courseDetails} />
          </div>
          <div id="admin-course-instructors" className="mb-8">
            <Instruct data={courseDetails} />
          </div>
          <div id="admin-course-reviews" className="mb-8">
            <Reviews data={courseDetails} />
          </div>
          <div id="admin-course-faq" className="mb-8">
            <Faq data={courseDetails} />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Page;
