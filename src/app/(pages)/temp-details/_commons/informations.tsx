import Accordion from "@/app/_components/accordion";
import { AccordionModel } from "@/app/lib/accordion";
import React from "react";

const Informations = () => {
  let accordionList: AccordionModel[] = [
    {
      header: (
        <div className="bg-green-800 text-white font-black text-xl px-4 py-3 border border-green-800">
          Aspects Specially Considered in HSC 2025 Online Batch':
        </div>
      ),
      body: (
        <ul className="w-full px-8 py-4 border-x border-green-800 list-disc text-gray-500 bg-white leading-9">
          <li>Your SSC exam was in short syllabus.</li>
          <li>
            Revised or Full Syllabus for your Board Exams anyway, Your
            preparation will not be left behind! The chapters that are more Your
            class starts with the important ones. from the government Any
            decision regarding syllabus changes is really yours accordingly
            Course curriculum will be updated.
          </li>
        </ul>
      ),
    },
    {
      header: (
        <div className="bg-green-100 text-white font-black text-xl px-4 py-3 border  border-x-green-800 border-b-0 border-[#c0dbce]">
          <span className="text-green-800">
            In HSC 2025 Online Batch' course students will get:
          </span>
        </div>
      ),
      body: <div className="w-full px-8 py-4 border-x border-[#6DC067]"></div>,
    },
    {
      header: (
        <div className="bg-green-100 text-white font-black text-xl px-4 py-3 border  border-x-green-800 border-b-0 border-[#c0dbce]">
          <span className="text-green-800">
            Are the courses applicable to English version students?
          </span>
        </div>
      ),
      body: <div className="w-full px-8 py-4 border-x border-[#6DC067]"></div>,
    },
    {
      header: (
        <div className="bg-green-100 text-white font-black text-xl px-4 py-3 border  border-x-green-800 border-b-green-800 border-[#c0dbce]">
          <span className="text-green-800">How many days course?</span>
        </div>
      ),
      body: <div className="w-full px-8 py-4 border-x border-[#6DC067]"></div>,
    },
  ];

  return (
    <div className="ignore-margin px-32 py-12">
      <div className="text-3xl mb-4">FAQ</div>
      <Accordion items={accordionList} init_open={[0]} />
    </div>
  );
};

export default Informations;
