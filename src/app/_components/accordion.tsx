"use client";

import React, { useEffect, useState } from "react";
import { AccordionModel } from "../lib/accordion";
import "../_scss/accordion.scss";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Accordion = ({
  items,
  single,
  init_open,
  ...props
}: {
  items: AccordionModel[];
  single?: boolean;
  init_open?: number[];
  [key: string]: any;
}) => {
  const [open, setOpen] = useState<Set<number>>(() => new Set<number>());

  useEffect(() => {
    let temp_set = new Set<number>();
    init_open?.forEach((tada: any) => {
      temp_set?.add(tada);
    });
    setOpen(temp_set);
  }, [init_open]);

  return (
    <div className={`${props?.className ?? ""} custom-accordion py-4`}>
      {items?.map((tada: AccordionModel, i: number) => (
        <div key={i} className="item-of-accordion">
          <div
            className={`accordion-header ${open?.has(i) ? "open" : "close"}`}
            onClick={() => {
              if (open?.has(i)) {
                setOpen((prev) => {
                  let preSet = new Set(prev);
                  preSet.delete(i);
                  return preSet;
                });
              } else {
                setOpen((prev) => new Set(prev).add(i));
              }
            }}
          >
            {tada?.header}
            <ChevronDownIcon className="size-5 text-black acc-head-icon stroke-2" />
          </div>
          <div className={`accordion-body ${open?.has(i) ? "open" : "close"}`}>
            <div>{tada?.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
