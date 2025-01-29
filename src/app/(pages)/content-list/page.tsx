"use server";

import Button from "@/app/_components/button";
import { content } from "@/app/lib/content";
import Link from "next/link";
import React from "react";

const page = () => {
  let contents: content[] = [
    {
      id: 1,
      title: "Content 1",
      description: "Content 1 Description",
    },
    {
      id: 2,
      title: "Content 2",
      description: "Content 2 Description",
    },
    {
      id: 3,
      title: "Content 3",
      description: "Content 3 Description",
    },
  ];

  return (
    <div>
      {contents.map((tada: content) => (
        <div key={`${tada?.id}`}>
          {tada?.title}
          <br />
          <Link href={`/content-list/${tada?.id}`}>Details</Link>
          <Button data={{ title: "Click Here" }}></Button>
        </div>
      ))}
    </div>
  );
};

export default page;
