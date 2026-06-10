import type { BeachHazard } from "@/types";

// ── COSTA DA CAPARICA ─────────────────────────────────────────────────────────
// Every hazard below is backed by a real source. Shape follows the evidence:
//   • espigão (groyne) rip  → corridor anchored to the real OSM groyne tip; the
//     structure IS the documented rip location
//   • beach documented as dangerous but with no single structure → a wider band
//     in the surf zone parallel to the shore (no fake pinpoint precision)
//   • estuary mouth → a zone (broad area), not a line
//
// Sources:
//   - Mil Homens et al., MDPI Water 2021 (Caparica morphodynamics / groyne rips)
//   - Documented drownings: Dragão Vermelho (Portugal Resident), Praia da Saúde
//     (Público, 2025-11-09), Praia Nova (2025)
//   - IPMA per-beach hazard pages; AMN (Autoridade Marítima) rip-current notices
//   - OSM man_made=breakwater geometry (groyne positions)
//
// Coordinates: groyne corridors are anchored to real OSM tips; surf-zone bands
// and the estuary zone are placed in the water off the documented beach and are
// approximate (verify on /hazard-preview).

export const CAPARICA_HAZARDS: Record<string, BeachHazard[]> = {

  // ── Estuary mouth — broad tidal current (zone, not a line) ──────────────────
  "praia-da-cova-do-vapor": [
    {
      id: "cova-vapor-tidal",
      type: "tidal_current",
      severity: "extreme",
      title: "Tagus estuary tidal current",
      description:
        "Extremely strong tidal currents at the Tagus estuary mouth. This is not a swimming beach under any conditions — the current here runs faster than any swimmer.",
      always: true,
      geometry: { type: "zone", lat: 38.6660, lon: -9.2602, radiusM: 160 },
      source: "EUROSION-2004 + estuary-mouth (no-swim)",
    },
  ],

  // ── Documented dangerous beach, no single groyne → surf-zone band ───────────
  "praia-de-sao-joao-caparica": [
    {
      id: "sao-joao-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Rip currents",
      description:
        "Return currents are permanently identified near the Caparica jetties and along this surf beach. The northern half is a surf zone — keep to the flagged swimming area.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.65693, -9.25410], [38.65507, -9.25250]],
        widthM: 70,
      },
      source: "caparica-surf-guide + AMN (rip-current notice)",
    },
  ],

  // ── Espigão rips — corridors anchored to real OSM groyne tips ───────────────
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
        path: [[38.65115, -9.24719], [38.6506, -9.24914]],
        widthM: 30,
      },
      source: "MDPI-2021 + AMN + osm",
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
      source: "MDPI-2021 + osm",
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
      source: "MDPI-2021 + osm",
    },
  ],

  "praia-do-dragao-vermelho": [
    {
      id: "dragao-vermelho-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Strong rip current",
      description:
        "Powerful rip currents form alongside the groyne in moderate swell. A swimmer drowned here after being caught in a rip — keep clear of the structure.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.64037, -9.23886], [38.63982, -9.24081]],
        widthM: 30,
      },
      source: "drowning-report (Portugal Resident) + MDPI-2021 + osm",
    },
  ],

  "praia-da-nova-vaga": [
    {
      id: "nova-vaga-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Groyne rip current",
      description:
        "Exposed southern section with a strong rip current alongside the groyne, difficult to swim against. A missing swimmer was recovered here.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.63819, -9.23748], [38.63764, -9.23943]],
        widthM: 30,
      },
      source: "incident-report-2025 + osm",
    },
  ],

  // ── Documented fatal drowning, no clear groyne → surf-zone band ─────────────
  "praia-da-saude-caparica": [
    {
      id: "saude-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Rip currents",
      description:
        "A swimmer drowned at this beach in 2025. Return currents form in the surf zone — swim only in the flagged, lifeguarded area.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.8 },
      geometry: {
        type: "corridor",
        path: [[38.63123, -9.23430], [38.62937, -9.23270]],
        widthM: 70,
      },
      source: "drowning-report (Público 2025-11-09) + AMN",
    },
  ],

  // ── Remote beach, documented rips, no lifeguard, no groyne → surf-zone band ──
  "fonte-da-telha": [
    {
      id: "fonte-telha-rip",
      type: "rip_current_dynamic",
      severity: "high",
      title: "Rip currents — no lifeguards",
      description:
        "Remote beach with documented return currents (agueiros) and water rescues, and no lifeguard supervision outside summer. Not suitable for casual swimmers.",
      always: false,
      triggerConditions: { waveHeightMinM: 0.7 },
      geometry: {
        type: "corridor",
        path: [[38.57283, -9.19980], [38.57097, -9.19820]],
        widthM: 70,
      },
      source: "IPMA-beach-205 + rescue-reports + AMN",
    },
  ],
};

/** Returns the structured hazards for a beach, or an empty array. */
export function getBeachHazards(beachId: string): BeachHazard[] {
  return CAPARICA_HAZARDS[beachId] ?? [];
}
