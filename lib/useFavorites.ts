"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "waveguard_favorites";
export const MAX_FAVORITES = 10;

function readFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  // Lazy initializer runs once on mount — reads localStorage without needing an effect
  const [favorites, setFavorites] = useState<string[]>(readFromStorage);

  const toggle = useCallback((beachId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(beachId)
        ? prev.filter((id) => id !== beachId)
        : prev.length < MAX_FAVORITES
        ? [...prev, beachId]
        : prev; // already full — silently ignore
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (beachId: string) => favorites.includes(beachId),
    [favorites]
  );

  const isFull = favorites.length >= MAX_FAVORITES;

  // hydrated is always true here: lazy initializer runs only on client
  return { favorites, toggle, isFavorite, isFull, hydrated: true };
}
