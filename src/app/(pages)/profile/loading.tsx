import React from "react";
import ProfileBanner from "../all-instructors/[id]/banner";
import Sidebar from "./sidebar";
import Details from "./details";

const loading = () => {
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
  return (
    <>
      <div className="w-full">
        <ProfileBanner />
      </div>
      <div className="container mx-auto py-6 grid grid-cols-7">
        <div className="col-span-2">
          <Sidebar tabLists={tabLists} />
        </div>
        <div className="col-span-5">
          <Details profile_data={{}} />
        </div>
      </div>
    </>
  );
};

export default loading;
