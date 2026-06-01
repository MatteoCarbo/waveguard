"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Beach } from "@/types";
import { getBeachForecast } from "@/lib/forecast";
import { Droplets, X } from "lucide-react";

interface Props {
  beach: Beach;
  onSelect: (beach: Beach) => void;
  onRemove: (beachId: string) => void;
  index: number;
}

const LEVEL_COLORS = {
  safe: "bg-emerald-500",
  caution: "bg-amber-400",
  danger: "bg-rose-500",
};

const LEVEL_LABELS = {
  safe: "Safe",
  caution: "Caution",
  danger: "Danger",
};

export default function FavoriteBeachRow({ beach, onSelect, onRemove, index }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["forecast", beach.id],
    queryFn: () => getBeachForecast(beach),
    staleTime: 1000 * 60 * 30,
  });

  const today = data?.forecasts[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer group"
      onClick={() => onSelect(beach)}
    >
      {/* Status dot */}
      <div className="flex-shrink-0">
        {isLoading || !today ? (
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />
        ) : (
          <div className={`w-2.5 h-2.5 rounded-full ${LEVEL_COLORS[today.safety.level]}`} />
        )}
      </div>

      {/* Name + details */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{beach.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {isLoading || !today ? (
            <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
          ) : (
            <>
              <span className="text-xs text-white/40">{LEVEL_LABELS[today.safety.level]}</span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/40 flex items-center gap-0.5">
                <Droplets className="w-2.5 h-2.5" />
                {Math.round(today.safety.details.waterTempC)}°C
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/40">{beach.region}</span>
            </>
          )}
        </div>
      </div>

      {/* Remove button — visible on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(beach.id);
        }}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-white/10 transition-all"
        aria-label={`Remove ${beach.name}`}
      >
        <X className="w-3.5 h-3.5 text-white/40" />
      </button>
    </motion.div>
  );
}
