import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { show } from "@/app/_services/api-call";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { InvoiceItems, InvoiceTable } from "../payment/invoice";
import "../payment/invoice.scss";
import LangTra from "@/app/_components/lang-tra";

const Page = async () => {
  let str_params: string | null = (await headers()).get("x-current-params");
  let status: string | undefined = str_params?.match(/(?<=status\=)[^&]+/)?.[0];

  let invoice_data: any;

  if (status === "success") {
    await show({
      api_key: "INVOICE_API",
      addon: (str_params as string)?.match(/(?<=invoice_id\=)[^&]+/)?.[0],
    })
      .then((resp: any) => {
        if (resp?.status === "success") {
          invoice_data = resp?.data;
        } else {
          invoice_data = undefined;
        }
      })
      .catch((error: any) => {
        invoice_data = undefined;
      });
  }

  return (
    <div className="flex justify-center items-center py-4">
      <div className="p-6 flex flex-col justify-start items-center w-2/3 gap-y-6 border border-dashed border-gray-500">
        {((params) => {
          switch (status) {
            case "success":
              ``;
              return (
                <>
                  <div className="text-center">
                    <LangTra control="invoice.inv_data" />
                  </div>
                  <InvoiceTable data={invoice_data} />
                  <InvoiceItems items={invoice_data?.items} />
                  <div className="w-fit aspect-square rounded-full p-4 border border-dotted border-emerald-600">
                    <DynamicHeroIcon
                      s_icon="CheckIcon"
                      className="size-12 text-emerald-600"
                    />
                  </div>
                  <div className="w-full text-center text-emerald-300 text-3xl">
                    {decodeURIComponent(
                      params?.match(/(?<=message\=)[^\&]+/)?.[0] ?? ""
                    )
                      ?.replaceAll("%5C", "/")
                      ?.replaceAll("+", " ")}
                  </div>
                </>
              );
            case "failed":
              return (
                <>
                  <div className="w-fit aspect-square rounded-full p-4 border border-dotted border-red-600">
                    <DynamicHeroIcon
                      s_icon="XMarkIcon"
                      className="size-12 text-red-600"
                    />
                  </div>
                  <div className="w-full text-center text-red-300 text-3xl">
                    {decodeURIComponent(
                      params?.match(/(?<=message\=)[^\&]+/)?.[0] ?? ""
                    )
                      ?.replaceAll("%5C", "/")
                      ?.replaceAll("+", " ")}
                  </div>
                </>
              );
            default:
              return null;
          }
        })(str_params)}
        <div className="w-full grid grid-cols-3 gap-x-3">
          <Link
            className="w-full block text-center py-2 bg-blue-400 text-white"
            href={"/profile?segment=owned"}
          >
            <LangTra control="invoice.regd_courses" />
          </Link>
          {/(?<=status\=)success/?.test(str_params ?? "") ? (
            <Link
              className="w-full block text-center py-2 bg-blue-400 text-white"
              href={"/profile?segment=purchased"}
            >
              <LangTra control="invoice.trans_hist" />
            </Link>
          ) : /(?<=status\=)failed/?.test(str_params ?? "") ? (
            <Link
              className="w-full block text-center py-2 bg-blue-400 text-white"
              href={"/purchase/cart"}
            >
              <LangTra control="invoice.go_checkout" />
            </Link>
          ) : null}
          <Link
            className="w-full block text-center py-2 bg-blue-400 text-white"
            href={"/"}
          >
            <LangTra control="invoice.homepage" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
