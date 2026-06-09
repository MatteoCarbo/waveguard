"use client";

import { MapContainer, TileLayer, CircleMarker, Circle, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { BeachHazard, HazardSeverity } from "@/types";

interface HazardMapProps {
  beachName: string;
  lat: number;
  lon: number;
  hazards: BeachHazard[];
  waveHeight: number;
  windSpeed: number;
}

// ── Severity → colour ────────────────────────────────────────────────────────
const SEVERITY_COLOR: Record<HazardSeverity, string> = {
  moderate: "#f59e0b", // amber-500
  high:     "#f97316", // orange-500
  extreme:  "#dc2626", // red-600
};

const SEVERITY_LABEL: Record<HazardSeverity, string> = {
  moderate: "Moderate",
  high:     "High",
  extreme:  "Extreme",
};

// ── Corridor → polygon ───────────────────────────────────────────────────────
// Buffers a polyline (path) by widthM/2 on each side, converting metres ↔ degrees,
// to produce a thin closed band instead of a fat circle.
const M_PER_DEG_LAT = 111320;

function corridorToPolygon(
  path: [number, number][],
  widthM: number
): [number, number][] {
  const half = widthM / 2;
  const left: [number, number][] = [];
  const right: [number, number][] = [];

  for (let i = 0; i < path.length; i++) {
    const [lat, lon] = path[i];
    const prev = path[i - 1] ?? path[i];
    const next = path[i + 1] ?? path[i];
    const mPerDegLon = M_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180);

    // Segment direction in metres (east, north)
    const dxE = (next[1] - prev[1]) * mPerDegLon;
    const dyN = (next[0] - prev[0]) * M_PER_DEG_LAT;
    const len = Math.hypot(dxE, dyN) || 1;

    // Perpendicular (normal) unit vector: (-dyN, dxE) / len
    const nE = -dyN / len;
    const nN = dxE / len;

    const dLon = (nE * half) / mPerDegLon;
    const dLat = (nN * half) / M_PER_DEG_LAT;

    left.push([lat + dLat, lon + dLon]);
    right.push([lat - dLat, lon - dLon]);
  }

  return [...left, ...right.reverse()];
}

export default function HazardMap({
  beachName,
  lat,
  lon,
  hazards,
  waveHeight,
  windSpeed,
}: HazardMapProps) {
  // Only render hazards active in the selected day's conditions
  const active = hazards.filter(
    (h) =>
      h.always ||
      (h.triggerConditions?.waveHeightMinM !== undefined &&
        waveHeight >= h.triggerConditions.waveHeightMinM) ||
      (h.triggerConditions?.windSpeedMinKmh !== undefined &&
        windSpeed >= h.triggerConditions.windSpeedMinKmh)
  );

  if (!active.length) return null;

  // Severities present, for the legend (extreme → moderate order)
  const order: HazardSeverity[] = ["extreme", "high", "moderate"];
  const present = order.filter((s) => active.some((h) => h.severity === s));

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-xl">🗺️</span>
        <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">
          Hazard Map
        </span>
      </div>

      {/* Map */}
      <div className="h-64 w-full">
        <MapContainer
          key={`${beachName}-${active.length}`}
          center={[lat, lon]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          {/* Beach location marker */}
          <CircleMarker
            center={[lat, lon]}
            radius={6}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: "#0284c7",
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top">{beachName}</Tooltip>
          </CircleMarker>

          {/* Hazard overlays */}
          {active.map((h) => {
            const g = h.geometry;
            if (!g) return null;
            const color = SEVERITY_COLOR[h.severity];
            const opts = {
              color,
              weight: 1,
              fillColor: color,
              fillOpacity: 0.35,
            };

            if (g.type === "corridor") {
              return (
                <Polygon
                  key={h.id}
                  positions={corridorToPolygon(g.path, g.widthM)}
                  pathOptions={opts}
                >
                  <Tooltip sticky>{h.title}</Tooltip>
                </Polygon>
              );
            }
            if (g.type === "zone") {
              return (
                <Circle
                  key={h.id}
                  center={[g.lat, g.lon]}
                  radius={g.radiusM}
                  pathOptions={opts}
                >
                  <Tooltip sticky>{h.title}</Tooltip>
                </Circle>
              );
            }
            // point
            return (
              <CircleMarker
                key={h.id}
                center={[g.lat, g.lon]}
                radius={10}
                pathOptions={opts}
              >
                <Tooltip sticky>{h.title}</Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="px-4 py-3 flex items-center gap-4 flex-wrap border-t border-slate-100">
        {present.map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: SEVERITY_COLOR[s], opacity: 0.6 }}
            />
            <span className="text-[11px] text-slate-500">{SEVERITY_LABEL[s]}</span>
          </div>
        ))}
        <span className="text-[10px] text-slate-400 ml-auto">
          Tap a zone for details
        </span>
      </div>
    </div>
  );
}
