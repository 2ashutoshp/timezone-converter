"use client";
import { useSearchParams } from "next/navigation";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function ConvertPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "UTC";
  const to = searchParams.get("to") || "UTC";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [convertedTime, setConvertedTime] = useState<string>("");

  useEffect(() => {
    if (from && to && date && time) {
      const dateTime = DateTime.fromISO(`${date}T${time}`, { zone: from });
      const converted = dateTime.setZone(to).toFormat("yyyy-MM-dd HH:mm");
      setConvertedTime(converted);
    }
  }, [from, to, date, time]);

  if (!convertedTime) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold">Time Conversion Result</h1>
      <p className="mt-4">
        {date} {time} in {from} is equivalent to:
      </p>
      <p className="mt-2 text-xl font-semibold">
        {convertedTime} in {to}
      </p>
    </div>
  );
}
