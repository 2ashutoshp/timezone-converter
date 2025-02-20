"use client";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TimezoneAutocomplete({
  label,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [timezoneList, setTimezoneList] = useState<string[]>([]);

  // Dynamically fetch supported timezones
  useEffect(() => {
    try {
      const zones = Intl.supportedValuesOf("timeZone");
      setTimezoneList(zones);
    } catch (error) {
      console.error("Timezone fetch failed:", error);
      // Fallback in case Intl.supportedValuesOf is not supported
      setTimezoneList([
        "UTC",
        "America/New_York",
        "America/Los_Angeles",
        "Europe/London",
        "Asia/Tokyo",
        "Asia/Kolkata",
        "Australia/Sydney",
      ]);
    }
  }, []);

  const filteredTimezones = timezoneList.filter((zone) =>
    zone.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {value || "Select a timezone"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search timezone..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {filteredTimezones.length > 0 ? (
                filteredTimezones.map((timezone) => (
                  <CommandItem
                    key={timezone}
                    onSelect={() => {
                      onChange(timezone);
                      setOpen(false);
                    }}
                  >
                    {timezone}
                  </CommandItem>
                ))
              ) : (
                <p className="p-4 text-sm text-muted">No timezones found.</p>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
