"use client";
import React, { useEffect, useState, use } from "react";
import { show } from "@/app/_services/api-call";
import { getClientCookie } from "@/app/_services/storage";

import { useRouter } from "next/navigation";

const Page = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);

  const [user, setUser] = useState<any>(null);

  const [details, setDetails]: [
    any,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp: any = await show({
          api_key: "COURSE_API",
          addon: params?.id,
        });
        if (resp?.status === "success") {
          setDetails(resp?.data);
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const data = getClientCookie("edutube-auth-user");
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div className="w-full relative">
      <div className="overflow-hidden relative banner-all">
        <div className="w-full h-full top-0 absolute m-auto px-32">
          <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
            <div className="basis-full flex flex-col justify-center items-start py-24">
              <span className="text-3xl mt-5 font-black text-white">
                {details?.title}
              </span>
              <span className="text-xl text-white font-semibold">
                {details?.sub_title}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container mx-auto px-6 pl-28 pr-28 ">
          <div className="flex items-top flex-wrap">
            {/* start  w-full md:w-2/3 */}
            <div className="w-full md:w-2/3 pr-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
