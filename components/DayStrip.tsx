"use client";

import { DayForecast, SafetyLevel } from "@/types";

interface Props {
  forecasts: DayForecast[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}

const LEVEL_DOT: Record<SafetyLevel, string> = {
  safe: "bg-emerald-400",
  caution: "bg-amber-400",
  danger: "bg-rose-500",
};

function formatDay(dateStr: string, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" });
}

// Worst of the two scores determines the strip dot colour
function worstLevel(f: DayForecast): SafetyLevel {
  const order: SafetyLevel[] = ["danger", "caution", "safe"];
  return order.find(
    (l) => f.safety.level === l || f.comfort.level === l
  ) as SafetyLevel;
}

export default function DayStrip({ forecasts, selectedIndex, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {forecasts.map((f, i) => {
        const selected = i === selectedIndex;
        const dotColor = LEVEL_DOT[worstLevel(f)];
        return (
          <button
            key={f.date}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 ${
              selected
                ? "bg-ocean-600 text-white shadow-md scale-105"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
            style={selected ? { backgroundColor: "#0369a1" } : {}}
          >
            <span className={`text-xs font-semibold ${selected ? "text-sky-100" : "text-slate-400"}`}>
              {formatDay(f.date, i)}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          </button>
        );
      })}
    </div>
  );
}
