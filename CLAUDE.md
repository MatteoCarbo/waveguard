# WaveGuard — Guida per Claude Code

## ⚡ Inizio sessione — leggi subito

All'avvio di ogni sessione, leggi `.claude/handoff.md` se esiste.
Contiene lo stato aggiornato del progetto, le decisioni già prese e l'ultimo punto di lavoro.
Non chiedere conferma — leggilo direttamente e riprendi da lì.

---

## Cos'è questo progetto
App web open-source, mobile-first, per la sicurezza delle spiagge portoghesi.
Mostra due score indipendenti — **Safety** (nuoto) e **Comfort** (giornata in spiaggia) — come badge 🟢🟡🔴 con riassunti in inglese semplice.
Dati meteo in tempo reale da Open-Meteo (API gratuita, no chiave, CORS-friendly).

**Owner**: Matteo Carbone (MatteoCarbo su GitHub)
**Repository**: https://github.com/MatteoCarbo/waveguard
**Live**: https://waveguard-lilac.vercel.app

---

## Stack — FISSO, non cambiare senza motivo

| Layer | Scelta | Note |
|---|---|---|
| Framework | **Next.js 16** (App Router) | `app/` directory, no `pages/` |
| Linguaggio | **TypeScript** strict | Tutti i file `.ts` / `.tsx` |
| Stile | **Tailwind CSS v4** | Import via `@import "tailwindcss"` in globals.css, NO config file |
| Animazioni | **Framer Motion 12** | Solo dove serve (drawer, transizioni hero) |
| Data fetching | **TanStack Query v5** | `staleTime: 30 min`, queryKey `["forecast", beach.id]` |
| Dati meteo | **Open-Meteo** | Marine API + Weather API, nessuna API key |
| Persistenza | **localStorage** | Solo preferiti, max 10 spiagge |
| Deploy | **Vercel** | Auto-deploy da push su `main` |
| Licenza | **MIT** | |

**Regola d'oro**: scelte smart, mai sperimentali.

---

## Struttura file

```
app/
  layout.tsx        # Font Inter, viewport cover, Providers wrapper
  page.tsx          # Entry point principale — tutta la logica di pagina
  globals.css       # @import tailwindcss + utility classes (.pt-safe, .scrollbar-hide)

components/
  BeachSelector.tsx    # Dropdown/search spiagge
  DayStrip.tsx         # Strip 6 giorni con selezione
  EmergencyCard.tsx    # Numeri emergenza (112, 1414) — <a href="tel:...">
  FavoriteBeachRow.tsx # Riga compatta nel drawer con dot safety live
  Providers.tsx        # TanStack QueryClientProvider
  ScoreCard.tsx        # Card dettaglio Safety o Comfort
  SideDrawer.tsx       # Menu laterale con preferiti (stile Epic surf app)
  StatusBadge.tsx      # Badge 🟢🟡🔴
  UVCard.tsx           # Indice UV con scala e consigli SPF

lib/
  api.ts           # Chiamate Open-Meteo (marine + weather)
  beaches.ts       # 300 spiagge portoghesi statiche + findNearestBeach()
  forecast.ts      # getBeachForecast(beach) → BeachForecast
  scoring.ts       # Algoritmo Safety (wave 70% + wind 30%) e Comfort
  useFavorites.ts  # Hook localStorage, max 10, con hydration fix

types/
  index.ts         # Beach, SafetyScore, ComfortScore, DayForecast, BeachForecast
```

---

## API Open-Meteo

```
Marine:  https://marine-api.open-meteo.com/v1/marine
         params: wave_height_max, swell_wave_height_max, wave_period_max, sea_surface_temperature_max

Weather: https://api.open-meteo.com/v1/forecast
         params: temperature_2m_max, wind_speed_10m_max, wind_gusts_10m_max,
                 precipitation_probability_max, uv_index_max

Entrambi: forecast_days=6, timezone=Europe/Lisbon, daily=...
```

Nessuna API key richiesta. Aggiornamento automatico ogni 30 minuti via TanStack Query.

---

## Algoritmo scoring (lib/scoring.ts)

**Safety** (nuoto):
- Onde: peso 70% — <0.5m safe, 0.5-1.5m caution, >1.5m danger
- Vento: peso 30% — <30 km/h safe, 30-50 km/h caution, >50 km/h danger

**Comfort** (giornata):
- Temperatura: peso 50%
- Pioggia: peso 30%
- Vento: peso 20%

Score 0-100 → livello: safe / caution / danger

---

## Comportamenti UI importanti

- **Default beach**: `praia-da-arrábida`
- **iPhone safe area**: `pt-safe` = `max(1.5rem, env(safe-area-inset-top))` nel header
- **Body bg**: `#0284c7` (sky-600) — evita flash bianco su iOS
- **Geolocalizzazione**: funziona solo su HTTPS (non localhost). Usa `findNearestBeach()` con distanza euclidea su lat/lon.
- **Preferiti**: max 10, persistiti in localStorage con chiave `waveguard_favorites`. Hook `useFavorites` gestisce hydration SSR.
- **SideDrawer**: overlay scuro + pannello navy (`#0c1a2e → #0a1628`), spring animation (damping:28, stiffness:280), width 78%/max 340px.
- **TanStack cache**: `FavoriteBeachRow` usa stesso `queryKey: ["forecast", beach.id]` → riutilizza cache già caricata dalla pagina principale.

---

## Vincoli GitHub

⚠️ Lavorare **solo** sul repository di Matteo Carbone (`MatteoCarbo/waveguard`).
Mai toccare repo di altri utenti o organizzazioni.

---

## Comandi utili

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Build produzione
npm run lint     # ESLint
git push         # Triggera auto-deploy su Vercel
```
