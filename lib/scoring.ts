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
// Formula B — weighted base × worst-factor multiplier
//
// Base score (0–100):
//   temp 50%, wind 30%, rain 20%
//   → reflects that a good temp + calm day = nice even with some clouds
//
// Multipliers (applied on top, minimum wins):
//   Rain:  the biggest veto — if it's raining it's always bad
//     <20%  → ×1.0  |  20–40% → ×0.90  |  40–60% → ×0.50  |  >60% → ×0.15
//   Wind:  sand in face, umbrella flying = ruins any day
//     <25   → ×1.0  |  25–40  → ×0.90  |  40–55  → ×0.65  |  >55  → ×0.35
//   Heat:  torrido = worse than no beach
//     <34°C → ×1.0  |  34–37°C → ×0.80  |  >37°C → ×0.50

type ComfortFactor = "rain" | "wind" | "heat" | "cold" | "good";

export function scoreComfort(d: RawDayData): ComfortScore {
  const t = d.temperatureC;
  const w = d.windKph;
  const p = d.precipitationPct;

  // ── Sub-scores (0–100) ──────────────────────────────────────────────────
  let tempScore: number;
  if (t >= 22 && t <= 28) tempScore = 100;
  else if (t > 28 && t <= 33) tempScore = 80;
  else if (t >= 18 && t < 22) tempScore = 65;
  else if (t > 33 && t <= 36) tempScore = 50;
  else if (t >= 15 && t < 18) tempScore = 30;
  else if (t > 36) tempScore = 15;
  else tempScore = 5; // <15°C

  let windScore: number;
  if (w < 15) windScore = 100;
  else if (w < 25) windScore = 80;
  else if (w < 35) windScore = 55;
  else if (w < 50) windScore = 25;
  else windScore = 0;

  let rainScore: number;
  if (p < 20) rainScore = 100;
  else if (p < 40) rainScore = 65;
  else if (p < 60) rainScore = 20;
  else rainScore = 0;

  const base = tempScore * 0.5 + windScore * 0.3 + rainScore * 0.2;

  // ── Multipliers ─────────────────────────────────────────────────────────
  const rainMult = p < 20 ? 1.0 : p < 40 ? 0.90 : p < 60 ? 0.50 : 0.15;
  const windMult = w < 25 ? 1.0 : w < 40 ? 0.90 : w < 55 ? 0.65 : 0.35;
  const heatMult = t < 34 ? 1.0 : t < 37 ? 0.80 : 0.50;

  const multiplier = Math.min(rainMult, windMult, heatMult);
  const score = Math.round(base * multiplier);
  const level = levelFromScore(score, { safe: 65, caution: 35 });

  // Identify dominant negative factor for the summary
  const minMult = multiplier;
  let dominant: ComfortFactor = "good";
  if (minMult < 1.0) {
    if (rainMult === minMult && rainMult <= windMult && rainMult <= heatMult) dominant = "rain";
    else if (windMult === minMult && windMult <= heatMult) dominant = "wind";
    else if (heatMult === minMult) dominant = "heat";
  }
  if (dominant === "good" && t < 18) dominant = "cold";

  return {
    level,
    score,
    summary: buildComfortSummary(t, p, w, level, dominant),
    details: {
      temperatureC: t,
      windKph: w,
      precipitationPct: p,
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
  level: SafetyLevel,
  dominant: ComfortFactor
): string {
  if (level === "safe") {
    if (temp >= 25 && rain < 20 && wind < 20)
      return `${Math.round(temp)}°C, sunny and calm — perfect beach day.`;
    if (dominant === "cold")
      return `${Math.round(temp)}°C — mild but enjoyable with the right outfit.`;
    return `${Math.round(temp)}°C with a light breeze — great conditions.`;
  }

  if (level === "caution") {
    if (dominant === "rain")
      return `${Math.round(rain)}% chance of rain — beach day at risk, bring a backup plan.`;
    if (dominant === "wind")
      return `${Math.round(wind)} km/h wind — uncomfortable on the beach, expect sand and choppy conditions.`;
    if (dominant === "heat")
      return `${Math.round(temp)}°C — very hot, stay hydrated and seek shade midday.`;
    if (dominant === "cold")
      return `Only ${Math.round(temp)}°C — too cold for most beachgoers.`;
    return `${Math.round(temp)}°C with ${Math.round(wind)} km/h wind — OK but not ideal.`;
  }

  // danger
  if (dominant === "rain")
    return `${Math.round(rain)}% chance of rain — not a beach day.`;
  if (dominant === "wind")
    return `${Math.round(wind)} km/h wind — too windy to enjoy the beach.`;
  if (dominant === "heat")
    return `${Math.round(temp)}°C — dangerously hot. Avoid direct sun.`;
  if (dominant === "cold")
    return `${Math.round(temp)}°C — too cold for the beach.`;
  return `Poor conditions — rain and wind make this a bad beach day.`;
}
