"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DateTime } from "luxon";

interface Props {
  from: string;
  to: string;
  date: string;
  time: string;
}

export default function TimeConversionResult({ from, to, date, time }: Props) {
  const originalDateTime = DateTime.fromISO(`${date}T${time}`, { zone: from });
  const convertedTime = originalDateTime
    .setZone(to)
    .toFormat("yyyy-MM-dd HH:mm");

  return (
    <Card className="mt-6">
      <CardContent className="space-y-4">
        <h3 className="text-xl font-bold">Converted Time</h3>
        <p>
          <strong>Original Time:</strong>{" "}
          {originalDateTime.toFormat("yyyy-MM-dd HH:mm")} ({from})
        </p>
        <p>
          <strong>Converted Time:</strong> {convertedTime} ({to})
        </p>
        <p className="text-sm text-gray-600">
          Current time in {from}:{" "}
          {DateTime.now().setZone(from).toFormat("HH:mm")}
        </p>
        <p className="text-sm text-gray-600">
          Current time in {to}: {DateTime.now().setZone(to).toFormat("HH:mm")}
        </p>
      </CardContent>
    </Card>
  );
}
