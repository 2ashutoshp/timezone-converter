"use client";
import { useState, useEffect, useRef } from "react";
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

// Manually added international timezone abbreviations
const manualTimezones = [
  {
    label: "Asia/Kolkata (IST - India Standard Time)",
    value: "Asia/Kolkata",
    abbreviation: "IST",
  },
  {
    label: "Asia/Tokyo (JST - Japan Standard Time)",
    value: "Asia/Tokyo",
    abbreviation: "JST",
  },
  {
    label: "Australia/Sydney (AEST - Australian Eastern Standard Time)",
    value: "Australia/Sydney",
    abbreviation: "AEST",
  },
  {
    label: "Europe/London (BST - British Summer Time)",
    value: "Europe/London",
    abbreviation: "BST",
  },
  {
    label: "Europe/Paris (CET - Central European Time)",
    value: "Europe/Paris",
    abbreviation: "CET",
  },
];

// Fetch timezone abbreviations dynamically using Intl API
const fetchDynamicTimezones = () => {
  try {
    const zones = Intl.supportedValuesOf("timeZone");
    const dynamicTimezones = zones.map((zone) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: zone,
        timeZoneName: "short",
      });

      const date = new Date();
      const parts = formatter.formatToParts(date);
      const abbreviation =
        parts.find((part) => part.type === "timeZoneName")?.value || "UTC";

      return {
        label: `${zone} (${abbreviation})`,
        value: zone,
        abbreviation,
      };
    });

    // Merge dynamic timezones with manually added international abbreviations
    return [...dynamicTimezones, ...manualTimezones];
  } catch (error) {
    console.error("Failed to fetch timezones dynamically:", error);
    return [];
  }
};

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
  const [timezoneList, setTimezoneList] = useState<
    { label: string; value: string; abbreviation: string }[]
  >([]);
  const firstItemRef = useRef<HTMLDivElement>(null); // Reference to first dropdown item

  useEffect(() => {
    const timezones = fetchDynamicTimezones();
    setTimezoneList(timezones);
  }, []);

  // Allow search by abbreviation, region, or description
  const filteredTimezones = timezoneList.filter(
    (tz) =>
      tz.label.toLowerCase().includes(query.toLowerCase()) ||
      tz.abbreviation.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open && filteredTimezones.length > 0) {
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 0);
    }
  }, [open, filteredTimezones]);

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {value || "Select a timezone or abbreviation"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search timezone, abbreviation, or region..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {filteredTimezones.length > 0 ? (
                filteredTimezones.map((timezone, index) => (
                  <CommandItem
                    key={timezone.value}
                    onSelect={() => {
                      onChange(timezone.value);
                      setOpen(false);
                    }}
                    ref={index === 0 ? firstItemRef : null} // Automatically focus first item
                  >
                    {timezone.label}
                  </CommandItem>
                ))
              ) : (
                <p className="p-4 text-sm text-muted">
                  No matching timezones found.
                </p>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
