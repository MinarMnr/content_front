import React from "react";
import TopBanner from "./topBanner";
import TopCards from "./topCards";
import { Metadata } from "next";
import DashboardCourses from "./allCourses";
import EBookBanner from "./eBookBanner";
import TopSkills from "./topSkills";
import TopTutors from "./topTutors";
import StudentReview from "./studentReviews";
import { show } from "@/app/_services/api-call";

export const metadata: Metadata = {
  title: "HomePage",
};

const Dashboard = async () => {
  let home_data: any;
  await show({ api_key: "HOME_API" }).then((resp: any) => {
    console.log(resp)
    home_data = resp?.data;
  });
  return (
    <>
      <div className="">
        <TopBanner />
      </div>
      <div className="">
        <TopCards />
      </div>
      <div className="">
        <DashboardCourses data={home_data?.featured_courses} />
      </div>
      <div className="">
        <EBookBanner />
      </div>
      <TopSkills data={home_data?.skilled_courses} />
      <StudentReview data={home_data?.top_reviews} />
      <div className="bg-gray-all">
        <TopTutors tutors={home_data?.tutors} />
      </div>
    </>
  );
};

export default Dashboard;
