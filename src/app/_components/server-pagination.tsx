import Link from "next/link";
import React from "react";
import DynamicHeroIcon from "./DynamicHeroIcon";
import { headers } from "next/headers";
import LangTra from "./lang-tra";

const SerevrPagination = async ({
  parent_route,
  currentTotal,
  extension = "",
  max_page,
}: {
  parent_route: string;
  currentTotal: number;
  extension?: string;
  max_page?: number;
}) => {
  let full_params: string | null = decodeURIComponent(
    (await headers()).get("x-current-params") ?? ""
  );
  let str_params: string | null = full_params;

  let currentPage: number = Number(
    str_params?.match(new RegExp(`(?<=${extension}page\=)[0-9]+`, "g"))?.[0]
  );
  let currentSize: number = Number(
    str_params?.match(new RegExp(`(?<=${extension}size\=)[0-9]+`, "g"))?.[0]
  );
  let otherSearch: string | undefined = str_params?.replace(
    new RegExp(
      `${extension}page\=[0-9]+\&{0,1}|${extension}size\=[0-9]+\&{0,1}`,
      "g"
    ),
    ""
  );

  return (
    <div className="col-span-3 flex justify-center items-center py-2">
      <Link
        href={`${parent_route}${
          otherSearch ? otherSearch : "?"
        }${extension}page=${1}&${extension}size=${currentSize}`}
        className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full ${
          currentPage === 1
            ? "pointer-events-none bg-emerald-800 text-white"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        <DynamicHeroIcon className="size-3" s_icon={"ChevronDoubleLeftIcon"} />
      </Link>
      <Link
        href={`${parent_route}${
          otherSearch ? otherSearch : "?"
        }${extension}page=${currentPage - 1}&${extension}size=${currentSize}`}
        className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full ${
          currentPage === 1
            ? "pointer-events-none bg-emerald-800 text-white"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        <DynamicHeroIcon className="size-3" s_icon={"ChevronLeftIcon"} />
      </Link>
      {max_page && currentPage - (max_page/2) > 1 ? (
        <div
          className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full`}
        >
          ...
        </div>
      ) : null}
      {Array.from(
        { length: Math.ceil(currentTotal / currentSize) },
        (tada: unknown, index: number) => {
          if (
            max_page &&
            max_page <= Math.ceil(currentTotal / currentSize) - 1 &&
            (index + 1 < currentPage - max_page / 2 ||
              index + 1 > currentPage + max_page / 2)
          ) {
            return null;
          } else {
            return (
              <Link
                key={index}
                href={`${parent_route}${
                  otherSearch ? otherSearch : "?"
                }${extension}page=${index + 1}&${extension}size=${currentSize}`}
                className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full  ${
                  currentPage === index + 1
                    ? "pointer-events-none bg-emerald-800 text-white"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                <LangTra control="value" data={{ value: index + 1 }} />
              </Link>
            );
          }
        }
      )}
      {max_page && currentPage + (max_page/2) < Math.ceil(currentTotal / currentSize) ? (
        <div
          className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full`}
        >
          ...
        </div>
      ) : null}
      <Link
        href={`${parent_route}${
          otherSearch ? otherSearch : "?"
        }${extension}page=${currentPage + 1}&${extension}size=${currentSize}`}
        className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full   ${
          currentPage === Math.ceil(currentTotal / currentSize)
            ? "pointer-events-none bg-emerald-800 text-white"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        <DynamicHeroIcon className="size-3" s_icon={"ChevronRightIcon"} />
      </Link>
      <Link
        href={`${parent_route}${
          otherSearch ? otherSearch : "?"
        }${extension}page=${Math.ceil(
          currentTotal / currentSize
        )}&${extension}size=${currentSize}`}
        className={`h-10 w-10 flex justify-center items-center mx-1 rounded-full  ${
          currentPage === Math.ceil(currentTotal / currentSize)
            ? "pointer-events-none bg-emerald-800 text-white"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        <DynamicHeroIcon className="size-3" s_icon={"ChevronDoubleRightIcon"} />
      </Link>
    </div>
  );
};

export default SerevrPagination;
