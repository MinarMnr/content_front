"use client"; // Ensures the component runs on the client side

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, resolutions }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   const video: any = videoRef.current;

  //   const handleTimeUpdate = () => {
  //     setCurrentTime(video.currentTime);
  //   };

  //   video.addEventListener("timeupdate", handleTimeUpdate);

  //   let hls: any;

  //   if (Hls.isSupported()) {
  //     const video: any = document.getElementById("hls-player");
  //     const hls = new Hls();
  //     hls.loadSource(src);
  //     hls.attachMedia(video);
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       video.play();
  //     });
  //   } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  //     video.src = src;

  //     video.addEventListener("loadedmetadata", () => {
  //       video.play();
  //     });
  //   }

  //   return () => {
  //     if (hls) {
  //       hls.destroy();
  //     }
  //     video.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, [src]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ debug: true });

      // Replace this URL with your .m3u8 file
      const videoUrl = src;

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //video.play().catch(console.error);
      });

      // Cleanup HLS.js instance on component unmount
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari or native HLS support
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        //video.play().catch(console.error);
      });
    }
  }, []);

  useEffect(() => {
    const videoElement: any = document.getElementById("hls-player");

    videoElement.addEventListener("contextmenu", function (event: any) {
      event.preventDefault();
    });
  }, []);

  const handleResolutionChange = (e: any) => {
    const newSrc = e.target.value;
    const video: any = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(newSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = newSrc;
    }

    video.currentTime = currentTime;
    video.play();
  };

  return (
    <div>
      <video id="hls-player" ref={videoRef} controls width="50%"></video>
      <div>
        <label>Resolution: </label>
        <select onChange={handleResolutionChange}>
          {resolutions.map((resolution: any, index: any) => (
            <option key={index} value={resolution.src}>
              {resolution.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
