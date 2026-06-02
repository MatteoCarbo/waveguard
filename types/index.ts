export interface LifeguardInfo {
  type: "year-round" | "seasonal" | "none";
  season?: { from: string; to: string }; // "MM-DD" inclusive, only for 'seasonal'
}

export interface Beach {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  description: string;
  hazards?: string; // static local knowledge: rocky bottom, rip currents, etc.
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
