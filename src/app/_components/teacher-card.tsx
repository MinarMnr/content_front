import Link from "next/link";
import Image from "next/image";
import React from "react";
import LangTra from "./lang-tra";

const TeacherCard = ({ data, parent }: { data: any, parent: string }) => {
  return (
    <div
      className="mx-auto mt-4 flex-[0_0_256px] group"
      style={{
        background: "#fff",
        maxWidth: "fit-content",
        position: "relative",
        transition: "transform .3s ease-in-out",
        zIndex: 2,
      }}
    >
      <Link href={`${parent}/${data?.id}`}>
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white text-[0]">
          <div
            className="h-[256px] w-[256px] opacity-0 transition-opacity duration-300 ease-in-out"
            style={{ fontSize: "0px", opacity: "1" }}
          >
            <Image
              src={data?.profile_photo}
              alt={"Instructor Profile"}
              width={500}
              height={500}
              loading="lazy"
              decoding="async"
              data-nimg="1"
            />
          </div>
          <div
            className="p-4 text-center text-white"
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent, rgba(0, 0, 0, .8))",
              bottom: 0,
              height: "100%",
              position: "absolute",
              width: "100%",
            }}
          >
            <div className="w-full transition-all duration-300 ease-in-out group-hover:bottom-0 absolute bottom-[-36px] left-0 pb-4">
              <div className="name-title p-2">
                <h3 className="mb-1 text-lg font-bold">{data?.name_en}</h3>
                <div className="text-sm text-gray-100 line-clamp-1 mt-0">
                  {data?.email}
                </div>
              </div>
              <button className="inline-block  bg-green-700 border rounded-full border-green-600 px-4 py-2 text-sm text-white opacity-0 group-hover:opacity-100 hover:bg-green-600 transition-opacity duration-300 ease-in-out">
                <LangTra control="cart.details" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeacherCard;
