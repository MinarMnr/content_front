import Accordion from "@/app/_components/accordion";
import LangTra from "@/app/_components/lang-tra";
import { AccordionModel } from "@/app/lib/accordion";
import React from "react";

const Informations = ({ faqs }: { faqs: any[] }) => {
  let accordionList: AccordionModel[] = faqs?.map((faq: any, f_i: number) => ({
    header: (
      <div className="bg-green-800 text-white font-medium text-xl px-4 py-3 border border-green-800">
        <span
          className="remove-all"
          dangerouslySetInnerHTML={{ __html: faq?.question ?? "" }}
        />
      </div>
    ),
    body: (
      <div
        className={`w-full px-8 py-4 border-x border-[#6DC067] ${
          length - 1 === f_i ? "border-b" : ""
        }`}
      >
        <span
          className="remove-all"
          dangerouslySetInnerHTML={{
            __html: faq?.answer,
          }}
        />
      </div>
    ),
  }));

  return (
    <div className="ignore-margin px-32 py-12">
      <div className="text-3xl font-semibold mb-6">
        <LangTra control="course_details.course_faq" />
      </div>
      <Accordion items={accordionList} init_open={[0]} />
    </div>
  );
};

export default Informations;
