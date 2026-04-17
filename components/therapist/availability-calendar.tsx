"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Slot } from "@/lib/types";

function formatDayLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const delta = Math.round((d.getTime() - today.getTime()) / 86_400_000);
  if (delta === 0) return "Today";
  if (delta === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function AvailabilityCalendar({
  therapistId, slots, firstName,
}: {
  therapistId: string; slots: Slot[]; firstName: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Slot | null>(null);

  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now.getTime() + i * 86_400_000);
      const iso = d.toISOString().slice(0, 10);
      map.set(iso, []);
    }
    for (const s of slots) {
      const arr = map.get(s.day);
      if (arr) arr.push(s.time);
    }
    for (const times of map.values()) times.sort();
    return Array.from(map.entries());
  }, [slots]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="mono mb-4 text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Availability</div>
      <div className="space-y-4">
        {byDay.map(([day, times]) => (
          <div key={day}>
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-sm font-medium text-[var(--color-ink)]">{formatDayLabel(day)}</div>
              <div className="text-xs text-[var(--color-text-subtle)]">{times.length > 0 ? `${times.length} open` : "None"}</div>
            </div>
            {times.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {times.map(time => {
                  const active = selected?.day === day && selected.time === time;
                  return (
                    <button
                      key={`${day}-${time}`}
                      onClick={() => setSelected({ day, time })}
                      aria-pressed={active}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "border-[var(--color-sage)] bg-[var(--color-sage)] text-white"
                          : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink)] hover:border-[var(--color-sage)]",
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-[var(--color-text-subtle)]">No times available.</div>
            )}
          </div>
        ))}
      </div>

      <Button
        disabled={!selected}
        onClick={() =>
          selected && router.push(`/book/${therapistId}?day=${selected.day}&time=${encodeURIComponent(selected.time)}`)
        }
        className="mt-5 w-full bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)]"
      >
        {selected ? `Book with ${firstName} on ${formatDayLabel(selected.day)} at ${selected.time}` : `Select a time to book with ${firstName}`}
      </Button>
    </div>
  );
}
