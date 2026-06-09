"use client";

import dynamic from "next/dynamic";

// Dev-only preview: renders ALL Caparica hazard zones over OSM on one screen,
// with the real groyne tips as reference dots, so zone placement can be verified
// visually instead of guessed. Not linked from the main app.
const HazardPreviewMap = dynamic(() => import("@/components/HazardPreviewMap"), {
  ssr: false,
  loading: () => <div className="h-[88vh] w-full bg-slate-200 animate-pulse" />,
});

export default function HazardPreviewPage() {
  return (
    <main className="min-h-dvh w-full bg-slate-50 p-3 flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="font-bold text-slate-800">Caparica Hazard Preview</h1>
        <span className="text-xs text-slate-500">
          ⚫ real OSM groyne tip · 🔵 beach anchor · coloured = hazard zone (per-beach maps, all shown)
        </span>
      </div>
      <HazardPreviewMap />
    </main>
  );
}
