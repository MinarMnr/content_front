import Image from "next/image";
import React from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import LangTra from "@/app/_components/lang-tra";

const Intro = ({ instructor }: { instructor: any }) => {
  return (
    <div className="flex justify-center h-full">
      <div className="bg-white shadow-md p-2 text-center w-full h-full">
        <div className="w-full border border-gray-100 gray-light h-full pt-12">
          {instructor?.profile_photo ? (
            <Image
              src={instructor?.profile_photo}
              alt="instructor-profile"
              width={500}
              height={500}
              className="rounded-full w-44 h-44 mx-auto mb-4 border-2"
            />
          ) : (
            <div className="rounded-full w-44 h-44 mx-auto mb-4 border-2"></div>
          )}
          <h3 className="text-2xl font-semibold text-gray-600 border-dashed border-b pb-4 mb-4">
            {instructor?.name_en}
          </h3>

          <p className="text-sm text-gray-500 mb-1">
            <LangTra control="profile.email" />: {instructor?.email}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <LangTra control="profile.phone" />: {instructor?.phone}
          </p>
          <p className="text-sm text-gray-500">
            <LangTra control="profile.address" />: {instructor?.address}
          </p>
          {/* <div className="flex justify-center space-x-4 mt-10">
            <div className="flex justify-start items-start gap-2">
              <a href="">
                <Image
                  className="object-cover w-8 h-8 rounded-full hover:opacity-75 cursor-pointer"
                  width={40}
                  height={40}
                  alt=""
                  src={"/footer-icons/facebook.png"}
                />
              </a>

              <a href="">
                <Image
                  className="object-cover w-8 h-8 rounded-full hover:opacity-75 cursor-pointer"
                  width={40}
                  height={40}
                  alt=""
                  src={"/footer-icons/x.jpg"}
                />
              </a>
              <a href="">
                <Image
                  className="object-cover w-8 h-8 rounded-full hover:opacity-75 cursor-pointer"
                  width={40}
                  height={40}
                  alt=""
                  src={"/footer-icons/youtube.jpg"}
                />
              </a>
              <a href="">
                <Image
                  className="object-cover w-8 h-8 rounded-full hover:opacity-75 cursor-pointer"
                  width={40}
                  height={40}
                  alt=""
                  src={"/footer-icons/google-plus.png"}
                />
              </a>
              <a href="">
                <Image
                  className="object-cover w-8 h-8 rounded-full hover:opacity-75 cursor-pointer"
                  width={40}
                  height={40}
                  alt=""
                  src={"/footer-icons/instagram.png"}
                />
              </a>
            </div>
          </div> */}

          <div className="w-full border-dashed border-t mt-6">
            <div className="mt-1 p-5 ">
              <h4 className="text-2xl font-semibold text-gray-800 text-left relative left-categories border-b pb-2 mb-5">
                <LangTra control="profile.education" />:
              </h4>
              <ul className="list-none text-gray-600 mt-2">
                <li className="flex items-center mt-3 mb-2">
                  <i className="fas fa-graduation-cap text-green-500 mr-2"></i>
                  <AcademicCapIcon className="size-5 text-green-700 me-2" />
                  {instructor?.institute}
                </li>
                <li className="flex items-center mt-3 mb-2">
                  <i className="fas fa-book text-green-500 mr-2"></i>
                  <BookOpenIcon className="size-5 text-green-700 me-2" />
                  {instructor?.subject}
                </li>
              </ul>
            </div>

            <div className="mt-1 p-5">
              <h4 className="text-2xl font-semibold text-gray-800 text-left relative left-categories border-b pb-2 mb-5">
                <LangTra control="profile.experience" />:
              </h4>
              <ul className="list-none text-gray-600 mt-2">
                {instructor?.experiences?.map((tada: any, index: number) => (
                  <li className="mb-4">
                    <div className="flex flex-wrap md:flex-nowrap gap-x-15px gap-y-10px text-start">
                      <ComputerDesktopIcon className="size-5 text-green-700 me-2" />
                      <p className="w-full">{tada?.designation}</p>
                    </div>

                    <p className="w-full text-start pl-5">
                      {tada?.institute} ({tada?.from_year} -{" "}
                      {tada?.to_year ? tada?.to_year : "Current"})
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
