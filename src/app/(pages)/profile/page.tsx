import React from "react";
import Auth from "./auth";
import Purchased from "./purchased";
import ProfileBanner from "../all-instructors/[id]/banner";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFIleUrl, paramsStringToObj } from "@/app/_services/modifier";
import { show } from "@/app/_services/api-call";
import Details from "./details";
import Sidebar from "./sidebar";
import Owned from "./owned";
import EditImage from "./_forms/edit-image";

const Page = async () => {
  let str_params: string | null = (await headers()).get("x-current-params");

  let route_params: any = paramsStringToObj(str_params);

  if (!str_params) {
    redirect(`profile?segment=details`);
  }
  const paramLists: any[] = [
    {
      title: "Profile",
      param: "details",
    },
    {
      title: "Security",
      param: "security",
    },
    {
      title: "Purchased",
      param: "purchased",
    },
    {
      title: "Owned",
      param: "owned",
    },
  ];

  const tabLists: { accessor: string; segment: string; modal?: string }[] = [
    {
      accessor: "profile",
      segment: "details",
    },
    // {
    //   accessor: 'update_profile',
    //   segment: "details",
    //   modal: "1",
    // },
    {
      accessor: "change_pass",
      segment: "details",
      modal: "2",
    },
    {
      accessor: "courses",
      segment: "owned",
    },
    {
      accessor: "purchase_history",
      segment: "purchased",
    },
  ];

  let profileData: any = {};
  await show({ api_key: "PROFILE_API" }).then((resp: any) => {
    profileData = resp?.data;
  });

  return (
    <>
      <div className="w-full">
        <ProfileBanner name_key="profile.profile" />

        <div className="profile-layout relative">
          <div className="profile-layout-top container m-auto">
            <div className="profile-img">
              <EditImage image_url={profileData?.profile_photo} ratio={1} />
            </div>

            <div className="profile-sidebar">
              <Sidebar tabLists={tabLists} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 py-6">
        <div className="col-span-5">
          {(() => {
            switch (route_params?.["segment"]) {
              case `${paramLists?.[0]?.param}`:
                return (
                  <Details
                    profile_data={profileData}
                    modal={route_params?.["modal"]}
                  />
                );
              case `${paramLists?.[1]?.param}`:
                return <Auth />;
              case `${paramLists?.[2]?.param}`:
                return <Purchased />;
              case `${paramLists?.[3]?.param}`:
                return <Owned />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default Page;
