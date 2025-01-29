import React from "react";
import Instructors from "./_commons/instructors";
import Syllabus from "./_commons/syllabus";
import Informations from "./_commons/informations";
import RelatedCourses from "./_commons/related-courses";
import CourseDetailsTabs from "./_commons/courseDetailsTabs";
import CourseDetails from "./_commons/courseDetails";
import './temp-style.scss';

const layout = ({
  children,
  stickyComp,
  headerComp,
}: {
  children: React.ReactNode;
  stickyComp: React.ReactNode;
  headerComp: React.ReactNode;
}) => {
  return (
    <div className="w-full banner-all-details-temp">
      <div className="w-full h-[246px]">{headerComp}</div>
      <div className="top-0 z-20 pr-[170px]" style={{ position: "sticky" }}>
        {stickyComp}
      </div>
      <div className="pt-8 min-h-[200px]">{children}</div>
      <div className="container mx-auto px-6 pl-28 mt-[38px]">
        <div className="flex items-top flex-wrap">
          <div className="w-full md:w-2/3">
            <div className="lg:mr-30px relative mb-10 lg:mb-0">
              <div
                className="top-0 z-20 pt-4 bg-white"
                style={{ position: "sticky" }}
              >
                <CourseDetailsTabs />
              </div>
              <div id="intro">
                <CourseDetails />
              </div>
              <div id="details" className="pt-10">
                <Syllabus />
              </div>
              <div id="ins">
                <Instructors />
              </div>
              <div id="ask">
                <Informations />
              </div>
            </div>
          </div>
          <RelatedCourses />
        </div>
      </div>
    </div>
  );
};

export default layout;
