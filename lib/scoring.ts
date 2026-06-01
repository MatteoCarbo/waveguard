import { RawDayData } from "./api";
import { ComfortScore, SafetyScore, SafetyLevel } from "@/types";

// ─── Safety (danger for swimmers) ───────────────────────────────────────────
//
// Wave height thresholds (most critical factor for casual swimmers):
//   < 0.5m  → safe
//   0.5–1m  → caution (shore break possible)
//   1–1.5m  → caution (strong, not recommended)
//   > 1.5m  → danger
//
// Wind thresholds:
//   < 30 km/h → fine
//   30–50     → caution (offshore wind tricky)
//   > 50      → danger
//
// We weight waves 70% and wind 30%.

export function scoreSafety(d: RawDayData): SafetyScore {
  const waveH = d.waveHeightM;
  const wind = d.windKph;
  const gusts = d.windGustsKph;

  // Wave score (0 = dangerous, 100 = safe)
  let waveScore: number;
  if (waveH < 0.5) waveScore = 100;
  else if (waveH < 1.0) waveScore = 70;
  else if (waveH < 1.5) waveScore = 40;
  else if (waveH < 2.0) waveScore = 15;
  else waveScore = 0;

  // Wind score
  let windScore: number;
  const effectiveWind = Math.max(wind, gusts * 0.7);
  if (effectiveWind < 30) windScore = 100;
  else if (effectiveWind < 45) windScore = 60;
  else if (effectiveWind < 60) windScore = 25;
  else windScore = 0;

  const score = Math.round(waveScore * 0.7 + windScore * 0.3);
  const level = levelFromScore(score, { safe: 70, caution: 35 });

  return {
    level,
    score,
    summary: buildSafetySummary(waveH, wind, gusts, level),
    details: {
      waveHeightM: waveH,
      swellHeightM: d.swellHeightM,
      windKph: wind,
      windGustsKph: gusts,
      waterTempC: d.waterTempC,
    },
  };
}

// ─── Comfort (is it a nice beach day?) ──────────────────────────────────────
//
// Temperature: <15°C → poor, 15–20 → ok, 20–28 → great, >28 → hot but fine
// Rain probability: <20% fine, 20–50 caution, >50 poor
// Wind: light breeze fine, strong wind ruins the experience
// UV: informational, bonus above 4
//
// Weights: temp 50%, rain 30%, wind 20%

export function scoreComfort(d: RawDayData): ComfortScore {
  // Temperature score
  let tempScore: number;
  const t = d.temperatureC;
  if (t >= 20 && t <= 30) tempScore = 100;
  else if (t >= 16 && t < 20) tempScore = 65;
  else if (t > 30 && t <= 35) tempScore = 80;
  else if (t > 35) tempScore = 50;
  else if (t >= 12 && t < 16) tempScore = 30;
  else tempScore = 0;

  // Rain score
  let rainScore: number;
  const p = d.precipitationPct;
  if (p < 15) rainScore = 100;
  else if (p < 35) rainScore = 60;
  else if (p < 60) rainScore = 25;
  else rainScore = 0;

  // Wind (comfort — strong wind = unpleasant even if not dangerous)
  let windScore: number;
  const w = d.windKph;
  if (w < 20) windScore = 100;
  else if (w < 35) windScore = 65;
  else if (w < 50) windScore = 30;
  else windScore = 0;

  const score = Math.round(tempScore * 0.5 + rainScore * 0.3 + windScore * 0.2);
  const level = levelFromScore(score, { safe: 65, caution: 35 });

  return {
    level,
    score,
    summary: buildComfortSummary(d.temperatureC, d.precipitationPct, d.windKph, level),
    details: {
      temperatureC: d.temperatureC,
      windKph: d.windKph,
      precipitationPct: d.precipitationPct,
      uvIndex: d.uvIndex,
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function levelFromScore(
  score: number,
  thresholds: { safe: number; caution: number }
): SafetyLevel {
  if (score >= thresholds.safe) return "safe";
  if (score >= thresholds.caution) return "caution";
  return "danger";
}

function buildSafetySummary(
  waveH: number,
  wind: number,
  gusts: number,
  level: SafetyLevel
): string {
  if (level === "safe") {
    if (waveH < 0.3)
      return "Calm and flat — ideal conditions for swimming.";
    return `Gentle ${waveH.toFixed(1)}m waves — safe for most swimmers.`;
  }
  if (level === "caution") {
    if (waveH >= 1.0)
      return `${waveH.toFixed(1)}m waves — strong shore break, swim with caution.`;
    if (gusts > 45)
      return `Gusts up to ${Math.round(gusts)} km/h — choppy water, be careful.`;
    return `${waveH.toFixed(1)}m waves with ${Math.round(wind)} km/h wind — caution advised.`;
  }
  // danger
  if (waveH >= 2.0)
    return `${waveH.toFixed(1)}m swell — dangerous for swimmers. Stay out of the water.`;
  if (gusts > 60)
    return `Gusts up to ${Math.round(gusts)} km/h — rough conditions, not safe today.`;
  return `${waveH.toFixed(1)}m waves and strong wind — not safe for swimming.`;
}

function buildComfortSummary(
  temp: number,
  rain: number,
  wind: number,
  level: SafetyLevel
): string {
  if (level === "safe") {
    if (temp >= 25)
      return `${Math.round(temp)}°C and sunny — a perfect beach day.`;
    return `${Math.round(temp)}°C with light wind — great conditions.`;
  }
  if (level === "caution") {
    if (rain >= 35)
      return `${Math.round(rain)}% chance of rain — bring a backup plan.`;
    if (temp < 18)
      return `Only ${Math.round(temp)}°C — bring a layer, might be chilly.`;
    return `${Math.round(temp)}°C with ${Math.round(wind)} km/h wind — OK but not ideal.`;
  }
  // poor
  if (rain >= 60)
    return `High chance of rain (${Math.round(rain)}%) — not a beach day.`;
  if (temp < 14)
    return `${Math.round(temp)}°C — too cold for the beach.`;
  return `Poor conditions — strong wind and low temperature.`;
}
