"use client";

import React, { useEffect, useState } from "react";

const Menu = ({
  children,
}: {
  children: { control: React.ReactNode; items: React.ReactNode };
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", (e) => {
      setMenuOpen(false);
    });
  }, []);

  return (
    <div className="relative menu-list-holder">
      <div
        onClick={(e) => {
          e?.preventDefault();
          setMenuOpen(!menuOpen);
        }}
      >
        {children?.control}
      </div>
      <div
        onClick={(e) => {
          e?.preventDefault();
          setMenuOpen(false);
        }}
        className={`top-full right-0 ${
          menuOpen ? "absolute" : "hidden"
        } w-auto shadow-md shadow-slate-800 bg-white z-50 rounded-lg`}
      >
        {children?.items}
      </div>
    </div>
  );
};

export default Menu;
