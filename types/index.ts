export interface LifeguardInfo {
  type: "year-round" | "seasonal" | "none";
  season?: { from: string; to: string }; // "MM-DD" inclusive, only for 'seasonal'
}

// ── Hazard system ─────────────────────────────────────────────────────────────

export type HazardType =
  | "rip_current_fixed"   // permanent rip channel alongside a groyne/structure
  | "rip_current_dynamic" // rip that activates in specific meteo conditions
  | "tidal_current"       // estuary or lagoon tidal current
  | "longshore_current"   // lateral drift current
  | "shore_break"         // wave dumping directly onto the beach step
  | "rocky_shore"         // submerged rocks or uneven seabed
  | "surf_zone";          // active surf break — not suitable for casual swimmers

export type HazardSeverity = "moderate" | "high" | "extreme";

export type HazardGeometry =
  | { type: "point"; lat: number; lon: number }
  | { type: "zone"; lat: number; lon: number; radiusM: number };

export interface BeachHazard {
  id: string;                  // kebab-case unique id
  type: HazardType;
  severity: HazardSeverity;
  title: string;               // short label for UI
  description: string;         // plain-English warning for the bather
  always: boolean;             // true = present regardless of conditions
  triggerConditions?: {
    waveHeightMinM?: number;   // active when wave_height_max >= this (metres)
    windSpeedMinKmh?: number;  // active when wind_speed_10m_max >= this (km/h)
  };
  geometry?: HazardGeometry;   // approximate coords for future map layer
  source: string;              // traceability: "research/MDPI-2021" | "maritime-police" | etc.
}

// IPMA maritime warning (Agitação Marítima) for a coastal area
export interface IPMAWarning {
  awarenessTypeName: string;
  idAreaAviso: string;
  startTime: string;
  endTime: string;
  awarenessLevelID: "green" | "yellow" | "orange" | "red";
  text: string;
}

export interface Beach {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  description: string;
  hazards?: string;                  // free-text for Algarve/Alentejo beaches — kept as-is
  structuredHazards?: BeachHazard[]; // structured hazard system (Caparica phase 1)
  ipmaAreaAviso?: string;            // IPMA coastal area code, e.g. "LSB" for Lisboa
  lifeguard?: LifeguardInfo;
}

export type SafetyLevel = "safe" | "caution" | "danger";

export interface ComfortScore {
  level: SafetyLevel;
  score: number; // 0-100
  summary: string;
  details: {
    temperatureC: number;
    windKph: number;
    precipitationPct: number;
    uvIndex: number;
  };
}

export interface SafetyScore {
  level: SafetyLevel;
  score: number; // 0-100
  summary: string;
  details: {
    waveHeightM: number;
    swellHeightM: number;
    windKph: number;
    windGustsKph: number;
    waterTempC: number;
  };
}

export interface DayForecast {
  date: string; // ISO date string
  comfort: ComfortScore;
  safety: SafetyScore;
}

export interface BeachForecast {
  beach: Beach;
  forecasts: DayForecast[]; // 6 days: today + 5
}
