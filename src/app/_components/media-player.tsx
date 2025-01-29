"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";
import { update } from "../_services/api-call";

const MediaPlayer = (props: any) => {
  const player = useRef<any>(null);
  const [file_src, setFileSrc] = useState<string>("");

  const setSrc = async (src: string) => {
    setFileSrc(src);
  };

  useEffect(() => {
    if (props?.content_url && props?.extension) {
      setSrc(props?.content_url);
    }
  }, [props]);

  const playMedia = () => {
    if (file_src && file_src !== "LOADING") {
      window.setTimeout(() => {
        if (/^mp4$/i?.test(props?.extension)) {
          let source = document.createElement("source");
          source.src = file_src;
          player.current.appendChild(source);
        } else if (/^pdf$/i?.test(props?.extension)) {
          player.current.src = file_src;
        } else if (/^m3u8$/i?.test(props?.extension)) {
          // if (Hls.isSupported()) {
          //   let hls = new Hls({ debug: true });
          //   hls.loadSource(file_src);
          //   hls.attachMedia(player.current);
          //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
          //     player.current.play().catch(console.error);
          //   });
          //   hls.config.xhrSetup = function (xhr, url) {
          //     var modifiedUrl = url
          //       ?.replace("251:5300", "192:8004")
          //       ?.replace("blob:", "");
          //     xhr.open("GET", modifiedUrl, true);
          //   };
          //   hls.on(Hls.Events.MEDIA_ATTACHED, (e) => {
          //     player.current?.play();
          //   });
          // }

          if (Hls.isSupported()) {
            let hls = new Hls();
            hls.loadSource(file_src);
            hls.attachMedia(player.current);
          } else if (
            player.current.canPlayType("application/vnd.apple.mpegurl")
          ) {
            player.current.src = file_src;
          }
        }
      }, 0);
    }
  };

  useEffect(() => {
    playMedia();
  }, [file_src]);

  useEffect(() => {
    if (player.current) {
      player.current.addEventListener("contextmenu", function (event: any) {
        event.preventDefault();
        return false;
      });
    }
  }, [player.current]);

  const [firstPlayed, setFirstPlayed] = useState<boolean>(true);
  const [apiCalled, setApiCalled] = useState<number>(0);
  const filterProgress = (event: any) => {
    let progress: number = Math.round(event?.target?.currentTime);
    if (progress % 30 === 0 && progress !== apiCalled) {
      sendProgress(event);
    }
  };
  const sendProgress = (event: any) => {
    let progress: number = Math.round(event?.target?.currentTime);
    setApiCalled(progress);
    update({
      api_key: "CONTENT_PROGRESS_API",
      body: {
        progress,
      },
      addon: `${props?.content_id}`,
    });
  };

  return (
    <div className={props?.c_class}>
      {file_src === "LOADING" ? (
        <div className="w-full h-full bg-white flex flex-col justify-center items-center">
          <svg width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" style={{ fill: "red" }}>
              <animate
                attributeName="cx"
                begin="0s"
                dur="8s"
                from="50"
                to="90%"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          Please wait while the content is loading
        </div>
      ) : file_src ? (
        props?.extension === "pdf" ? (
          <iframe ref={player} className="w-full h-full"></iframe>
        ) : props?.extension === "m3u8" ? (
          <>
            <video ref={player} className="w-full h-full" controls></video>
          </>
        ) : /^jpg$|^png$|^jpeg$/?.test(props?.extension) ? (
          <Image
            className="w-full h-full"
            src={file_src}
            alt={""}
            width={1000}
            height={1000}
          />
        ) : /^mp4$/?.test(props?.extension) ? (
          <>
            <video
              ref={player}
              className="w-full h-full"
              controls={true}
              onTimeUpdate={filterProgress}
              onPause={sendProgress}
              onSeeked={sendProgress}
              onPlay={() => {
                if (firstPlayed) {
                  setFirstPlayed(false);
                  player.current.currentTime = Number(props?.progress);
                }
              }}
            ></video>
          </>
        ) : null
      ) : (
        <div>NOTHING</div>
      )}
    </div>
  );
};

export default MediaPlayer;
