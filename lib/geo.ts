// Geometry helpers shared by the hazard map components.

const M_PER_DEG_LAT = 111320;

/**
 * Buffers a polyline (`path`) by `widthM`/2 on each side, converting metres ↔
 * degrees, producing a thin closed polygon ring (a corridor band) instead of a
 * fat circle. Works for 2+ point paths.
 */
export function corridorToPolygon(
  path: [number, number][],
  widthM: number
): [number, number][] {
  const half = widthM / 2;
  const left: [number, number][] = [];
  const right: [number, number][] = [];

  for (let i = 0; i < path.length; i++) {
    const [lat, lon] = path[i];
    const prev = path[i - 1] ?? path[i];
    const next = path[i + 1] ?? path[i];
    const mPerDegLon = M_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180);

    // Segment direction in metres (east, north)
    const dxE = (next[1] - prev[1]) * mPerDegLon;
    const dyN = (next[0] - prev[0]) * M_PER_DEG_LAT;
    const len = Math.hypot(dxE, dyN) || 1;

    // Perpendicular (normal) unit vector: (-dyN, dxE) / len
    const nE = -dyN / len;
    const nN = dxE / len;

    const dLon = (nE * half) / mPerDegLon;
    const dLat = (nN * half) / M_PER_DEG_LAT;

    left.push([lat + dLat, lon + dLon]);
    right.push([lat - dLat, lon - dLon]);
  }

  return [...left, ...right.reverse()];
}
