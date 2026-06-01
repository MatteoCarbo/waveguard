"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, RefreshCw } from "lucide-react";

import { Beach } from "@/types";
import { BEACHES } from "@/lib/beaches";
import { getBeachForecast } from "@/lib/forecast";
import BeachSelector from "@/components/BeachSelector";
import ScoreCard from "@/components/ScoreCard";
import DayStrip from "@/components/DayStrip";
import StatusBadge from "@/components/StatusBadge";

// Default beach: Praia da Arrábida — beautiful and well-known
const DEFAULT_BEACH = BEACHES.find((b) => b.id === "praia-da-arrábida") ?? BEACHES[0];

export default function Home() {
  const [beach, setBeach] = useState<Beach>(DEFAULT_BEACH);
  const [dayIndex, setDayIndex] = useState(0);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["forecast", beach.id],
    queryFn: () => getBeachForecast(beach),
  });

  const today = data?.forecasts[dayIndex];

  return (
    <main className="min-h-dvh bg-gradient-to-b from-sky-600 via-sky-500 to-sky-400 flex flex-col">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Waves className="w-6 h-6 text-white" strokeWidth={2.5} />
            <span className="text-white font-black text-xl tracking-tight">WaveGuard</span>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw
              className={`w-4 h-4 text-white ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
        </div>
        <BeachSelector current={beach} onSelect={(b) => { setBeach(b); setDayIndex(0); }} />
      </header>

      {/* Content */}
      <div className="flex-1 bg-slate-50 rounded-t-3xl px-4 pt-6 pb-8 flex flex-col gap-5">
        {isLoading && <LoadingSkeleton />}

        {isError && (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center py-16">
            <span className="text-4xl">🌧️</span>
            <p className="font-semibold text-slate-700">Couldn&apos;t load forecast</p>
            <p className="text-sm text-slate-400">Check your connection and try again.</p>
            <button
              onClick={() => refetch()}
              className="mt-2 px-5 py-2 bg-sky-600 text-white rounded-full text-sm font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {data && today && (
          <>
            {/* Day strip */}
            <DayStrip
              forecasts={data.forecasts}
              selectedIndex={dayIndex}
              onSelect={setDayIndex}
            />

            {/* Hero status */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${beach.id}-${dayIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                {/* Overall hero card */}
                <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {dayIndex === 0 ? "Today" : dayIndex === 1 ? "Tomorrow" : formatDate(data.forecasts[dayIndex].date)}
                    {" · "}{beach.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <StatusBadge level={today.safety.level} size="lg" />
                    <span className="text-slate-400 text-sm">to swim</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {today.safety.summary}
                  </p>
                </div>

                {/* Two score cards */}
                <ScoreCard type="safety" score={today.safety} />
                <ScoreCard type="comfort" score={today.comfort} />

                {/* Beach description */}
                <p className="text-xs text-slate-400 text-center px-2">
                  📍 {beach.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </main>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-16 h-12 bg-slate-200 rounded-xl" />
        ))}
      </div>
      <div className="bg-slate-200 h-28 rounded-2xl" />
      <div className="bg-slate-200 h-32 rounded-2xl" />
      <div className="bg-slate-200 h-32 rounded-2xl" />
    </div>
  );
}
