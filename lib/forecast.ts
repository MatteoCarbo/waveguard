import { Beach, BeachForecast, DayForecast } from "@/types";
import { fetchBeachData } from "./api";
import { scoreSafety, scoreComfort } from "./scoring";

export async function getBeachForecast(beach: Beach): Promise<BeachForecast> {
  const rawData = await fetchBeachData(beach);

  const forecasts: DayForecast[] = rawData.map((day) => ({
    date: day.date,
    comfort: scoreComfort(day),
    safety: scoreSafety(day),
  }));

  return { beach, forecasts };
}
