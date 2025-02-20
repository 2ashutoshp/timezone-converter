"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TimezoneConversion } from "../types";
import { DateTime } from "luxon";
import TimeConversionResult from "@/components/TimeConversionResult";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Spinner from "@/components/Spinner";

const fetchDynamicTimezones = () => {
  const zones = Intl.supportedValuesOf("timeZone");
  return zones.map((zone) => {
    const abbreviation = DateTime.fromObject(
      { year: 2024, month: 6, day: 1, hour: 12 },
      { zone }
    ).toFormat("ZZZ");
    return { region: zone, abbreviation };
  });
};

export default function ConvertPage() {
  const searchParams = useSearchParams();
  const fromInput = searchParams.get("from") || "UTC";
  const toInput = searchParams.get("to") || "UTC";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [conversionResult, setConversionResult] =
    useState<TimezoneConversion | null>(null);
  const [loading, setLoading] = useState(true);
  const [timezoneMappings, setTimezoneMappings] = useState<
    { region: string; abbreviation: string }[]
  >([]);

  useEffect(() => {
    setTimezoneMappings(fetchDynamicTimezones());
  }, []);

  const resolveTimezone = (input: string) => {
    if (timezoneMappings.some((tz) => tz.region === input)) return input;
    const found = timezoneMappings.find(
      (tz) => tz.abbreviation === input.toUpperCase()
    );
    return found ? found.region : "UTC";
  };

  useEffect(() => {
    if (fromInput && toInput && date && time && timezoneMappings.length > 0) {
      const fromTimezone = resolveTimezone(fromInput);
      const toTimezone = resolveTimezone(toInput);

      const originalDateTime = DateTime.fromISO(`${date}T${time}`, {
        zone: fromTimezone,
      });
      const convertedTime = originalDateTime
        .setZone(toTimezone)
        .toFormat("yyyy-MM-dd HH:mm");

      setConversionResult({
        from: fromTimezone,
        to: toTimezone,
        date,
        time,
        convertedTime,
      });
      setLoading(false);
    }
  }, [fromInput, toInput, date, time, timezoneMappings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="w-16 h-16" />
      </div>
    );
  }

  if (!conversionResult) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-center">
          Conversion failed. Please try again.
        </p>
      </div>
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
