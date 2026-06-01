"use client";

import { ComfortScore, SafetyScore, SafetyLevel } from "@/types";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";

interface Props {
  type: "comfort" | "safety";
  score: ComfortScore | SafetyScore;
}

const COMFORT_DETAILS = (s: ComfortScore) => [
  { label: "Temp", value: `${Math.round(s.details.temperatureC)}°C` },
  { label: "Wind", value: `${Math.round(s.details.windKph)} km/h` },
  { label: "Rain", value: `${Math.round(s.details.precipitationPct)}%` },
  { label: "UV", value: String(Math.round(s.details.uvIndex)) },
];

const SAFETY_DETAILS = (s: SafetyScore) => [
  { label: "Waves", value: `${s.details.waveHeightM.toFixed(1)} m` },
  { label: "Swell", value: `${s.details.swellHeightM.toFixed(1)} m` },
  { label: "Wind", value: `${Math.round(s.details.windKph)} km/h` },
  { label: "Gusts", value: `${Math.round(s.details.windGustsKph)} km/h` },
];

const LEVEL_BORDER: Record<SafetyLevel, string> = {
  safe: "border-emerald-400",
  caution: "border-amber-400",
  danger: "border-rose-500",
};

const LEVEL_BAR: Record<SafetyLevel, string> = {
  safe: "bg-emerald-400",
  caution: "bg-amber-400",
  danger: "bg-rose-500",
};

export default function ScoreCard({ type, score }: Props) {
  const isComfort = type === "comfort";
  const title = isComfort ? "Beach Day" : "Safety";
  const icon = isComfort ? "🌞" : "🌊";
  const details = isComfort
    ? COMFORT_DETAILS(score as ComfortScore)
    : SAFETY_DETAILS(score as SafetyScore);

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`bg-white rounded-2xl border-2 ${LEVEL_BORDER[score.level]} p-4 flex flex-col gap-3 shadow-sm`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">
            {title}
          </span>
        </div>
        <StatusBadge level={score.level} size="sm" />
      </div>

      {/* Score bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${LEVEL_BAR[score.level]}`}
          initial={{ width: 0 }}
          animate={{ width: `${score.score}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </div>

      {/* Summary */}
      <p className="text-slate-700 text-sm leading-snug">{score.summary}</p>

      {/* Details grid */}
      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100">
        {details.map((d) => (
          <div key={d.label} className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wide">
              {d.label}
            </span>
            <span className="text-xs font-semibold text-slate-700 mt-0.5">
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
