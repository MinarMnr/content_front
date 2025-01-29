import React from "react";
import Image from "next/image";
import { show } from "@/app/_services/api-call";
import CourseCard from "@/app/_components/course-card";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let instructor_id: string = (await params)?.id;
  let instructor: any = {};

  instructor = await show({
    api_key: "OTHERS_PROFILE_API",
    addon: instructor_id,
  }).then((resp: any) => {
    return resp?.data;
  });

  return (
    <>
      <div className="overflow-hidden relative banner-all heiht-custom-banner">
        <div className="w-full h-full top-0 absolute m-auto px-32">
          <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
            <div className="basis-full flex flex-col justify-right items-center py-24">
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2">
                <h2 className="text-white text-4xl font-normal">Profile</h2>
                <p className="text-white font-normal text-sm">{`Instructors > Profile`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-7 py-24">
        <div className="col-span-2 text-center ps-8 pe-16">
          <div className="left-pan-all">
            <div className="thumbnail">
              {instructor?.profile_photo ? (
                <Image
                  src={instructor?.profile_photo}
                  alt={"instructor"}
                  width={500}
                  height={500}
                />
              ) : null}
            </div>
            <h5 className="text-2xl">{instructor?.name_en}</h5>
            <h4 className="mt-1 text-green-700">Instructor</h4>
            <div className="contact-with-info mt-8">
              <p className="mt-2 mb-2">
                <span>Email:</span>
                <a
                  href={`mailto:${instructor?.email}`}
                  className="text-gray-500"
                >
                  {` ${instructor?.email}`}
                </a>
              </p>
              <p className="mt-2 mb-2">
                <span>Phone:</span>
                <a href={`tel:${instructor?.phone}`} className="text-gray-500">
                  {` ${instructor?.phone}`}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="grid grid-cols-7 w-full">
            <div className="col-span-7 flex flex-col justify-start items-stretch">
              <h6 className="uppercase text-green-700 font-bold">About Me</h6>
              <h3 className="text-3xl font-semibold text-gray-800  mb-4 mt-4">
                Hello, I’m {instructor?.name_en}
              </h3>
              {instructor?.about ? (
                <p className="text-md text-gray-500 mb-1 mt-8">
                  {instructor?.about}
                </p>
              ) : null}
              {instructor?.educations?.length ? (
                <>
                  <div className="text-xl font-semibold text-gray-600 border-dashed border-b my-4">
                    Education
                  </div>
                  <div className="flex items-center gap-x-6">
                    {instructor?.educations?.map((tada: any) => (
                      <div key={tada?.id} className="flex-grow flex flex-col">
                        <div className="font-black text-gray-900">
                          {tada?.institute}
                        </div>
                        <div className="text-gray-600">
                          {tada?.class}
                          {tada?.level ? `, ${tada?.level}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {instructor?.experiences?.length ? (
                <>
                  <div className="text-xl font-semibold text-gray-600 border-dashed border-b my-4">
                    Experience
                  </div>
                  <div className="flex items-center gap-x-6">
                    {instructor?.experiences?.map((tada: any) => (
                      <div key={tada?.id} className="flex-grow flex flex-col">
                        <div className="font-black text-gray-900">
                          {tada?.institute}
                        </div>
                        <div className="text-gray-600">
                          {tada?.class}
                          {tada?.level ? `, ${tada?.level}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {instructor?.courses?.length ? (
                <>
                  <div className="text-xl font-semibold text-gray-600 border-dashed border-b my-4">
                    Courses
                  </div>
                  <div className="grid grid-cols-4">
                    {instructor?.courses?.map((tada: any) => (
                      <CourseCard data={tada} />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
