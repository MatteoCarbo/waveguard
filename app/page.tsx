"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, RefreshCw, Menu, Heart, LocateFixed, AlertTriangle } from "lucide-react";

import { Beach } from "@/types";
import { BEACHES, findNearestBeach } from "@/lib/beaches";
import { getBeachForecast } from "@/lib/forecast";
import { fetchIPMAWarnings } from "@/lib/api";
import { useFavorites } from "@/lib/useFavorites";
import BeachSelector from "@/components/BeachSelector";
import ScoreCard from "@/components/ScoreCard";
import DayStrip from "@/components/DayStrip";
import StatusBadge from "@/components/StatusBadge";
import UVCard from "@/components/UVCard";
import EmergencyCard from "@/components/EmergencyCard";
import SideDrawer from "@/components/SideDrawer";
import LifeguardCard from "@/components/LifeguardCard";
import HazardCard from "@/components/HazardCard";

// Leaflet touches `window` — must be client-only, no SSR
const HazardMap = dynamic(() => import("@/components/HazardMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-200 rounded-2xl animate-pulse" />
  ),
});

const LAST_BEACH_KEY = "waveguard_last_beach";
const FAVORITES_KEY  = "waveguard_favorites";

function getInitialBeach(): Beach {
  if (typeof window !== "undefined") {
    try {
      // 1. Last visited beach
      const lastId = localStorage.getItem(LAST_BEACH_KEY);
      if (lastId) {
        const found = BEACHES.find((b) => b.id === lastId);
        if (found) return found;
      }
    } catch {}

    try {
      // 2. First saved favourite
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as string[];
        const found = BEACHES.find((b) => b.id === ids[0]);
        if (found) return found;
      }
    } catch {}
  }

  // 3. Default: Caparica Sul
  return BEACHES.find((b) => b.id === "praia-de-caparica-sul") ?? BEACHES[0];
}

export default function Home() {
  const [beach, setBeach] = useState<Beach>(getInitialBeach);

  // Persist last visited beach so next session opens here
  useEffect(() => {
    try { localStorage.setItem(LAST_BEACH_KEY, beach.id); } catch {}
  }, [beach]);
  const [dayIndex, setDayIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(false);
  const { favorites, toggle, isFavorite, isFull } = useFavorites();

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    setGeoError(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestBeach(pos.coords.latitude, pos.coords.longitude);
        setBeach(nearest);
        setDayIndex(0);
        setGeoLoading(false);
      },
      () => {
        setGeoLoading(false);
        setGeoError(true);
        setTimeout(() => setGeoError(false), 3000);
      },
      { timeout: 8000 }
    );
  };

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["forecast", beach.id],
    queryFn: () => getBeachForecast(beach),
  });

  // IPMA maritime warnings — only fetched for beaches with an area code (Caparica)
  const { data: ipmaWarnings } = useQuery({
    queryKey: ["ipma-warnings", beach.ipmaAreaAviso],
    queryFn: () => fetchIPMAWarnings(beach.ipmaAreaAviso!),
    staleTime: 15 * 60 * 1000, // 15 minutes — matches server cache
    enabled: !!beach.ipmaAreaAviso,
  });

  const today = data?.forecasts[dayIndex];

  const saved = isFavorite(beach.id);

  return (
    <>
      {/* Side drawer */}
      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        favoriteIds={favorites}
        onSelectBeach={(b) => { setBeach(b); setDayIndex(0); }}
        onRemoveFavorite={toggle}
      />

      {/* max-w-md: centres the app on desktop, fills screen on mobile */}
      <main className="min-h-dvh w-full max-w-md mx-auto bg-gradient-to-b from-sky-600 via-sky-500 to-sky-400 flex flex-col">
        {/* Header — pt-safe handles iPhone notch / Dynamic Island */}
        <header className="px-4 pt-safe pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-white" strokeWidth={2.5} />
              <span className="text-white font-black text-lg tracking-tight">WaveGuard</span>
            </div>

            {/* Refresh */}
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className={`w-4 h-4 text-white ${isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>

          <BeachSelector current={beach} onSelect={(b) => { setBeach(b); setDayIndex(0); }} />

          {/* Geo + heart */}
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={handleLocate}
              disabled={geoLoading}
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium transition-colors disabled:opacity-50"
            >
              <LocateFixed className={`w-3.5 h-3.5 ${geoLoading ? "animate-spin" : ""}`} />
              {geoLoading ? "Finding nearest beach…" : geoError ? "Location blocked — works on HTTPS" : "Use my location"}
            </button>

            {/* Favourite toggle */}
            <button
              onClick={() => toggle(beach.id)}
              disabled={!saved && isFull}
              className="flex items-center gap-1 text-xs transition-colors disabled:opacity-30"
              aria-label={saved ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart
                className={`w-4 h-4 transition-all ${saved ? "fill-white text-white scale-110" : "text-white/60"}`}
              />
              <span className={saved ? "text-white" : "text-white/60"}>
                {saved ? "Saved" : isFull ? "Full" : "Save"}
              </span>
            </button>
          </div>
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
                {/* Hero card — at-a-glance overview, no repeated text */}
                <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {dayIndex === 0 ? "Today" : dayIndex === 1 ? "Tomorrow" : formatDate(data.forecasts[dayIndex].date)}
                    {" · "}{beach.name}
                  </p>
                  {/* Two badges side by side */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide">Swimming</span>
                      <StatusBadge level={today.safety.level} size="lg" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide">Beach day</span>
                      <StatusBadge level={today.comfort.level} size="lg" />
                    </div>
                    {/* Water temperature — hidden if API returns no data */}
                    {Number.isFinite(today.safety.details.waterTempC) && (
                      <div className="flex flex-col gap-1 ml-auto">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Water</span>
                        <span className="text-lg font-black text-slate-700">
                          {Math.round(today.safety.details.waterTempC)}°C
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Score cards */}
                <ScoreCard type="safety" score={today.safety} />
                <ScoreCard type="comfort" score={today.comfort} />

                {/* Structured hazards — shown only for beaches with hazard data */}
                {(beach.structuredHazards?.length ?? 0) > 0 && (
                  <>
                    <HazardCard
                      hazards={beach.structuredHazards!}
                      waveHeight={today.safety.details.waveHeightM}
                      windSpeed={today.safety.details.windKph}
                      ipmaWarning={
                        ipmaWarnings?.find((w) => w.awarenessLevelID !== "green") ??
                        null
                      }
                    />
                    <HazardMap
                      beachName={beach.name}
                      lat={beach.lat}
                      lon={beach.lon}
                      hazards={beach.structuredHazards!}
                      waveHeight={today.safety.details.waveHeightM}
                      windSpeed={today.safety.details.windKph}
                    />
                  </>
                )}

                {/* UV card — hidden if API returns no data */}
                {Number.isFinite(today.comfort.details.uvIndex) && (
                  <UVCard uvIndex={today.comfort.details.uvIndex} />
                )}

                {/* Lifeguard status */}
                {beach.lifeguard && (
                  <LifeguardCard lifeguard={beach.lifeguard} date={data.forecasts[dayIndex].date} />
                )}

                {/* Local hazards — only shown if beach has specific hazards */}
                {beach.hazards && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                        Local Hazards
                      </p>
                      <p className="text-xs text-amber-800 leading-relaxed">{beach.hazards}</p>
                    </div>
                  </div>
                )}

                {/* Emergency numbers */}
                <EmergencyCard />

                {/* Beach description */}
                <p className="text-xs text-slate-400 text-center px-2">
                  📍 {beach.description}
                </p>

                {/* Disclaimer */}
                <p className="text-[11px] text-slate-300 text-center leading-relaxed px-4 pt-2">
                  ⚠️ For informational use only. Always follow local beach flag warnings and lifeguard instructions.
                </p>
              </motion.div>
            </AnimatePresence>
          </>
        )}
        </div>
      </main>
    </>
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
