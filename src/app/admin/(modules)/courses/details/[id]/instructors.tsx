import React from "react";
import InstructorCard from "../../_course_reuse/instructor-card";

const Instructors = ({ data }: { data: any }) => {
  return (
    <>
      <div className="w-full text-3xl font-semibold mb-6">
        Instructors
      </div>
      <div className="w-full grid grid-cols-3 gap-2">
        {
          data?.course_instructors?.map((tada: any, t_i: number) => (
            <InstructorCard key={t_i} instructor={tada} />
          ))
        }
      </div>
    </>
  );
};

export default Instructors;
