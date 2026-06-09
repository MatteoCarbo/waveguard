"use client";

import { Fragment } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { corridorToPolygon } from "@/lib/geo";
import { CAPARICA_HAZARDS } from "@/lib/hazards";
import { BEACHES } from "@/lib/beaches";
import type { HazardSeverity, BeachHazard } from "@/types";

const SEVERITY_COLOR: Record<HazardSeverity, string> = {
  moderate: "#f59e0b",
  high: "#f97316",
  extreme: "#dc2626",
};

// Real OSM groyne/breakwater tips — black reference dots to check alignment.
const GROYNE_TIPS: [number, number][] = [
  [38.66505, -9.25777],
  [38.65525, -9.24892],
  [38.65101, -9.24768],
  [38.64580, -9.24358],
  [38.64277, -9.24306],
  [38.64023, -9.23935],
  [38.63805, -9.23797],
];

function HazardShapes({ hazards }: { hazards: BeachHazard[] }) {
  return (
    <>
      {hazards.map((h) => {
        const g = h.geometry;
        if (!g) return null;
        const color = SEVERITY_COLOR[h.severity];
        const halo = { color, weight: 0, fillColor: color, fillOpacity: 0.13 };
        const core = { color, weight: 1.5, fillColor: color, fillOpacity: 0.5 };
        if (g.type === "corridor") {
          return (
            <Fragment key={h.id}>
              <Polygon positions={corridorToPolygon(g.path, g.widthM * 3.2)} pathOptions={halo} />
              <Polygon positions={corridorToPolygon(g.path, g.widthM)} pathOptions={core}>
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
        return null;
      })}
    </>
  );
}

export default function HazardPreviewMap() {
  const entries = Object.entries(CAPARICA_HAZARDS);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {entries.map(([beachId, hazards]) => {
        const beach = BEACHES.find((b) => b.id === beachId);
        if (!beach) return null;
        return (
          <div key={beachId} className="bg-white rounded-xl overflow-hidden border border-slate-200">
            <div className="px-3 py-2 text-xs font-semibold text-slate-700 flex justify-between">
              <span>{beach.name}</span>
              <span className="text-slate-400">{hazards.map((h) => h.severity).join(", ")}</span>
            </div>
            <div className="h-72 w-full">
              <MapContainer
                center={[beach.lat, beach.lon]}
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                attributionControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* real groyne tips */}
                {GROYNE_TIPS.map(([la, lo], i) => (
                  <CircleMarker
                    key={i}
                    center={[la, lo]}
                    radius={4}
                    pathOptions={{ color: "#000", weight: 1, fillColor: "#000", fillOpacity: 1 }}
                  />
                ))}
                {/* beach anchor */}
                <CircleMarker
                  center={[beach.lat, beach.lon]}
                  radius={4}
                  pathOptions={{ color: "#0284c7", weight: 1, fillColor: "#0284c7", fillOpacity: 0.9 }}
                />
                <HazardShapes hazards={hazards} />
              </MapContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
