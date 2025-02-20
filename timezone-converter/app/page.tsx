"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("UTC");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromTimezone || !toTimezone || !date || !time) return;

    router.push(
      `/convert?from=${fromTimezone}&to=${toTimezone}&date=${date}&time=${time}`
    );
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold">Timezone Converter</h1>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="From Timezone (e.g., America/New_York)"
          className="border p-2 w-full"
          value={fromTimezone}
          onChange={(e) => setFromTimezone(e.target.value)}
        />
        <input
          type="text"
          placeholder="To Timezone (e.g., Europe/London)"
          className="border p-2 w-full"
          value={toTimezone}
          onChange={(e) => setToTimezone(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Convert Time
        </button>
      </form>
    </div>
  );
}
