import type { BeachHazard } from "@/types";

// ── COSTA DA CAPARICA ─────────────────────────────────────────────────────────
// 26 km of coast south of Lisbon. Seven artificial groynes (espigões) built between
// the 1960s and 1990s create permanent rip channels used by surfers to paddle out —
// lethal for unaware bathers.
//
// Primary source: Mil Homens et al., MDPI Water 2021
// Secondary: Polícia Marítima de Almada, FEPONS 2024, local knowledge
//
// Geometry coordinates are approximate (±200m). Will be refined with OSM Overpass
// in the map phase.

export const CAPARICA_HAZARDS: Record<string, BeachHazard[]> = {

  "praia-da-cova-do-vapor": [
    {
      id: "cova-vapor-tidal",
      type: "tidal_current",
      severity: "extreme",
      title: "Tagus estuary tidal current",
      description:
        "Extremely strong tidal currents at the Tagus estuary mouth. This is not a swimming beach under any conditions — the current here runs faster than any swimmer.",
      always: true,
      geometry: { type: "zone", lat: 38.640, lon: -9.237, radiusM: 400 },
      source: "research/EUROSION-2004",
    },
  ],

  "praia-do-norte-caparica": [
    {
      id: "norte-caparica-groyne-rip",
      type: "rip_current_fixed",
      severity: "extreme",
      title: "Northern groyne rip current",
      description:
        "Permanent rip channel runs alongside the northern espigão, dragging swimmers rapidly offshore. Surfers use it to paddle out — stay well away from the groyne structure.",
      always: true,
      geometry: { type: "point", lat: 38.620, lon: -9.237 },
      source: "research/MDPI-2021 + maritime-police",
    },
  ],

  "praia-do-dragao-vermelho": [
    {
      id: "dragao-vermelho-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Strong rip current",
      description:
        "Powerful rip currents form at this beach in moderate swell. Multiple drowning incidents recorded here, cited specifically by the Almada maritime police.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: { type: "zone", lat: 38.594, lon: -9.239, radiusM: 250 },
      source: "maritime-police + local-knowledge",
    },
  ],

  "praia-do-tarquinio-paraiso": [
    {
      id: "tarquinio-shore-break",
      type: "shore_break",
      severity: "moderate",
      title: "Shore break",
      description:
        "Waves dump heavily onto the beach step in larger swells — risk of injury to swimmers entering or exiting the water, especially children.",
      always: false,
      triggerConditions: { waveHeightMinM: 1.5 },
      geometry: { type: "zone", lat: 38.572, lon: -9.238, radiusM: 200 },
      source: "local-knowledge",
    },
  ],

  "praia-de-sao-joao-caparica": [
    {
      id: "sao-joao-groyne-rip",
      type: "rip_current_fixed",
      severity: "high",
      title: "Groyne rip channel",
      description:
        "Rip current forms alongside the groyne at the northern end of the beach. Stay well clear of the structure when swimming.",
      always: true,
      geometry: { type: "point", lat: 38.519, lon: -9.233 },
      source: "surf-atlas + local-knowledge",
    },
    {
      id: "sao-joao-surf-zone",
      type: "surf_zone",
      severity: "moderate",
      title: "Active surf zone",
      description:
        "Popular surf break — casual swimmers should stay away from the peak and keep watch for surfers in the water.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.6 },
      geometry: { type: "zone", lat: 38.519, lon: -9.233, radiusM: 150 },
      source: "local-knowledge",
    },
  ],

  "praia-do-cds": [
    {
      id: "cds-shore-break",
      type: "shore_break",
      severity: "moderate",
      title: "Shore break",
      description:
        "Hollow shore break develops at higher tides — caution for inexperienced swimmers and young children at the water's edge.",
      always: false,
      triggerConditions: { waveHeightMinM: 1.0 },
      geometry: { type: "zone", lat: 38.547, lon: -9.237, radiusM: 180 },
      source: "local-knowledge",
    },
  ],

  "praia-da-saude-caparica": [
    {
      id: "saude-longshore",
      type: "longshore_current",
      severity: "moderate",
      title: "Longshore current",
      description:
        "No groynes in this section — a strong lateral current develops in windy conditions, drifting swimmers along the shore.",
      always: false,
      triggerConditions: { windSpeedMinKmh: 30 },
      geometry: { type: "zone", lat: 38.530, lon: -9.238, radiusM: 300 },
      source: "local-knowledge",
    },
  ],

  "praia-da-nova-vaga": [
    {
      id: "nova-vaga-longshore",
      type: "longshore_current",
      severity: "high",
      title: "Strong longshore current",
      description:
        "Exposed to strong southwesterly winds — longshore currents here are consistently stronger than northern Caparica beaches and very difficult to swim against.",
      always: false,
      triggerConditions: { windSpeedMinKmh: 25 },
      geometry: { type: "zone", lat: 38.508, lon: -9.228, radiusM: 400 },
      source: "local-knowledge",
    },
  ],

  "fonte-da-telha": [
    {
      id: "fonte-telha-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Rip current — no lifeguards",
      description:
        "Remote beach with no lifeguard supervision and strong rip currents in any swell. Not suitable for casual swimmers.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.7 },
      geometry: { type: "zone", lat: 38.462, lon: -9.200, radiusM: 350 },
      source: "FEPONS-2024 + local-knowledge",
    },
  ],
};

/** Returns the structured hazards for a beach, or an empty array. */
export function getBeachHazards(beachId: string): BeachHazard[] {
  return CAPARICA_HAZARDS[beachId] ?? [];
}
