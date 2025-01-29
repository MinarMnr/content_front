"use client";

import Input from "@/app/_components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const TextSearch = () => {
  const [search, setSearch] = useState({ title: "" });
  const router = useRouter();
  const searchParams = useRef(new URLSearchParams(useSearchParams()));

  const addToParams = (e: any) => {
    e?.preventDefault();
    router.push(
      `/all-instructors?search=${search?.title}`
    );
  };

  useEffect(() => {
    setSearch({
      title: searchParams?.current?.get("search") ?? "",
    });
  }, [searchParams?.current]);

  return (
    <>
      <form onSubmit={addToParams}>
        <Input
          size={"lg"}
          placeholder={"Search all Instructors..."}
          className={
            "ps-4 py-2 bg-transparent outline-none focus:bg-none focus:border-none rounded-full"
          }
          data={search}
          setData={setSearch}
          name={"title"}
        />
      </form>
      <button
        type="button"
        onClick={addToParams}
        className="px-6 py-2 m-1 bg-green-800 rounded-full text-white hover:bg-green-700"
      >
        <MagnifyingGlassIcon className="size-6 " />
      </button>
    </>
  );
};

export default TextSearch;
