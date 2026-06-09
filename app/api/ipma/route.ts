import { NextResponse } from "next/server";
import type { IPMAWarning } from "@/types";

const IPMA_URL =
  "https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json";

// Cache for 15 minutes server-side — next: { revalidate } only works here,
// never in client-side fetch calls.
export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const area = searchParams.get("area");

  if (!area) {
    return NextResponse.json(
      { error: "Missing area param" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(IPMA_URL, { next: { revalidate: 900 } });
    if (!res.ok) return NextResponse.json([]);

    const all: IPMAWarning[] = await res.json();
    const now = new Date();

    const active = all.filter(
      (w) =>
        w.idAreaAviso === area &&
        w.awarenessTypeName === "Agitação Marítima" &&
        w.awarenessLevelID !== "green" &&
        new Date(w.endTime) > now
    );

    return NextResponse.json(active);
  } catch {
    // Network error or IPMA API down — return empty rather than crashing
    return NextResponse.json([]);
  }
}
