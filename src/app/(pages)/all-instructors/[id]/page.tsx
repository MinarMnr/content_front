import React from "react";
import ProfileBanner from "./banner";
import Intro from "./intro";
import { show } from "@/app/_services/api-call";
import Details from "./details";

const Profile = async (props: any) => {
  let instructor_id: string = (await props?.params)?.id;
  let instructor: any;

  await show({
    api_key: "USER_PROFILE_API",
    addon: instructor_id,
  }).then((resp: any) => {
    instructor = resp?.data;
  });

  return (
    <div className={`w-full ${props?.className}`}>
      <div className="col-span-12">
        <ProfileBanner name_key="instructors.inst_profile" />
      </div>
      <div className="container mx-auto px-6 pl-28 pr-28">
        <div className="grid grid-cols-3 gap-x-4">
          <div className="mt-[-120px] w-full z-30">
            <Intro instructor={instructor} />
          </div>
          <div className="col-span-2">
            <Details instructor={instructor} />
          </div>
        </div>
      </div>

      {/* <div className="col-span-12">
        <BecomeTutor />
      </div> */}
    </div>
  );
};

export default Profile;
