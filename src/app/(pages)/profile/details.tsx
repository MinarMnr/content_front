import React from "react";
import EditPro from "./_forms/edit-profile";
import Layout from "./_forms/layout";
import ChangePassword from "./_forms/change-password";
import EmailVerification from "./email-verification";
import LangTra from "@/app/_components/lang-tra";
import Link from "next/link";

const Details = ({
  modal,
  profile_data,
}: {
  modal?: string;
  profile_data: any;
}) => {
  return (
    <>
      {modal ? (
        <div className="w-full h-full top-0 left-0 bg-[#7979796e] z-10 fixed justify-center items-center flex ">
          <div className="bg-white p-8 rounded-lg relative">
            <Layout segment="details">
              {(() => {
                switch (modal) {
                  case "1":
                    return {
                      title: "Edit Profile",
                      inner: (
                        <EditPro
                          edit_data={{
                            ...profile_data,
                          }}
                        />
                      ),
                    };
                  case "2":
                    return {
                      title: "",
                      inner: <ChangePassword />,
                    };
                  default:
                    return null;
                }
              })()}
            </Layout>
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-7 w-full">
        <div className="col-span-7 flex flex-col justify-start items-stretch">
          <div className="border-dashed border-b mb-4 flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-600">
              {profile_data?.name_en}
            </h3>
            <Link
              className="text-white px-1 bg-sky-600 py-2 mb-2 ps-5 pe-5 rounded-full flex"
              href={`/profile?segment=details&modal=1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 me-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <LangTra control="profile.update_profile" />
            </Link>
          </div>
          <EmailVerification
            email={profile_data?.email}
            verified={!!profile_data?.email_verified_status}
          />
          <p className="text-md text-gray-500 mb-1">
            <LangTra control="profile.phone" />:{" "}
            <LangTra control="value" data={{ value: profile_data?.phone }} />
          </p>
          <p className="text-md text-gray-500 mb-1">
            <LangTra control="profile.address" />: {profile_data?.address}
          </p>
          <p className="text-md text-gray-500 mb-1">
            <LangTra control="profile.district" />:{" "}
            <LangTra control="district.title_en" data={profile_data} />
          </p>
          <p className="text-md text-gray-500">
            <LangTra control="profile.division" />:{" "}
            <LangTra control="division.title_en" data={profile_data} />
          </p>
          <div className="text-xl font-semibold text-gray-600 border-dashed border-b my-4">
            <LangTra control="profile.about" />
          </div>
          <div className="text-justify leading-7 mb-5 remove-all">
            <span
              dangerouslySetInnerHTML={{
                __html: profile_data?.about ?? ``,
              }}
            />
          </div>
          <div className="text-xl font-semibold text-gray-600 border-dashed border-b my-4">
            <LangTra control="profile.education" />
          </div>
          {profile_data?.educations?.map((tada: any) => (
            <div key={tada?.id} className="flex items-center gap-x-6">
              <div className="flex-grow flex flex-col">
                <div className="font-black text-gray-900">
                  {tada?.institute}
                </div>
                <div className="text-gray-600">
                  {tada?.class}
                  {tada?.level ? `, ${tada?.level}` : ""}
                </div>
                {/* <div className="text-gray-600">Apr 2015 - Feb 2020</div> */}
              </div>
            </div>
          ))}
          <div className="text-xl font-semibold text-gray-600 border-dashed border-b my-4">
            <LangTra control="profile.experience" />
          </div>
          {profile_data?.experiences?.map((tada: any) => (
            <div key={tada?.id} className="flex items-center gap-x-6">
              <div className="flex-grow flex flex-col">
                <div className="font-black text-gray-900">
                  {tada?.designation}
                </div>
                <div className="text-gray-600">
                  {tada?.institute}
                  <br />
                  {tada?.location}
                </div>
                <div className="text-gray-600">
                  {tada?.start_date} - {tada?.end_date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
