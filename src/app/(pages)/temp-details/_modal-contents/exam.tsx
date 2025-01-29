"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import Timer from "@/app/_components/timer";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Question {
  id: number;
  details: string;
  options: {
    id: number;
    details: string;
  }[];
}

type StopwatchControl = "resume" | "pause" | "reset" | "finish" | undefined;

const page = () => {
  let questions: Question[] = [
    {
      id: 1,
      details: "1+1=?",
      options: [
        {
          id: 1,
          details: "-1",
        },
        {
          id: 1,
          details: "0",
        },
        {
          id: 1,
          details: "2",
        },
        {
          id: 1,
          details: "1",
        },
      ],
    },
    {
      id: 1,
      details: "1+2=?",
      options: [
        {
          id: 1,
          details: "-2",
        },
        {
          id: 1,
          details: "1",
        },
        {
          id: 1,
          details: "3",
        },
        {
          id: 1,
          details: "12",
        },
      ],
    },
    {
      id: 1,
      details: "3+1=?",
      options: [
        {
          id: 1,
          details: "3",
        },
        {
          id: 1,
          details: "31",
        },
        {
          id: 1,
          details: "13",
        },
        {
          id: 1,
          details: "4",
        },
      ],
    },
    {
      id: 1,
      details: "1*1=?",
      options: [
        {
          id: 1,
          details: "-1",
        },
        {
          id: 1,
          details: "0",
        },
        {
          id: 1,
          details: "2",
        },
        {
          id: 1,
          details: "1",
        },
      ],
    },
    {
      id: 1,
      details: "14/7=?",
      options: [
        {
          id: 1,
          details: "-1",
        },
        {
          id: 1,
          details: "0",
        },
        {
          id: 1,
          details: "2",
        },
        {
          id: 1,
          details: "1",
        },
      ],
    },
  ];

  const [activeQuestion, setActiveQuestion]: [number, Function] = useState(0);
  const [answer, setAnswer]: [number | null, Function] = useState(null);

  const [timeControl, setTimeControl]: [StopwatchControl, React.Dispatch<React.SetStateAction<StopwatchControl>>] = useState();
  useEffect(() => {
  }, [activeQuestion]);

  return (
    <div className="bg-white w-[1080px] flex flex-col p-6 gap-4">
      <div className="w-full flex justify-center items-center gap-2">
        <div className="w-1/5">Math-101</div>
        <div className="flex-grow grid grid-cols-4 gap-1">
          <Timer className={'col-span-4'} remaining={'33 d'} format={'d-h-m-s'} control={timeControl} setControl={setTimeControl} />
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('resume')}}>Resume</button>
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('pause')}}>Pause</button>
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('reset')}}>Reset</button>
          <button className="col-span-1 p-2 border rounded-lg" onClick={() => {setTimeControl('finish')}}>Finish</button>
        </div>
        <button className="w-1/5 px-2 py-1 border bg-green-600 text-white">
          Submit
        </button>
        <Link href={"/temp-details/paid"}>
          <button className="w-auto text-center p-1 rounded-full bg-red-500 text-white">
            <DynamicHeroIcon s_icon={"XMarkIcon"} className={"size-6"} />
          </button>
        </Link>
      </div>
      <div className="w-full flex flex-row justify-start items-start gap-1">
        {questions?.map((question: Question, q_index: number) => (
          <div
            className={`w-1/12 py-1 text-center border ${
              activeQuestion === q_index
                ? "border-green-600 bg-emerald-200"
                : "border-emerald-200"
            }`}
            key={q_index}
            onClick={() => setActiveQuestion(q_index)}
          >
            {q_index + 1}
          </div>
        ))}
      </div>
      <div className="w-full text-3xl">
        {questions?.[activeQuestion ?? 0]?.details}
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        {questions?.[activeQuestion ?? 0]?.options?.map((option, o_index) => (
          <div key={o_index} className="flex justify-start items-center gap-1">
            <input
              name={"answer"}
              // onChange={() => setAnswer(o_index)}
              type="radio"
              id={`${o_index}`}
            />
            <label htmlFor={`${o_index}`}>{option?.details}</label>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end items-center gap-6">
        <button
          className="bg-sky-300 px-3 py-1 rounded-md"
          onClick={() => {
            setActiveQuestion(
              activeQuestion === 0 ? questions?.length - 1 : (activeQuestion ?? 0) - 1
            );
          }}
        >
          Prev
        </button>
        <button
          className="bg-sky-300 px-3 py-1 rounded-md"
          onClick={() => {
            setActiveQuestion(
              activeQuestion === questions?.length - 1 ? 0 : (activeQuestion ?? 0) + 1
            );
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default page;
