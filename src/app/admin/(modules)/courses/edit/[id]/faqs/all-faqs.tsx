"use client";

import React, { useEffect, useState } from "react";
import {
  SingleFaqBody,
  SingleFaqHeader,
} from "../../../_course_reuse/single-faq";
import { show } from "@/app/_services/api-call";
import { useSearchParams } from "next/navigation";

const AllFaqs = ({ courseId }: { courseId: string }) => {
  const [faq_list, setFaqs] = useState<any[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    show({
      api_key: "ADMIN_COURSE_API",
      addon: `${courseId}/faqs`,
      parameters: {
        page: 1,
        size: -1,
      },
    }).then((resp: any) => {
      setFaqs(resp?.data);
    });
  }, [searchParams.size, courseId]);

  return (
    <div>
      {faq_list?.map((tada: any, tada_i: number) => (
        <div key={`all-faq-${tada_i}`}>
          <div>
            <SingleFaqHeader data={tada} courseId={courseId} />
          </div>
          <div className="border mb-3 pl-3 pr-3">
            <SingleFaqBody
              data={tada}
              length={faq_list?.length}
              index={tada_i}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFaqs;
