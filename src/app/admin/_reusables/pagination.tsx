"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Pages = `${number}` | "...";

const Pagination = ({
  total,
  sizeList = [5, 10, 20, 50, 100],
}: {
  total: number;
  sizeList?: number[];
}) => {
  const [page, setPage]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(1);
  const [size, setSize]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(20);
  const [links, setLinks]: [
    Pages[],
    React.Dispatch<React.SetStateAction<Pages[]>>
  ] = useState(new Array<Pages>());

  const search = useRef('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let searchParam = new URLSearchParams(searchParams);
    let t_page: number = Number(searchParam?.get("page"));
    let t_size: number = Number(searchParam?.get("size"));
    search['current'] = '';
    searchParam?.forEach((tada_v: string, tada_k: string) => {
      if(tada_k !== 'page' && tada_k !== 'size'){
        search['current'] = `${search?.current ? `${search?.current}&` : ''}${tada_k}=${tada_v}`;
      }
    });
    if (!t_page || !t_size) {
      router.replace(`${pathname}?page=${page}&size=${size}${search?.current ? `&${search?.current}` : ''}`);
      return;
    } else {
      linksCreate(t_page, t_size);
    }
    if (t_page) {
      setPage(t_page);
    }
    if (t_size) {
      setSize(t_size);
    }
  }, [pathname, searchParams]);

  const linksCreate = (page: number, size: number) => {
    let current_mid: number = page;
    let smallest_bound: number = 1;
    let largest_bound: number = Math.ceil(total / size);
    let smaller_bound: number = Math.ceil((current_mid + smallest_bound) / 2);
    let larger_bound: number = Math.floor((current_mid + largest_bound) / 2);

    let links: Pages[] = Array.from({ length: largest_bound }).reduce(
      (pV: any[], cV: any, i: number) => {
        if (i === 0 || i === largest_bound - 1) {
          return [...pV, `${i + 1}`];
        } else if (
          i > current_mid - 4 &&
          i < current_mid + 2
          // (i > smaller_bound - 2 && i < smaller_bound + 2) ||
          // (i > current_mid - 2 && i < current_mid + 2) ||
          // (i > larger_bound - 2 && i < larger_bound + 2)
        ) {
          return [...pV, `${i + 1}`];
        } else if (pV?.[pV?.length - 1] !== "...") {
          return [...pV, `...`];
        } else {
          return pV;
        }
      },
      []
    );

    setLinks(links);
  };

  const redirectParam = (page: number, size: number) => {
    router.push(`${pathname}?page=${page}&size=${size}${search?.current ? search?.current : ''}`);
  };

  return (
    <div className="flex justify-between items-stretch py-2">
      <select
        value={size}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          redirectParam(page, Number(e?.target?.value));
        }}
        className="w-20 border rounded-lg"
      >
        {sizeList?.map((size: number, index: number) => (
          <option className="text-center" key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
      <div></div>
      <div className="flex flex-nowrap justify-center items-center border border-gray-200 rounded-md pagination-custom">
        <button
          className={`aspect-square flex justify-center items-center rounded-s-lg w-[42px] ${
            page === 1 ? "bg-white text-gray-500" : ""
          }`}
          disabled={page === 1}
          onClick={() => {
            redirectParam(1, size);
          }}
        >
          <DynamicHeroIcon className="size-4" s_icon={'ChevronDoubleLeftIcon'} />
        </button>
        <button
          className={`aspect-square flex justify-center items-center w-[42px]  ${
            page === 1 ? "bg-white text-gray-500" : ""
          }`}
          disabled={page === 1}
          onClick={() => {
            redirectParam(page - 1, size);
          }}
        >
          <DynamicHeroIcon className="size-4" s_icon={'ChevronLeftIcon'} />
        </button>
        {links?.map((link: Pages, index: number) => (
          <button
            key={index}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              if (Number(link)) {
                redirectParam(Number(link), size);
              }
            }}
            disabled={page === Number(link) || link === "..."}
            className={`aspect-square flex justify-center items-center w-[42px] text-sm  ${
              page === Number(link)
                ? "bg-green-800 text-white"
                : link === "..."
                ? "bg-white text-gray-500"
                : ""
            }`}
          >
            {link?.padStart(2, "0")}
          </button>
        ))}
        <button
          className={`aspect-square flex justify-center items-center w-[42px]  ${
            page === Number(links?.[links?.length - 1])
              ? "bg-white text-gray-500"
              : ""
          }`}
          disabled={page === Number(links?.[links?.length - 1])}
          onClick={() => {
            redirectParam(page + 1, size);
          }}
        >
          <DynamicHeroIcon className="size-4" s_icon={'ChevronRightIcon'} />
        </button>
        <button
          className={`aspect-square flex justify-center items-center rounded-e-lg w-[42px]  ${
            page === Number(links?.[links?.length - 1])
              ? "bg-white text-gray-500"
              : ""
          }`}
          disabled={page === Number(links?.[links?.length - 1])}
          onClick={() => {
            redirectParam(Number(links?.[links?.length - 1]), size);
          }}
        >
          <DynamicHeroIcon className="size-4" s_icon={'ChevronDoubleRightIcon'} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
