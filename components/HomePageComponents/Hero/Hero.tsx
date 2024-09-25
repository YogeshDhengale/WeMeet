"use client";

import { format } from "date-fns";
import React, { useEffect, useState } from "react";

function Hero() {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();

  useEffect(() => {
    // Set the current date on the client side after hydration
    setDate(new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date()));

    // Set an interval to update the time every second
    const timer = setInterval(() => {
      setTime(format(new Date(), "hh:mm:ss a"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
      <div className="flex h-full flex-col justify-between px-5 py-8 lg:p-11">
        <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
          Upcoming Meeting at: 12:30pm
        </h2>
        <div className="flex flex-col gap-2">
          {/* Only render the time and date on the client */}
          <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
          {date && <p className="text-lg font-medium text-sky-1 lg:text-2xl ">{date}</p>}
        </div>
      </div>
    </div>
  );
}

export default Hero;
