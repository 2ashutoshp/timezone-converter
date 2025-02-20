"use client";
import TimezoneForm from "@/components/TimezoneForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-10 space-y-6">
      <h1 className="text-4xl font-bold">Timezone Converter</h1>
      <p className="text-lg max-w-xl text-center">
        Easily convert time across timezones. Perfect for scheduling global
        meetings or planning international trips.
      </p>
      <TimezoneForm />
    </div>
  );
}
