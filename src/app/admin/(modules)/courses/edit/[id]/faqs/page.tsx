import Accordion from "@/app/_components/accordion";
import { show } from "@/app/_services/api-call";
import DeleteModal from "@/app/admin/_reusables/delete-modal";
import { AccordionModel } from "@/app/lib/accordion";
import { headers } from "next/headers";
import React from "react";
import FaqForm from "./form";
import Link from "next/link";
import {
  SingleFaqBody,
  SingleFaqHeader,
} from "../../../_course_reuse/single-faq";
import AllFaqs from "./all-faqs";

const Page = async (props: any) => {
  // let accordionList: AccordionModel[] = [];
  // let total: number = 0;
  let str_params: string | null = (await headers()).get("x-current-params");
  let courseId: string = (await props?.params)?.id;
  let add_modal: string | undefined = str_params?.match(/add_modal\=add/)?.[0];
  let edit_modal_id: string | undefined = str_params?.match(
    /(?<=edit_modal_id\=)\d+/
  )?.[0];
  let delete_modal_id: string | undefined = str_params?.match(
    /(?<=delete_modal_id\=)\d+/
  )?.[0];

  let single_data: any;

  if (!!edit_modal_id || !!delete_modal_id) {
    await show({
      api_key: "ADMIN_COURSE_API",
      addon: `${courseId}/faqs/${edit_modal_id || delete_modal_id}`,
    }).then((resp: any) => {
      single_data = resp?.data;
    });
    // } else if (!add_modal) {
    //   await show("ADMIN_COURSE_API", `${courseId}/faqs`, {
    //     page: 1,
    //     size: -1,
    //   }).then((resp: any) => {
    //     accordionList = (resp?.data?.length ? resp?.data : [])?.map(
    //       (tada: any, index: number) => ({
    //         header: <SingleFaqHeader data={tada} courseId={courseId} />,
    //         body: (
    //           <SingleFaqBody
    //             data={tada}
    //             length={resp?.data?.length}
    //             index={index}
    //           />
    //         ),
    //       })
    //     );
    //     total = resp?.meta?.total;
    //   });
  }

  // await show("ADMIN_COURSE_API", `${courseId}/faqs`, {
  //   page: 1,
  //   size: -1,
  // }).then((resp: any) => {
  //   accordionList = (resp?.data?.length ? resp?.data : [])?.map(
  //     (tada: any, index: number) => ({
  //       header: <SingleFaqHeader data={tada} courseId={courseId} />,
  //       body: (
  //         <SingleFaqBody
  //           data={tada}
  //           length={resp?.data?.length}
  //           index={index}
  //         />
  //       ),
  //     })
  //   );
  //   total = resp?.meta?.total;
  // });

  return (
    <>
      {delete_modal_id ? (
        <DeleteModal
          api_endpoint={"ADMIN_COURSE_API"}
          data_id={`${courseId}/faqs/${delete_modal_id}`}
        />
      ) : null}
      {add_modal || edit_modal_id ? (
        <FaqForm
          api_url={`${courseId}/faqs`}
          edit_data={single_data}
          edit_id={edit_modal_id}
        />
      ) : null}
      <div className="no-expand-icon">
        {/* <Accordion items={accordionList} init_open={[0]} /> */}
        <div className="flex justify-end">
          <Link
            className="w-40 py-2   bg-green-800 ps-5 text-center my-1 inline-flex text-white rounded-md mb-2"
            href={`/admin/courses/edit/${courseId}/faqs?add_modal=add`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add FAQ
          </Link>
        </div>
        <AllFaqs courseId={courseId} />
      </div>
    </>
  );
};

export default Page;
