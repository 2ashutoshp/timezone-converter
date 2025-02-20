"use client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn("animate-spin text-blue-500", className)} />
    </div>
  );
}
