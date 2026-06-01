"use client";

import { SafetyLevel } from "@/types";
import { motion } from "framer-motion";

interface Props {
  level: SafetyLevel;
  size?: "sm" | "md" | "lg";
}

const CONFIG: Record<SafetyLevel, { emoji: string; label: string; bg: string; text: string; ring: string }> = {
  safe: {
    emoji: "🟢",
    label: "Safe",
    bg: "bg-emerald-500",
    text: "text-white",
    ring: "ring-emerald-300",
  },
  caution: {
    emoji: "🟡",
    label: "Caution",
    bg: "bg-amber-400",
    text: "text-amber-950",
    ring: "ring-amber-200",
  },
  danger: {
    emoji: "🔴",
    label: "Danger",
    bg: "bg-rose-600",
    text: "text-white",
    ring: "ring-rose-300",
  },
};

const SIZE = {
  sm: "px-2 py-0.5 text-xs rounded-full",
  md: "px-3 py-1 text-sm rounded-full font-semibold",
  lg: "px-5 py-2 text-base rounded-full font-bold",
};

export default function StatusBadge({ level, size = "md" }: Props) {
  const c = CONFIG[level];
  return (
    <motion.span
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 ${c.bg} ${c.text} ${SIZE[size]} ring-2 ${c.ring} select-none`}
    >
      <span>{c.emoji}</span>
      <span>{c.label}</span>
    </motion.span>
  );
}
