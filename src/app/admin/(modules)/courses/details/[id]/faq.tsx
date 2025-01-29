import Accordion from "@/app/_components/accordion";
import { AccordionModel } from "@/app/lib/accordion";
import React from "react";
import { SingleFaqBody, SingleFaqHeader } from "../../_course_reuse/single-faq";

const Faq = async ({ data }: { data: any }) => {
  let accordionList: AccordionModel[] = data?.course_faqs?.map(
    (tada: any, index: number) => ({
      header: <SingleFaqHeader data={tada} courseId={data?.id} controls={false} />,
      body: (
        <SingleFaqBody
          data={tada}
          length={data?.course_faqs?.length}
          index={index}
        />
      ),
    })
  );

  return (
    <>
      <div className="w-full text-3xl font-semibold mb-6">FAQ</div>
      <div className="w-full">
        <Accordion items={accordionList} init_open={[0]} />
      </div>
    </>
  );
};

export default Faq;
