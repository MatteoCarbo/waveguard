"use client";

import { Fragment } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Polygon, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { corridorToPolygon } from "@/lib/geo";
import type { BeachHazard, HazardSeverity } from "@/types";

// Beach pin — a teardrop marker, visually distinct from a GPS "you are here" dot
const beachPinIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:26px;height:26px;transform:translate(-50%,-100%);
    display:flex;align-items:center;justify-content:center;
    background:#0f172a;border:2px solid #fff;border-radius:50% 50% 50% 0;
    rotate:45deg;box-shadow:0 1px 3px rgba(0,0,0,.4);">
    <span style="rotate:-45deg;font-size:13px;line-height:1;">🏖️</span>
  </div>`,
  iconSize: [26, 26],
  iconAnchor: [0, 0],
});

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
            attribution="&copy; OpenStreetMap"
          />

          {/* Beach pin — distinct from a GPS location dot */}
          <Marker position={[lat, lon]} icon={beachPinIcon}>
            <Tooltip direction="top">{beachName}</Tooltip>
          </Marker>

          {/* Hazard overlays — geofence style: faint wide warning halo + intense
              core, derived from the same geometry (no extra data authoring) */}
          {active.map((h) => {
            const g = h.geometry;
            if (!g) return null;
            const color = SEVERITY_COLOR[h.severity];

            const halo = { color, weight: 0, fillColor: color, fillOpacity: 0.13 };
            const core = { color, weight: 1.5, fillColor: color, fillOpacity: 0.5 };

            if (g.type === "corridor") {
              return (
                <Fragment key={h.id}>
                  <Polygon
                    positions={corridorToPolygon(g.path, g.widthM * 3.2)}
                    pathOptions={halo}
                  />
                  <Polygon
                    positions={corridorToPolygon(g.path, g.widthM)}
                    pathOptions={core}
                  >
                    <Tooltip sticky>{h.title}</Tooltip>
                  </Polygon>
                </Fragment>
              );
            }
            if (g.type === "zone") {
              return (
                <Fragment key={h.id}>
                  <Circle center={[g.lat, g.lon]} radius={g.radiusM * 1.9} pathOptions={halo} />
                  <Circle center={[g.lat, g.lon]} radius={g.radiusM} pathOptions={core}>
                    <Tooltip sticky>{h.title}</Tooltip>
                  </Circle>
                </Fragment>
              );
            }
            // point
            return (
              <Fragment key={h.id}>
                <CircleMarker center={[g.lat, g.lon]} radius={22} pathOptions={halo} />
                <CircleMarker center={[g.lat, g.lon]} radius={10} pathOptions={core}>
                  <Tooltip sticky>{h.title}</Tooltip>
                </CircleMarker>
              </Fragment>
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
