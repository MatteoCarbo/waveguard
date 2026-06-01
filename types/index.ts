export interface Beach {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  description: string;
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
