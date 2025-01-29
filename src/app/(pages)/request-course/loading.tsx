import React from "react";

const Loading = () => {
  return (
    <>
      <div className={`py-10 grid grid-cols-1 gap-y-2`}>
        <div className="container mx-auto pt-50 pb-90px pl-28 pr-28 mt-8">
          <div className="text-2xl font-bold text-center">Request a Course</div>

          <div className="flex flex-wrap  bg-gray-50 border border-dashed  w-full p-3">
            <div className="w-full md:w-1/2 px-2 mt-4"></div>

            <div className="w-full md:w-1/2 px-2 mt-4"></div>

            <div className="w-full md:w-1/3 px-2 mt-4"></div>

            <div className="w-full md:w-1/3 px-2 mt-4"></div>

            <div className="w-full md:w-1/3 px-2 mt-4"></div>

            <div className="w-full md:w-full px-2 mt-4"></div>

            <div className="w-full md:w-full px-2 mt-4"></div>
          </div>

          <div className="w-full px-2 flex justify-end mb-4 mt-12"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
