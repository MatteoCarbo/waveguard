import type { BeachHazard } from "@/types";

// ── COSTA DA CAPARICA ─────────────────────────────────────────────────────────
// 26 km of coast south of Lisbon. The urbanised northern strip is protected by a
// series of artificial groynes (espigões) built between the 1960s and 1990s. Each
// groyne creates a permanent rip channel running seaward alongside it — used by
// surfers to paddle out, lethal for unaware bathers.
//
// Primary source: Mil Homens et al., MDPI Water 2021
// Secondary: Polícia Marítima de Almada, FEPONS 2024, local knowledge
//
// GEOMETRY MODEL
// The coast here faces west, so the open sea is to the WEST (lower / more negative
// longitude). Hazards are encoded as narrow CORRIDORS, not big circles:
//   • rip currents  → a line from the beach running WEST (seaward) ~200 m, ~30 m wide
//   • shore break   → a short band PARALLEL to the shoreline at the waterline
//   • longshore     → a longer band parallel to the shoreline
//   • estuary / surf zone → a true area, kept as `zone`
// Coordinates are accurate to ~100 m and will be refined with OSM Overpass.

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
      // Estuary mouth is a genuinely broad danger area, not a thin channel
      geometry: { type: "zone", lat: 38.6588, lon: -9.2475, radiusM: 220 },
      source: "research/EUROSION-2004",
    },
  ],

  "praia-de-sao-joao-caparica": [
    {
      id: "sao-joao-groyne-rip",
      type: "rip_current_fixed",
      severity: "high",
      title: "Groyne rip channel",
      description:
        "A rip current runs seaward alongside the groyne at the northern end of the beach. Stay well clear of the structure when swimming.",
      always: true,
      geometry: {
        type: "corridor",
        path: [[38.6540, -9.2375], [38.6538, -9.2398]],
        widthM: 30,
      },
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
      geometry: { type: "zone", lat: 38.6535, lon: -9.2392, radiusM: 110 },
      source: "local-knowledge",
    },
  ],

  "praia-do-norte-caparica": [
    {
      id: "norte-caparica-groyne-rip",
      type: "rip_current_fixed",
      severity: "extreme",
      title: "Northern groyne rip current",
      description:
        "A permanent rip channel runs seaward alongside the northern espigão, dragging swimmers rapidly offshore. Surfers use it to paddle out — stay well away from the groyne.",
      always: true,
      geometry: {
        type: "corridor",
        path: [[38.6497, -9.2370], [38.6494, -9.2393]],
        widthM: 30,
      },
      source: "research/MDPI-2021 + maritime-police",
    },
  ],

  "praia-do-cds": [
    {
      id: "cds-shore-break",
      type: "shore_break",
      severity: "moderate",
      title: "Shore break",
      description:
        "A hollow shore break develops at higher tides — caution for inexperienced swimmers and young children at the water's edge.",
      always: false,
      triggerConditions: { waveHeightMinM: 1.0 },
      geometry: {
        type: "corridor",
        path: [[38.6460, -9.2366], [38.6440, -9.2366]],
        widthM: 25,
      },
      source: "local-knowledge",
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
      geometry: {
        type: "corridor",
        path: [[38.6435, -9.2364], [38.6415, -9.2364]],
        widthM: 25,
      },
      source: "local-knowledge",
    },
  ],

  "praia-do-dragao-vermelho": [
    {
      id: "dragao-vermelho-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Strong rip current",
      description:
        "Powerful rip currents form alongside the groyne in moderate swell. Multiple drowning incidents recorded here, cited specifically by the Almada maritime police.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.6402, -9.2362], [38.6399, -9.2385]],
        widthM: 30,
      },
      source: "maritime-police + local-knowledge",
    },
  ],

  "praia-da-saude-caparica": [
    {
      id: "saude-longshore",
      type: "longshore_current",
      severity: "moderate",
      title: "Longshore current",
      description:
        "A strong lateral current develops in windy conditions, drifting swimmers along the shore away from where they entered.",
      always: false,
      triggerConditions: { windSpeedMinKmh: 30 },
      geometry: {
        type: "corridor",
        path: [[38.6388, -9.2360], [38.6362, -9.2360]],
        widthM: 40,
      },
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
        "Exposed to strong southwesterly winds — longshore currents here are consistently stronger than the northern beaches and very difficult to swim against.",
      always: false,
      triggerConditions: { windSpeedMinKmh: 25 },
      geometry: {
        type: "corridor",
        path: [[38.6360, -9.2356], [38.6330, -9.2356]],
        widthM: 45,
      },
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
      geometry: {
        type: "corridor",
        path: [[38.5852, -9.2050], [38.5850, -9.2073]],
        widthM: 35,
      },
      source: "FEPONS-2024 + local-knowledge",
    },
  ],
};

/** Returns the structured hazards for a beach, or an empty array. */
export function getBeachHazards(beachId: string): BeachHazard[] {
  return CAPARICA_HAZARDS[beachId] ?? [];
}
