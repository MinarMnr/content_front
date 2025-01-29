import LangTra from "@/app/_components/lang-tra";
import React from "react";

const ExamSummary = ({ summary }: { summary: any }) => {
  return (
    <div className="flex flex-col justify-start items-stretch">
      <div>
        <LangTra control="course_details.ex_sum_total" />:{" "}
        <LangTra
          control="value"
          data={{
            value: summary?.total ?? 0,
          }}
        />
      </div>
      <div>
        <LangTra control="course_details.ex_sum_answered" />:{" "}
        <LangTra
          control="value"
          data={{
            value: summary?.answered ?? 0,
          }}
        />
      </div>
      <div>
        <LangTra control="course_details.ex_sum_correct" />:{" "}
        <LangTra
          control="value"
          data={{
            value: summary?.correct ?? 0,
          }}
        />
      </div>
      <div>
        <LangTra control="course_details.ex_sum_wrong" />:{" "}
        <LangTra
          control="value"
          data={{
            value: summary?.wrong ?? 0,
          }}
        />
      </div>
      <div>
        <LangTra control="course_details.ex_sum_not_ans" />:{" "}
        <LangTra
          control="value"
          data={{
            value: summary?.not_answered ?? 0,
          }}
        />
      </div>
      <div>
        <LangTra control="course_details.ex_sum_eval" />:{" "}
        <LangTra
          control="value"
          data={{
            value: summary?.sum_obtain_marks ?? 0,
          }}
        />
      </div>
      <hr />
      {/* {
        summary?.questions?.map(())
      } */}
    </div>
  );
};

export default ExamSummary;
