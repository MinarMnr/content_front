import Link from "next/link";
import React, { Fragment } from "react";

interface Btn {
  route: string;
  title?: string;
  className?: string;
}

function isBtn(object: any): object is Btn {
  return "route" in object;
}

const CommonLayout = ({
  children,
  title,
  buttons,
}: {
  children: React.ReactNode;
  title: string;
  buttons: (Btn | React.ReactNode)[];
}) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center pb-3">
        <span className="text-2xl font-medium text-gray-500">{title}</span>
        <div className="flex gap-x-1">
          {buttons?.map((buton: Btn | React.ReactNode, index: number) => (
            <Fragment key={index}>
              {isBtn(buton) ? (
                <Link
                  className={`px-6 py-2 rounded-md ${buton?.className}`}
                  href={buton?.route}
                >
                  {buton?.title ?? ""}
                </Link>
              ) : (
                buton
              )}
            </Fragment>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CommonLayout;
