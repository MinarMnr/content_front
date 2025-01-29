"use client";

import React, { useEffect, useRef, useState } from "react";
import "../_scss/timer.scss";

interface Time {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

type TimeFormat = `${number} ${"s" | "m" | "h" | "d"}`;

interface DivProps extends React.ComponentProps<"div"> {
  remaining: TimeFormat;
  format?: string;
  control?: "resume" | "pause" | "reset" | "finish";
  setControl?: React.Dispatch<React.SetStateAction<any>>;
}

const timer = ({
  remaining,
  control,
  setControl,
  format,
  ...others
}: DivProps) => {

  // console.log("con", control)
  const [show_time, setShowTime]: [
    Time,
    React.Dispatch<React.SetStateAction<Time>>
  ] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const watch_remaining: React.MutableRefObject<number> = useRef(0);
  const decretion: React.MutableRefObject<number> = useRef(0);
  const interval: React.MutableRefObject<any> = useRef(undefined);

  if(format?.includes('s')){
    decretion.current = 1;
  }else if(format?.includes('m')){
    decretion.current = 60;
  }else if(format?.includes('h')){
    decretion.current = (60 * 60);
  }else if(format?.includes('d')){
    decretion.current = (24 * 60 * 60);
  }else{
    decretion.current = Infinity;
  }

  useEffect(() => {
    stopTimer();
    switch (control) {
      case "resume":
        startTimerInterval();
        break;
      case "pause":
        break;
      case "reset":
        watch_remaining.current = calculateInSeconds(remaining);
        calculateTime();
        break;
      case "finish":
        watch_remaining.current = 0;
        setShowTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        break;
      default:
        break;
    }
  }, [control]);

  const calculateInSeconds = (remaining: TimeFormat): number => {
    let splits = remaining?.split(" ");
    return (
      Number(splits?.[0]) *
      (/^m$|^h$|^d$/.test(splits?.[1]) ? 60 : 1) *
      (/^h$|^d$/.test(splits?.[1]) ? 60 : 1) *
      (/^d$/.test(splits?.[1]) ? 24 : 1)
    );
  };

  const startTimerInterval = () => {
    calculateTime();
    interval.current = window.setInterval(
      () => {
        timeDecrement();
        calculateTime();
      },
      decretion.current * 1000
    );
  };

  const startTimerTimeout = () => {
    calculateTime();
    let timeout = window.setTimeout(
      () => {
        switch (control) {
          case "resume":
            timeDecrement();
            startTimerTimeout();
            break;
        }
        window.clearTimeout(timeout);
      },
      decretion.current * 1000
    );
  };

  const stopTimer = () => {
    window.clearInterval(interval?.current);
  };

  const calculateTime = () => {
    let days: number = 0;
    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;

    let temp_remaining: number = watch_remaining?.current;

    if(format?.includes('d')){
      days = Math.floor(temp_remaining / (24 * 60 * 60));
      temp_remaining = temp_remaining % (24 * 60 * 60);
    }
    if(format?.includes('h')){
      hours = Math.floor(temp_remaining / (60 * 60));
      temp_remaining = temp_remaining % (60 * 60);
    }
    if(format?.includes('m')){
      minutes = Math.floor(temp_remaining / 60);
      temp_remaining = temp_remaining % 60;
    }
    if(format?.includes('s')){
      seconds = temp_remaining;
    }

    if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
      stopTimer();
      return;
    }

    setShowTime({
      days: `${days}`.padStart(2, "0"),
      hours: `${hours}`.padStart(2, "0"),
      minutes: `${minutes}`.padStart(2, "0"),
      seconds: `${seconds}`.padStart(2, "0"),
    });
  };

  const timeDecrement = () => {
    watch_remaining.current -= decretion.current;
  };

  return (
    <div className={`${!control ? 'hidden' : 'flex'} w-100 ${others?.className ?? 'timer'}`}>
      {format?.split("-")?.map((segment: string, s_i: number) => (
        <div key={s_i} className={`time-holder ${segment}`}>
          {show_time?.[
            segment === "d"
              ? "days"
              : segment === "h"
              ? "hours"
              : segment === "m"
              ? "minutes"
              : "seconds"
          ]
            ?.split("")
            ?.map((digit: string, d_i: number) => (
              <div key={`${s_i}${d_i}`} className="inner">
                {digit}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default timer;
