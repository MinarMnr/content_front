import React from "react";
import Image from "next/image";

const RelatedCourses = () => {
  return (
    <div className="py-12">
      <div className="text-3xl mb-4">Related Courses</div>
      <div className="carousel-list mt-5 grid grid-cols-3 gap-4">
        <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
          <div className="overflow-hidden h-40">
            <Image
              src={"/courses/course2.avif"}
              alt={""}
              width={500}
              height={500}
            />
          </div>
          <div className="px-3 py-2">
            <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3">
              HSC'22 Last Minute Suggested Class Package
            </div>
            <div className="text-sm text-gray-400 line-clamp-1 mt-4">
              Accounting 1st Paper | HSC
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center pt-4">
              <div className="text-green-800 font-bold">100.00 Tk</div>
              <button className="bg-green-200 text-white px-10 py-2 rounded-md">
                Free
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
          <div className="overflow-hidden h-40">
            <Image
              src={"/courses/course3.avif"}
              alt={""}
              width={500}
              height={500}
            />
          </div>
          <div className="px-3 py-2">
            <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3">
              SSC-2022 Suggestive Class
            </div>
            <div className="text-sm text-gray-400 line-clamp-1 mt-4">
              Accounting 1st Paper | HSC
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center pt-4">
              <div className="text-green-800 font-bold">100.00 Tk</div>
              <button className="bg-green-200 text-white px-10 py-2 rounded-md">
                Free
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-100 border-solid p-1 rounded-md">
          <div className="overflow-hidden h-40">
            <Image
              src={"/courses/course0.jpg"}
              alt={""}
              width={500}
              height={500}
            />
          </div>
          <div className="px-3 py-2">
            <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3">
              Introduction to Accounting
            </div>
            <div className="text-sm text-gray-400 line-clamp-1 mt-4">
              Accounting 1st Paper | HSC
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center pt-4">
              <div className="text-emerald-900 font-bold">100.00 Tk</div>
              <button className="bg-green-200 text-white px-10 py-2 rounded-md">
                Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedCourses;
