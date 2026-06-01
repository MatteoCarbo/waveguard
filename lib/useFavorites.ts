"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "waveguard_favorites";
export const MAX_FAVORITES = 10;

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Read from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const persist = useCallback((ids: string[]) => {
    setFavorites(ids);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {}
  }, []);

  const toggle = useCallback(
    (beachId: string) => {
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
    },
    []
  );

  const isFavorite = useCallback(
    (beachId: string) => favorites.includes(beachId),
    [favorites]
  );

  const isFull = favorites.length >= MAX_FAVORITES;

  return { favorites, toggle, isFavorite, isFull, hydrated };
}
