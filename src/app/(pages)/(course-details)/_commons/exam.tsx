"use client";

import { post, show } from "@/app/_services/api-call";
import React, { useEffect, useState } from "react";
import ExamSummary from "./exam-summary";
import LangTra from "@/app/_components/lang-tra";

interface Question {
  id: number;
  details: string;
  options: {
    id: number;
    details: string;
  }[];
}

type StopwatchControl = "resume" | "pause" | "reset" | "finish" | undefined;

const Examination = ({
  exam_id,
  course_id,
}: {
  exam_id: number;
  course_id: number;
}) => {
  const [exam, setExam] = useState<any>();

  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<{
    [key: string]: { question: string; answer: string };
  }>({});

  const [result, setResult] = useState<any>(undefined);

  useEffect(() => {
    if (exam_id) {
      show({
        api_key: "COURSE_API",
        addon: `${course_id}/exams/${exam_id}`,
      }).then((resp: any) => {
        if (resp?.status === "success") {
          setExam(resp?.data);
        }
      });
    }
  }, [exam_id]);

  const submit = () => {
    post({
      api_key: "COURSE_API",
      body: {
        questions: Object.entries(answer)?.reduce(
          (pV: any[], [key, val]: [string, any]) => {
            return [
              ...pV,
              {
                id: key,
                title: val?.question,
                options: {
                  id: val?.answer,
                },
              },
            ];
          },
          []
        ),
      },
      addon: `${course_id}/exams/${exam_id}/submit`,
    }).then((resp: any) => {
      if (resp?.status === "success") {
        setResult(resp?.data);
      }
    });
  };

  return (
    <div className="bg-white w-full flex flex-col p-6 gap-4">
      <div className="w-full flex justify-center items-center gap-2">
        <div className="w-1/5">{exam?.title}</div>
        <div className="flex-grow grid grid-cols-4 gap-1">
          {/* <Timer className={'col-span-4'} remaining={'33 d'} format={'d-h-m-s'} control={timeControl} setControl={setTimeControl} />
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('resume')}}>Resume</button>
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('pause')}}>Pause</button>
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('reset')}}>Reset</button>
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('finish')}}>Finish</button> */}
        </div>
        {!result ? (
          <button
            className="w-1/5 px-2 py-1 border bg-green-600 text-white"
            onClick={submit}
          >
            <LangTra control="course_details.ex_submit" />
          </button>
        ) : null}
      </div>
      {!!result ? (
        <ExamSummary summary={result} />
      ) : (
        <>
          <div className="w-full flex flex-row justify-start items-start gap-1">
            {exam?.questions?.map((question: Question, q_index: number) => (
              <div
                className={`w-1/12 py-1 text-center border ${
                  activeQuestion === q_index
                    ? "border-green-600 bg-emerald-200"
                    : "border-emerald-200"
                }`}
                key={q_index}
                onClick={() => setActiveQuestion(q_index)}
              >
                <LangTra control="value" data={{ value: q_index + 1 }} />
              </div>
            ))}
          </div>
          <div className="w-full text-3xl">
            <div
              className="remove-all"
              dangerouslySetInnerHTML={{
                __html: exam?.questions?.[activeQuestion ?? 0]?.title ?? "",
              }}
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start">
            {exam?.questions?.[activeQuestion ?? 0]?.options?.map(
              (option: any, o_index: number) => (
                <div
                  key={o_index}
                  className="flex justify-start items-center gap-1"
                >
                  <input
                    name={`answer-${option?.question_id}`}
                    type="radio"
                    checked={
                      Number(answer?.[option?.question_id]?.answer) ===
                      Number(option?.id)
                    }
                    id={option?.id}
                    onChange={(e) =>
                      setAnswer((v) => ({
                        ...v,
                        [option?.question_id]: {
                          question:
                            exam?.questions?.[activeQuestion ?? 0]?.title,
                          answer: option?.id,
                        },
                      }))
                    }
                  />
                  <label htmlFor={option?.id}>
                    <div
                      className="remove-all"
                      dangerouslySetInnerHTML={{ __html: option?.title ?? "" }}
                    />
                  </label>
                </div>
              )
            )}
          </div>
          <div className="w-full flex justify-end items-center gap-6">
            <button
              className="bg-sky-300 px-3 py-1 rounded-md"
              onClick={() => {
                setActiveQuestion(
                  activeQuestion === 0
                    ? exam?.questions?.length - 1
                    : (activeQuestion ?? 0) - 1
                );
              }}
            >
              <LangTra control="course_details.ex_prev" />
            </button>
            <button
              className="bg-sky-300 px-3 py-1 rounded-md"
              onClick={() => {
                setActiveQuestion(
                  activeQuestion === exam?.questions?.length - 1
                    ? 0
                    : (activeQuestion ?? 0) + 1
                );
              }}
            >
              <LangTra control="course_details.ex_next" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Examination;
