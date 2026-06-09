import type { BeachHazard } from "@/types";

// ── COSTA DA CAPARICA ─────────────────────────────────────────────────────────
// The urbanised northern strip is protected by a series of artificial groynes
// (espigões). Each groyne creates a permanent rip channel running seaward
// alongside it — used by surfers to paddle out, lethal for unaware bathers.
//
// Primary source: Mil Homens et al., MDPI Water 2021
// Secondary: Polícia Marítima de Almada, FEPONS 2024, local knowledge
//
// GEOMETRY MODEL — every rip corridor is anchored to the REAL groyne geometry
// pulled from OpenStreetMap (man_made=breakwater ways near Caparica). Each
// corridor runs along the groyne axis, from the shore attachment out past the
// seaward tip — i.e. exactly where the rip channel forms. Coordinates are the
// actual OSM groyne-tip positions, not estimates.
// Beaches without a groyne (Saúde, Fonte da Telha) use a shoreline-parallel or
// seaward corridor instead.

export const CAPARICA_HAZARDS: Record<string, BeachHazard[]> = {

  "praia-da-cova-do-vapor": [
    {
      id: "cova-vapor-tidal",
      type: "tidal_current",
      severity: "extreme",
      title: "Tagus estuary tidal current",
      description:
        "Extremely strong tidal currents at the Tagus estuary mouth, channelled along the jetty. This is not a swimming beach under any conditions.",
      always: true,
      // Tagus estuary mouth — a broad danger area at the channel, not a thin
      // groyne rip. Kept as a zone placed in the water off the spit.
      geometry: { type: "zone", lat: 38.6652, lon: -9.2590, radiusM: 180 },
      source: "research/EUROSION-2004 + osm",
    },
  ],

  "praia-de-sao-joao-caparica": [
    {
      id: "sao-joao-groyne-rip",
      type: "rip_current_fixed",
      severity: "high",
      title: "Groyne rip channel",
      description:
        "A rip current runs seaward alongside the groyne. Stay well clear of the structure when swimming.",
      always: true,
      geometry: {
        type: "corridor",
        path: [[38.65539, -9.24843], [38.65484, -9.25038]],
        widthM: 30,
      },
      source: "research/MDPI-2021 + osm",
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
        path: [[38.65115, -9.24719], [38.65060, -9.24914]],
        widthM: 30,
      },
      source: "research/MDPI-2021 + maritime-police + osm",
    },
  ],

  "praia-do-cds": [
    {
      id: "cds-groyne-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Groyne rip current",
      description:
        "A rip current forms alongside the groyne in moderate swell. Keep clear of the structure and swim between the flags.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.64594, -9.24309], [38.64539, -9.24504]],
        widthM: 30,
      },
      source: "research/MDPI-2021 + osm",
    },
  ],

  "praia-do-tarquinio-paraiso": [
    {
      id: "tarquinio-groyne-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Groyne rip current",
      description:
        "A rip current forms alongside the groyne in moderate swell. Avoid swimming next to the structure.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.64291, -9.24257], [38.64236, -9.24452]],
        widthM: 30,
      },
      source: "research/MDPI-2021 + osm",
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
        path: [[38.64037, -9.23886], [38.63982, -9.24081]],
        widthM: 30,
      },
      source: "maritime-police + osm",
    },
  ],

  "praia-da-nova-vaga": [
    {
      id: "nova-vaga-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Groyne rip current",
      description:
        "Exposed southern section — a strong rip current forms alongside the groyne and is difficult to swim against.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.63819, -9.23748], [38.63764, -9.23943]],
        widthM: 30,
      },
      source: "local-knowledge + osm",
    },
  ],

  "praia-da-saude-caparica": [
    {
      id: "saude-longshore",
      type: "longshore_current",
      severity: "moderate",
      title: "Longshore current",
      description:
        "No groyne in this section — a strong lateral current develops in windy conditions, drifting swimmers along the shore.",
      always: false,
      triggerConditions: { windSpeedMinKmh: 30 },
      geometry: {
        type: "corridor",
        path: [[38.63123, -9.22920], [38.62937, -9.22760]],
        widthM: 40,
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
        path: [[38.5719, -9.1961], [38.5709, -9.1980]],
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
