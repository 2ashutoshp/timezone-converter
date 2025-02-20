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
  const fromDateTime = DateTime.fromISO(`${date}T${time}`, { zone: from });
  const toDateTime = fromDateTime.setZone(to);

  const fromAbbreviation = fromDateTime.toFormat("ZZZ");
  const toAbbreviation = toDateTime.toFormat("ZZZ");

  return (
    <Card className="mt-6">
      <CardContent className="space-y-4">
        <h3 className="text-xl font-bold">Converted Time</h3>
        <p>
          <strong>Original Time:</strong>{" "}
          {fromDateTime.toFormat("yyyy-MM-dd HH:mm")} ({fromAbbreviation} -{" "}
          {from})
        </p>
        <p>
          <strong>Converted Time:</strong>{" "}
          {toDateTime.toFormat("yyyy-MM-dd HH:mm")} ({toAbbreviation} - {to})
        </p>
      </CardContent>
    </Card>
  );
}
