"use client";

import { Shield, ShieldAlert, ShieldOff } from "lucide-react";
import { motion } from "framer-motion";
import { LifeguardInfo } from "@/types";
import { getLifeguardStatus } from "@/lib/beaches";

interface Props {
  lifeguard: LifeguardInfo;
  date: string; // ISO "YYYY-MM-DD"
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fmtMmdd(mmdd: string): string {
  const [m, d] = mmdd.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

export default function LifeguardCard({ lifeguard, date }: Props) {
  const status = getLifeguardStatus(lifeguard, date);

  if (status === "active") {
    const seasonLabel =
      lifeguard.type === "seasonal" && lifeguard.season
        ? `${fmtMmdd(lifeguard.season.from)} – ${fmtMmdd(lifeguard.season.to)}`
        : "Year-round";

    return (
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex gap-3 items-start"
      >
        <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
            Lifeguard on duty
          </p>
          <p className="text-xs text-emerald-700 mt-0.5 opacity-80">Season: {seasonLabel}</p>
        </div>
      </motion.div>
    );
  }

  if (status === "inactive") {
    const season = lifeguard.season!;
    return (
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3 items-start"
      >
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">
            Beach unmonitored
          </p>
          <p className="text-xs text-amber-700 mt-0.5 opacity-80">
            Lifeguard service runs {fmtMmdd(season.from)} – {fmtMmdd(season.to)} only
          </p>
        </div>
      </motion.div>
    );
  }

  if (status === "none") {
    return (
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex gap-3 items-start"
      >
        <ShieldOff className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-rose-700 uppercase tracking-wide">
            Unmonitored beach
          </p>
          <p className="text-xs text-rose-700 mt-0.5 opacity-80">
            This beach has no lifeguard service — swim with extra caution
          </p>
        </div>
      </motion.div>
    );
  }

  return null;
}
