import { Beach } from "@/types";

// Open-Meteo — free, no API key, CORS-enabled
const MARINE_BASE = "https://marine-api.open-meteo.com/v1/marine";
const WEATHER_BASE = "https://api.open-meteo.com/v1/forecast";

export interface RawDayData {
  date: string;
  // Marine
  waveHeightM: number;
  swellHeightM: number;
  wavePeriodS: number;
  // Weather
  temperatureC: number;
  windKph: number;
  windGustsKph: number;
  precipitationPct: number;
  uvIndex: number;
}

export async function fetchBeachData(beach: Beach): Promise<RawDayData[]> {
  const marineParams = [
    "wave_height_max",
    "swell_wave_height_max",
    "wave_period_max",
  ].join(",");

  const weatherParams = [
    "temperature_2m_max",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "precipitation_probability_max",
    "uv_index_max",
  ].join(",");

  const [marineRes, weatherRes] = await Promise.all([
    fetch(
      `${MARINE_BASE}?latitude=${beach.lat}&longitude=${beach.lon}&daily=${marineParams}&timezone=Europe%2FLisbon&forecast_days=6`
    ),
    fetch(
      `${WEATHER_BASE}?latitude=${beach.lat}&longitude=${beach.lon}&daily=${weatherParams}&timezone=Europe%2FLisbon&forecast_days=6`
    ),
  ]);

  if (!marineRes.ok || !weatherRes.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const [marine, weather] = await Promise.all([
    marineRes.json(),
    weatherRes.json(),
  ]);

  const dates: string[] = marine.daily.time;

  return dates.map((date, i) => ({
    date,
    waveHeightM: marine.daily.wave_height_max[i] ?? 0,
    swellHeightM: marine.daily.swell_wave_height_max[i] ?? 0,
    wavePeriodS: marine.daily.wave_period_max[i] ?? 0,
    temperatureC: weather.daily.temperature_2m_max[i] ?? 20,
    windKph: weather.daily.wind_speed_10m_max[i] ?? 0,
    windGustsKph: weather.daily.wind_gusts_10m_max[i] ?? 0,
    precipitationPct: weather.daily.precipitation_probability_max[i] ?? 0,
    uvIndex: weather.daily.uv_index_max[i] ?? 0,
  }));
}
