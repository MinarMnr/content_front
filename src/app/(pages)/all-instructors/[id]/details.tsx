import CourseCard from "@/app/_components/course-card";
import LangTra from "@/app/_components/lang-tra";
import React from "react";

const Details = ({ instructor }: { instructor: any }) => {
  return (
    <div>
      <div>
        <h1 className="text-green-700 text-2xl mb-5 mt-12">
          <b className="text-3xl">
            <LangTra control="instructors.hello" />
          </b>{" "}
          {instructor?.name_en}
        </h1>
        <div
          className="remove-all"
          dangerouslySetInnerHTML={{ __html: instructor?.about ?? "" }}
        />
      </div>

      <div className="mt-8">
        <div className="text-2xl font-semibold 800 text-left relative left-categories border-b pb-2 ">
          <LangTra control="profile.contri_courses" />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-5">
          {instructor?.course_instructors?.map((tada: any, index: number) => (
            <CourseCard data={tada} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
