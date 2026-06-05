"use client";

import { motion } from "framer-motion";

interface Props {
  windKph: number;
  gustsKph: number;
}

interface WindLevel {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
  tips: string[];
}

function getWindLevel(kph: number): WindLevel {
  if (kph < 15) return {
    label: "Calm",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "🌿",
    tips: ["No wind chill — perfect for sunbathing.", "Flat water, great for swimming and snorkelling."],
  };
  if (kph < 25) return {
    label: "Light Breeze",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "🍃",
    tips: ["Pleasant on hot days.", "Parasols stable — enjoy the beach."],
  };
  if (kph < 40) return {
    label: "Moderate",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "💨",
    tips: ["Sand may start to blow — keep an eye on your stuff.", "Secure parasols and towels.", "Choppy water — exercise caution if swimming."],
  };
  if (kph < 55) return {
    label: "Strong",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "🌬️",
    tips: ["Uncomfortable on the beach — sand in face.", "Umbrellas risk flipping — fold them down.", "Rough water — not recommended for casual swimmers."],
  };
  if (kph < 70) return {
    label: "Very Strong",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: "⚠️",
    tips: ["Beach day significantly impacted.", "Dangerous conditions for umbrellas and loose items.", "Strong rip currents likely — avoid swimming."],
  };
  return {
    label: "Gale",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "🚨",
    tips: ["Dangerous conditions — consider avoiding the beach.", "Flying debris risk.", "Swimming extremely dangerous."],
  };
}

const WIND_GRADIENT = "linear-gradient(to right, #22c55e, #84cc16, #eab308, #f97316, #ef4444, #a855f7)";
const MAX_WIND_KPH = 80;

export default function WindCard({ windKph, gustsKph }: Props) {
  const level = getWindLevel(windKph);
  const barPct = Math.min((windKph / MAX_WIND_KPH) * 100, 100);

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`rounded-2xl border-2 ${level.border} ${level.bg} p-4 flex flex-col gap-3`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💨</span>
          <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">Wind</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-lg font-black ${level.color}`}>{Math.round(windKph)}</span>
          <span className="text-xs text-slate-400 font-medium">km/h</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 ${level.color}`}>
            {level.label}
          </span>
        </div>
      </div>

      {/* Wind gradient bar */}
      <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ background: WIND_GRADIENT }}>
        <div
          className="absolute top-0 right-0 bottom-0 bg-white/50"
          style={{ left: `${barPct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-slate-400 shadow"
          style={{ left: `calc(${barPct}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-slate-400 font-medium -mt-1">
        <span>0 Calm</span>
        <span>40 Strong</span>
        <span>80+ Gale</span>
      </div>

      {/* Gusts */}
      {gustsKph > windKph * 1.15 && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{level.icon}</span>
          <span className={`text-sm font-semibold ${level.color}`}>
            Gusts up to {Math.round(gustsKph)} km/h
          </span>
        </div>
      )}

      {/* Tips */}
      <ul className="flex flex-col gap-1">
        {level.tips.map((tip, i) => (
          <li key={i} className="text-xs text-slate-600 flex gap-1.5">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
