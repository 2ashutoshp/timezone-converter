"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TimezoneAutocomplete from "./TimezoneAutocomplete";
import { useToast } from "@/hooks/use-toast";

export default function TimezoneForm() {
  const router = useRouter();
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("UTC");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromTimezone || !toTimezone || !date || !time) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields.",
      });
      return;
    }

    router.push(
      `/convert?from=${fromTimezone}&to=${toTimezone}&date=${date}&time=${time}`
    );
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2 className="text-2xl font-bold">Convert Timezones</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TimezoneAutocomplete
            label="From Timezone"
            value={fromTimezone}
            onChange={setFromTimezone}
          />
          <TimezoneAutocomplete
            label="To Timezone"
            value={toTimezone}
            onChange={setToTimezone}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Convert
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
