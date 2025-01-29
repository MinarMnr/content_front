import LogoutButton from "@/app/_components/LogoutButton";
import { getCookie } from "@/app/actions";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const header = async () => {
  let json_user = await getCookie("edutube-auth-user");
  let user = null;

  if (json_user) {
    user = JSON.parse(json_user);
  }

  return (
    <div className="block w-3/3 sm:flex pl-28 pr-10">
      <div className="flex flex-col w-full">
        <p className="flex bg-white w-96 h-12 pl-4 pr-4 rounded-full shadow-sm top-6 relative ml-2">
          <MagnifyingGlassIcon className="size-6 mt-3 text-gray-400" />
          <input type="text" className="pl-3" placeholder="Search here..." />
        </p>
      </div>
      <div className="flex-col w-full text-end">
        <span className=" bg-white w-12 h-12 rounded-full text-center shadow-md mt-6 float-right text-red-700 font-bold pt-3">
          EG
        </span>
        <span className="bg-white w-12 h-12 rounded-full text-center shadow-md float-right mt-6 mr-4">
          <BellIcon className="size-6 text-gray-400 relative left-3 top-3 cursor-pointer " />
        </span>
      </div>
      <div className="relative inline-block text-left profile-avatar">
        <div className="profile-top bg-white shadow-md rounded-full h-14 p-1 mt-5 ml-4 flex overflow-hidden">
          <Image
            src={"/3.png"}
            alt={""}
            className="rounded-full profile-avater w-14 h-full"
            width={150}
            height={150}
          />
          <div className="profile-name flex flex-col justify-center items-start ">
            <span className="text-gray-600 font-bold capitalize">
              {user?.name_en}
            </span>
            <span className="text-xs text-gray-800">{user?.type}</span>
            <span className="text-xs text-gray-800 underline">
              {user?.email}
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default header;
