import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import RouteChange from "@/app/_components/route-change-detector";
import CommonLayout from "@/app/admin/_reusables/common-layout";
import { OutlineIconName, SolidIconName } from "@/app/lib/sidebar";
import Link from "next/link";
import React from "react";
import PublishUn from "../../_course_reuse/publish-un";
import { show } from "@/app/_services/api-call";
import IdPathLink from "./id-path-link";

const Layout = async (props: {
  children: React.ReactNode;
  params: Promise<any>;
}) => {
  const params = await props.params;

  const { children } = props;

  const tab_contents: {
    title: string;
    icon: OutlineIconName | SolidIconName;
    route: string;
  }[] = [
    {
      title: "Overview",
      icon: "ClipboardIcon",
      route: `/admin/courses/edit/${params?.id}/overview`,
    },
    {
      title: "Course Content",
      icon: "ClipboardIcon",
      route: `/admin/courses/edit/${params?.id}/contents`,
    },
    {
      title: "Instructors",
      icon: "ClipboardIcon",
      route: `/admin/courses/edit/${params?.id}/instructors`,
    },
    {
      title: "FAQ",
      icon: "ClipboardIcon",
      route: `/admin/courses/edit/${params?.id}/faqs`,
    },
    {
      title: "Reviews",
      icon: "ClipboardIcon",
      route: `/admin/courses/edit/${params?.id}/reviews`,
    },
  ];

  let courseDetails: any = {};
  await show({ api_key: "ADMIN_COURSE_API", addon: params?.id }).then(
    (resp: any) => {
      courseDetails = resp?.data;
    }
  );

  return (
    <CommonLayout
      title={`${courseDetails?.title}`}
      buttons={[
        <PublishUn
          data={courseDetails}
          url={`${params?.id}`}
          show_radio={true}
        />,
        <IdPathLink
          title="Preview"
          route={`/admin/courses/details/${courseDetails?.url_slug}`}
          className="bg-sky-700 text-white"
        />,
        {
          title: "Go Back",
          route: "/admin/courses",
          className: `bg-red-600 text-white`,
        },
      ]}
    >
      <div className="w-full border border-gray-200 main-wrapper p-2">
        <div className="w-full grid grid-cols-5 sticky sticky-custom top-0 z-10 tab-custom-dashboard mb-3 border-b border-gray-200">
          {tab_contents?.map(
            (
              tada: {
                title: string;
                icon: OutlineIconName | SolidIconName;
                route: string;
              },
              index: number
            ) => (
              <RouteChange
                key={index}
                condition={{
                  match: {
                    className: `flex justify-center items-center py-3 gap-3 relative bg-green-800 text-white sticky-padding ${
                      !!index && "border-0"
                    }`,
                  },
                  unmatch: {
                    className: `flex justify-center items-center py-3 gap-3 bg-gray-50 relative text-emerald-800 sticky-padding ${
                      !!index && "border-0"
                    }`,
                  },
                }}
                pathname={tada?.route}
              >
                <Link key={index} href={`${tada?.route}`}>
                  <DynamicHeroIcon s_icon={tada?.icon} className="size-5" />
                  {tada?.title}
                </Link>
              </RouteChange>
            )
          )}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </CommonLayout>
  );
};

export default Layout;
