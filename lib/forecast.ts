import { Beach, BeachForecast, DayForecast } from "@/types";
import { fetchBeachData } from "./api";
import { scoreSafety, scoreComfort, applyHazardPenalty } from "./scoring";

export async function getBeachForecast(beach: Beach): Promise<BeachForecast> {
  const rawData = await fetchBeachData(beach);

  const forecasts: DayForecast[] = rawData.map((day) => {
    const baseSafety = scoreSafety(day);
    const safety =
      beach.structuredHazards?.length
        ? applyHazardPenalty(
            baseSafety,
            beach.structuredHazards,
            day.waveHeightM,
            day.windKph
          )
        : baseSafety;

    return {
      date: day.date,
      comfort: scoreComfort(day),
      safety,
    };
  });

  return { beach, forecasts };
}
