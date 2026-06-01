"use client";

import { motion } from "framer-motion";

interface Props {
  uvIndex: number;
}

interface UVLevel {
  label: string;
  color: string;
  bg: string;
  border: string;
  spf: string;
  tips: string[];
}

function getUVLevel(uv: number): UVLevel {
  if (uv <= 2) return {
    label: "Low",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    spf: "No SPF needed",
    tips: ["Safe to be outside without protection."],
  };
  if (uv <= 5) return {
    label: "Moderate",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    spf: "SPF 15–30",
    tips: ["Apply sunscreen if staying more than 30 min.", "Sunglasses recommended."],
  };
  if (uv <= 7) return {
    label: "High",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    spf: "SPF 30–50",
    tips: ["Apply SPF 30+ before going out.", "Sunglasses and a hat advised.", "Seek shade between 12pm–3pm."],
  };
  if (uv <= 10) return {
    label: "Very High",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    spf: "SPF 50+",
    tips: ["SPF 50+ is essential — reapply every 2 hours.", "Sunglasses and hat required.", "Avoid direct sun between 11am–4pm.", "Keep children in the shade."],
  };
  return {
    label: "Extreme",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    spf: "SPF 50+ (reapply often)",
    tips: ["Maximum protection needed at all times.", "SPF 50+ every 2 hours, waterproof formula.", "Full-coverage hat and UV sunglasses.", "Minimise time in direct sun.", "Keep children fully covered."],
  };
}

// Simple visual UV bar (0–11+ scale)
const UV_GRADIENT = "linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #a855f7)";

export default function UVCard({ uvIndex }: Props) {
  const level = getUVLevel(uvIndex);
  const barPct = Math.min((uvIndex / 11) * 100, 100);

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
          <span className="text-xl">☀️</span>
          <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">UV Index</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-lg font-black ${level.color}`}>{Math.round(uvIndex)}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 ${level.color}`}>
            {level.label}
          </span>
        </div>
      </div>

      {/* UV gradient bar */}
      <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ background: UV_GRADIENT }}>
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
        <span>0 Low</span>
        <span>6 High</span>
        <span>11+ Extreme</span>
      </div>

      {/* SPF badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm">🧴</span>
        <span className={`text-sm font-semibold ${level.color}`}>{level.spf}</span>
      </div>

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
