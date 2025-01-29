import React from "react";
import Instructors from "./_commons/instructors";
import Syllabus from "./_commons/syllabus";
import Informations from "./_commons/informations";
import RelatedCourses from "./_commons/related-courses";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="ignore-margin">{children}</div>;
};

export default layout;
