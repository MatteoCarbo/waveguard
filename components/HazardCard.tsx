"use client";

import { Waves, Wind } from "lucide-react";
import type { BeachHazard, HazardSeverity, IPMAWarning } from "@/types";

interface HazardCardProps {
  hazards: BeachHazard[];
  waveHeight: number; // today's wave_height_max in metres
  windSpeed: number;  // today's wind_speed_10m_max in km/h
  ipmaWarning?: IPMAWarning | null;
}

// ── Severity badge styles ──────────────────────────────────────────────────
const SEVERITY_BADGE: Record<HazardSeverity, string> = {
  moderate: "bg-amber-100 text-amber-700 border border-amber-300",
  high:     "bg-orange-100 text-orange-700 border border-orange-300",
  extreme:  "bg-red-100 text-red-700 border border-red-300",
};

const SEVERITY_LABEL: Record<HazardSeverity, string> = {
  moderate: "Moderate",
  high:     "High",
  extreme:  "Extreme",
};

// ── IPMA banner styles ────────────────────────────────────────────────────
const IPMA_BANNER: Record<"yellow" | "orange" | "red", string> = {
  yellow: "bg-yellow-50 border-b border-yellow-300 text-yellow-800",
  orange: "bg-orange-50 border-b border-orange-300 text-orange-800",
  red:    "bg-red-50 border-b border-red-300 text-red-800",
};

export default function HazardCard({
  hazards,
  waveHeight,
  windSpeed,
  ipmaWarning,
}: HazardCardProps) {
  // Filter to only the hazards that are active given today's conditions
  const active = hazards.filter(
    (h) =>
      h.always ||
      (h.triggerConditions?.waveHeightMinM !== undefined &&
        waveHeight >= h.triggerConditions.waveHeightMinM) ||
      (h.triggerConditions?.windSpeedMinKmh !== undefined &&
        windSpeed >= h.triggerConditions.windSpeedMinKmh)
  );

  // Show the card only when there is something to display
  const hasIpma =
    ipmaWarning != null && ipmaWarning.awarenessLevelID !== "green";

  if (!active.length && !hasIpma) return null;

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-400 shadow-sm overflow-hidden">

      {/* IPMA maritime warning banner */}
      {hasIpma && (
        <div
          className={`px-4 py-2 flex items-center gap-2 ${
            IPMA_BANNER[
              ipmaWarning!.awarenessLevelID as "yellow" | "orange" | "red"
            ] ?? IPMA_BANNER.yellow
          }`}
        >
          <span className="text-sm">⚠️</span>
          <p className="text-xs font-bold uppercase tracking-wide">
            IPMA Maritime Warning —{" "}
            {ipmaWarning!.awarenessLevelID.charAt(0).toUpperCase() +
              ipmaWarning!.awarenessLevelID.slice(1)}{" "}
            level
          </p>
        </div>
      )}

      {/* Card header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">
          Local Hazards
        </span>
      </div>

      {/* Active hazard list */}
      {active.length > 0 && (
        <div className="px-4 pb-4 flex flex-col gap-4">
          {active.map((h) => (
            <div key={h.id} className="flex flex-col gap-1.5">

              {/* Severity badge + title */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${SEVERITY_BADGE[h.severity]}`}
                >
                  {SEVERITY_LABEL[h.severity]}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {h.title}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {h.description}
              </p>

              {/* Trigger condition note — only for conditional hazards */}
              {!h.always && h.triggerConditions && (
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  {h.triggerConditions.waveHeightMinM !== undefined && (
                    <>
                      <Waves className="w-3 h-3 flex-shrink-0" />
                      Active when waves ≥ {h.triggerConditions.waveHeightMinM}m
                    </>
                  )}
                  {h.triggerConditions.windSpeedMinKmh !== undefined && (
                    <>
                      <Wind className="w-3 h-3 flex-shrink-0" />
                      Active when wind ≥ {h.triggerConditions.windSpeedMinKmh}{" "}
                      km/h
                    </>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* IPMA banner shown but no active location hazards */}
      {active.length === 0 && hasIpma && (
        <div className="px-4 pb-4">
          <p className="text-xs text-slate-500">
            No location-specific hazards active in current conditions.
          </p>
        </div>
      )}
    </div>
  );
}
