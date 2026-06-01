"use client";

import { Phone } from "lucide-react";

const NUMBERS = [
  {
    number: "112",
    label: "Emergency",
    description: "Police · Fire · Ambulance",
    icon: "🚨",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    number: "1414",
    label: "Maritime Emergency",
    description: "Coast Guard · Sea rescue",
    icon: "⛵",
    color: "text-sky-700",
    bg: "bg-sky-50",
  },
];

export default function EmergencyCard() {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-slate-500" />
        <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">
          Emergency Numbers
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {NUMBERS.map((n) => (
          <a
            key={n.number}
            href={`tel:${n.number}`}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${n.bg} active:scale-95 transition-transform`}
          >
            <span className="text-xl">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">{n.label}</p>
              <p className="text-xs text-slate-400">{n.description}</p>
            </div>
            <span className={`text-xl font-black tracking-tight ${n.color}`}>
              {n.number}
            </span>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-slate-300 text-center">
        Tap a number to call · Works anywhere in Portugal
      </p>
    </div>
  );
}
