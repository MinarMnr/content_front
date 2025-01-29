import { show } from "@/app/_services/api-call";
import { AccordionModel } from "@/app/lib/accordion";
import React from "react";
import { InvoiceItems } from "../purchase/payment/invoice";
import Accordion from "@/app/_components/accordion";
import SerevrPagination from "@/app/_components/server-pagination";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LangTra from "@/app/_components/lang-tra";

const Purchased = async () => {
  let total: number = 0;
  let page: number = 1;
  let size: number = 10;

  let full_params: string | null = decodeURIComponent(
    (await headers()).get("x-current-params") ?? ""
  );

  if (
    /page\=\d+/g.test(full_params ? full_params : "") &&
    /size\=\d+/g.test(full_params ? full_params : "")
  ) {
    page = Number(full_params?.match(/(?<=page\=)\d+/)?.[0]);
    size = Number(full_params?.match(/(?<=size\=)\d+/)?.[0]);
  } else {
    return redirect(`/profile?segment=purchased&page=1&size=10`);
  }

  let items: AccordionModel[] = await show({
    api_key: "USER_TRANSACTION_HISTORY_API",
    parameters: {
      page,
      size,
    },
  }).then((resp: any) => {
    total = resp?.meta?.total;
    return resp?.status === "success"
      ? resp?.data?.map((tada: any, index: number) => ({
          header: (
            <div
              className={`flex justify-start items-center text-white pl-8 pr-16 py-4 ${
                index ? "mt-3" : ""
              } ${
                tada?.payment_status === "Paid"
                  ? "bg-emerald-400"
                  : "bg-green-100 border border-gray-200"
              }`}
            >
              <div className="flex-grow">
                <span>{tada?.invoice_code}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>
                  <LangTra control="value" data={{ value: tada?.item_count }} />
                </span>
                <span>
                  <LangTra control="value" data={{ value: tada?.total }} />
                </span>
                <span>
                  <LangTra control="payment_status" data={tada} />
                </span>
              </div>
            </div>
          ),
          body: (
            <div className="w-full border p-2">
              <InvoiceItems items={tada?.items} />
            </div>
          ),
        }))
      : [];
  });

  return (
    <div className="w-full flex flex-col justify-start items-stretch">
      <div className="text-3xl  border-l-4 border-green-700 ps-3 mb-5">
        <LangTra control="profile.purc_history" />
      </div>
      <Accordion items={items} />
      <SerevrPagination
        parent_route={"/profile"}
        currentTotal={total}
        max_page={7}
      />
    </div>
  );
};

export default Purchased;
