"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TimezoneConversion } from "../types";
import { DateTime } from "luxon";
import TimeConversionResult from "@/components/TimeConversionResult";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Spinner from "@/components/Spinner";

export default function ConvertPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "UTC";
  const to = searchParams.get("to") || "UTC";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [conversionResult, setConversionResult] =
    useState<TimezoneConversion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (from && to && date && time) {
      const originalDateTime = DateTime.fromISO(`${date}T${time}`, {
        zone: from,
      });
      const convertedTime = originalDateTime
        .setZone(to)
        .toFormat("yyyy-MM-dd HH:mm");

      setConversionResult({
        from,
        to,
        date,
        time,
        convertedTime,
      });
      setLoading(false);
    }
  }, [from, to, date, time]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="w-16 h-16" />
      </div>
    );
  }

  if (!conversionResult) {
    return (
      <p className="text-center mt-10">Invalid data provided for conversion.</p>
    );
  }

  return (
    <div className="flex flex-col items-center p-10 space-y-6">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <h1 className="text-2xl font-bold">Time Conversion Result</h1>
        </CardHeader>
        <CardContent>
          <TimeConversionResult
            from={conversionResult.from}
            to={conversionResult.to}
            date={conversionResult.date}
            time={conversionResult.time}
          />
        </CardContent>
      </Card>
    </div>
  );
}
