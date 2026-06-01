"use client";

import { useState } from "react";
import { Beach } from "@/types";
import { BEACHES } from "@/lib/beaches";
import { Search, MapPin } from "lucide-react";

interface Props {
  current: Beach;
  onSelect: (beach: Beach) => void;
}

// Group beaches by region for display
const REGIONS = Array.from(new Set(BEACHES.map((b) => b.region)));

export default function BeachSelector({ current, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = BEACHES.filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-2.5 transition-colors w-full"
      >
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="font-semibold truncate">{current.name}</span>
        <span className="ml-auto text-white/60 text-xs flex-shrink-0">{current.region}</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[70vh] flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-slate-100 sticky top-0 bg-white">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search beach or region…"
                className="bg-transparent flex-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {query
              ? filtered.map((b) => (
                  <BeachOption
                    key={b.id}
                    beach={b}
                    selected={b.id === current.id}
                    onSelect={() => { onSelect(b); setOpen(false); setQuery(""); }}
                  />
                ))
              : REGIONS.map((region) => (
                  <div key={region}>
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">
                      {region}
                    </div>
                    {BEACHES.filter((b) => b.region === region).map((b) => (
                      <BeachOption
                        key={b.id}
                        beach={b}
                        selected={b.id === current.id}
                        onSelect={() => { onSelect(b); setOpen(false); setQuery(""); }}
                      />
                    ))}
                  </div>
                ))}
            {query && filtered.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">No beaches found</p>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setOpen(false); setQuery(""); }}
        />
      )}
    </div>
  );
}

function BeachOption({
  beach,
  selected,
  onSelect,
}: {
  beach: Beach;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-sky-50 ${
        selected ? "bg-sky-50" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${selected ? "text-sky-700" : "text-slate-800"}`}>
          {beach.name}
        </p>
        <p className="text-xs text-slate-400 truncate">{beach.description}</p>
      </div>
      {selected && <div className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />}
    </button>
  );
}
