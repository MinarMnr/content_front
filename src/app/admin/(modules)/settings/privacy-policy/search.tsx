"use client";

import Input from "@/app/_components/input";
import { params_maker } from "@/app/_services/modifier";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [form, setForm]: [any, React.Dispatch<React.SetStateAction<any>>] =
    useState({});

  const pagination = useRef({ page: 1, size: 50 });

  const submit = (e: any) => {
    e?.preventDefault();
    router.push(
      `${pathname}${params_maker({
        ...pagination.current,
        ...form,
      })}`
    );
  };

  const resetForm = () => {
    router.push(
      `${pathname}${params_maker({
        ...pagination.current,
      })}`
    );
  };

  useEffect(() => {
    let searchParam = new URLSearchParams(searchParams);
    let parameters: any = {};
    searchParam?.forEach((tada_v: string, tada_k: string) => {
      parameters = {
        ...parameters,
        [tada_k]: tada_v
      }
    });
    setForm(parameters);
  }, [pathname, searchParams]);

  return (
    <form className="p-3" onSubmit={submit}>

      <div className="flex justify-between all-form-custom">

      
      <div className="flex-1">
      <Input
        id="title_en"
        name="title_en"
        placeholder="Title in English"
        data={form}
        setData={setForm}
        size="sm"
        label={"Title in English"}
        inp_style={"border border-black-300 px-2 py-1 rounded-md"}
      />
      </div>
      <div className="flex-1">
      <Input
        id="title_bn"
        name="title_bn"
        placeholder="Title in Bangla"
        data={form}
        setData={setForm}
        size="sm"
        label={"Title in Bangla"}
        inp_style={"border border-black-300 px-2 py-1 rounded-md"}
      />
      </div>
      <div className="flex-2 pl-2">
        <button
          type="button"
          className="px-4 py-2 mt-7 bg-red-600 text-white rounded-md"
          onClick={resetForm}
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 ml-1 bg-emerald-800 text-white rounded-md"
        >
          Search
        </button>
      </div>
      </div>

    </form>
  );
};

export default Search;
