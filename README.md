# 🌊 WaveGuard

**Know before you go.** WaveGuard tells tourists and casual swimmers whether a Portugal beach is safe to visit today — in plain English, at a glance.

![WaveGuard screenshot](public/screenshot.png)

## What it does

For any of 30 Portugal beaches, WaveGuard shows two independent scores:

| Score | What it answers |
|-------|----------------|
| 🟢🟡🔴 **Safety** | Is it dangerous to swim? (waves, swell, wind) |
| 🌞 **Comfort** | Is it a nice beach day? (temperature, rain, wind) |

A day can be sunny and beautiful but dangerous for swimming — or grey and cold but flat-calm water. The two scores are always shown separately.

Includes a **6-day forecast** so you can plan ahead.

## Tech stack

| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| Weather API | [Open-Meteo](https://open-meteo.com) — free, no key needed |
| Deployment | [Vercel](https://vercel.com) |

## Running locally

```bash
git clone https://github.com/MatteoCarbo/waveguard.git
cd waveguard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No API keys, no `.env` file, no backend. It just works.

## How the safety score works

Safety is calculated from Open-Meteo's free Marine API:

- **Wave height** (70% weight): < 0.5m → safe · 0.5–1m → caution · > 1.5m → danger
- **Wind speed** (30% weight): < 30 km/h → fine · > 50 km/h → danger

The comfort score uses temperature (50%), rain probability (30%), and wind (20%).

Both scores are computed client-side in [`lib/scoring.ts`](lib/scoring.ts) — no server needed.

## Adding beaches

Edit [`lib/beaches.ts`](lib/beaches.ts). Each beach needs a name, region, latitude, longitude, and a short description. Open-Meteo covers any coordinate worldwide.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MatteoCarbo/waveguard)

## License

MIT — see [LICENSE](LICENSE).
