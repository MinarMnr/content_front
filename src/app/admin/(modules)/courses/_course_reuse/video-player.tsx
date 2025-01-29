"use client";

import { getFIleUrl } from "@/app/_services/modifier";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const VideoPlayer = ({ video_list }: { video_list: any[] }) => {
  const [currentData, setCurrentData] = useState<string>('');

  useEffect(() => {
    if(video_list?.[0]?.trailer?.path){
      setCurrentData(getFIleUrl(video_list?.[0]?.trailer?.path, true));
    }
  }, [])

  return (
    <>
      <div className="w-full aspect-video border-x-4 border-t-4 border-white bg-white">
        {currentData ? /.mp4$/?.test(currentData) ? (
          <iframe
            src={`${currentData}`}
            allowFullScreen
            loading="eager"
            aria-controls="true"
            className="w-full h-full"
            allow="*"
          ></iframe>
        ) : (
          <Image
            className="w-full"
            src={`${currentData}`}
            alt=""
            width={600}
            height={226}
          />
        ) : null}
      </div>
      <div className="h-1/4 w-full flex flex-nowrap gap-x-1 justify-start items-stretch overflow-x-auto overflow-y-hidden p-1">
        {video_list?.map((tada: any, index: number) => (
          <div
            key={index}
            className="w-32 h-20 border border-gray-400"
            onClick={() => {
              setCurrentData(getFIleUrl(tada?.trailer?.path, true));
            }}
          >
            {(tada?.trailer?.path as string)?.endsWith("mp4") ? (
              <video className="w-full h-full" width={78} height={48}>
                <source
                  src={getFIleUrl(tada?.trailer?.path, true)}
                  type="video/mp4"
                ></source>
              </video>
            ) : (
              <Image
                src={getFIleUrl(tada?.trailer?.path, true)}
                alt=""
                width={78}
                height={48}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoPlayer;
