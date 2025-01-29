import { headers } from "next/headers";
import React from "react";
import LogoutButton from "@/app/_components/LogoutButton";
import { show } from "../_services/api-call";

const page = async () => {
  let adminData: any = [];
  await show({
    api_key: "ADMIN_DASHBOARD",
  }).then((resp: any) => {
    adminData = resp?.data;
  });

  return (
    <>
      <h2 className="text-3xl">User</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 border">
        <div className="w-full flex sm:flex-row flex-col justify-center items-center px-5 py-6">
          <div className="block-dash-all bg-green-b relative">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16 relative left-3 top-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </span>
            <div className="detail-dash p-4">
              <h2 className="text-white text-2xl mb-1">Learner</h2>
              <h3 className="text-lg text-white font-normal">
                Total Count:
                <label className="ml-2 font-extrabold">
                  {adminData?.users[1]?.count ?? 0}
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Today Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.users[1]?.today_count ?? 0}
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Week Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.users[1]?.week_count ?? 0}
                </label>
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col justify-center items-center px-5 py-6 ">
          <div className="block-dash-all bg-black-b relative">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16 relative left-3 top-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </span>
            <div className="detail-dash p-4">
              <h2 className="text-white text-2xl mb-1">Instructor</h2>
              <h3 className="text-lg text-white font-normal">
                Total Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.users[2]?.count ?? 0}
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Today Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.users[2]?.today_count ?? 0}
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Week Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.users[2]?.week_count ?? 0}
                </label>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl mt-12">Course</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 ">
        <div className="w-full flex sm:flex-row flex-col justify-center items-center px-3 py-14 pt-0">
          <div className="block-dash-all2 relative">
            <span className="icon-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </span>
            <div className="detail-dash p-2">
              <h2 className="text-white text-2xl mb-1">Course Enrollments</h2>
              <h3 className="text-lg text-white font-normal">
                Total Count:
                <label className="ml-2 font-extrabold">
                  {adminData?.course_enrollments?.count ?? 0}
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Total Amount:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.course_enrollments?.amount ?? 0} BDT
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Week Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.course_enrollments?.week_count ?? 0}
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Week Amount:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.course_enrollments?.week_amount ?? 0} BDT
                </label>
              </h3>
              <h3 className="text-lg text-white font-normal">
                Today Count:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.course_enrollments?.today_count ?? 0}
                </label>
              </h3>

              <h3 className="text-lg text-white font-normal">
                Toady Amount:
                <label className="ml-2 font-extrabold">
                  {" "}
                  {adminData?.course_enrollments?.today_amount ?? 0} BDT
                </label>
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col justify-center items-center px-3 py-14 pt-0">
          <div className="w-full flex sm:flex-row flex-col justify-center items-center px-3 py-6">
            <div className="block-dash-all2 relative">
              <span className="icon-dash">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </span>
              <div className="detail-dash  detail-dash2 p-4">
                <h2 className="text-white text-2xl mb-1">
                  Course (Class 6-12)
                </h2>

                <h3 className="text-lg text-white font-normal">
                  Toatl Count:
                  <label className="ml-2 font-extrabold">
                    {adminData?.courses[0]?.count ?? 0}
                  </label>
                </h3>
                <h3 className="text-lg text-white font-normal">
                  Toady Count:
                  <label className="ml-2 font-extrabold">
                    {" "}
                    {adminData?.courses[0]?.today_count ?? 0}
                  </label>
                </h3>
                <h3 className="text-lg text-white font-normal">
                  Week Count:
                  <label className="ml-2 font-extrabold">
                    {" "}
                    {adminData?.courses[0]?.week_count ?? 0}
                  </label>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col justify-center items-center px-3 py-14 pt-0">
          <div className="w-full flex sm:flex-row flex-col justify-center items-center px-3 py-6">
            <div className="block-dash-all2 relative">
              <span className="icon-dash">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </span>
              <div className="detail-dash  detail-dash2 p-4">
                <h2 className="text-white text-2xl mb-1">
                  {" "}
                  Course (Skill Developments)
                </h2>

                <h3 className="text-lg text-white font-normal">
                  Toatl Count:
                  <label className="ml-2 font-extrabold">
                    {" "}
                    {adminData?.courses[1]?.count ?? 0}
                  </label>
                </h3>
                <h3 className="text-lg text-white font-normal">
                  Toady Count:
                  <label className="ml-2 font-extrabold">
                    {" "}
                    {adminData?.courses[1]?.total_count ?? 0}
                  </label>
                </h3>
                <h3 className="text-lg text-white font-normal">
                  Week Count:
                  <label className="ml-2 font-extrabold">
                    {" "}
                    {adminData?.courses[1]?.week_count ?? 0}
                  </label>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
