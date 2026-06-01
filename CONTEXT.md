# CONTEXT.md — Stato corrente del progetto

> Aggiorna questo file a fine di ogni sessione di lavoro.
> Ultima sessione: 2026-06-01

---

## Stato MVP

✅ **Completato e live** → https://waveguard-lilac.vercel.app

### Feature implementate
- [x] 300 spiagge portoghesi (Algarve, Alentejo, Setúbal, Lisboa, Oeste, Centro, Norte)
- [x] Score Safety (nuoto) con badge 🟢🟡🔴
- [x] Score Comfort (giornata spiaggia) con badge 🟢🟡🔴
- [x] Previsioni 6 giorni (day strip cliccabile)
- [x] Temperatura acqua in hero card
- [x] Card dettaglio Safety: onde, swell, vento, acqua
- [x] Card dettaglio Comfort: temp, vento, pioggia, UV
- [x] UV card con scala 0-11+, consigli SPF
- [x] Box pericoli locali (hazards — solo se la spiaggia li ha)
- [x] Emergency card con numeri 112 e 1414 (tap-to-call)
- [x] "Use my location" — geolocalizzazione trova spiaggia più vicina (HTTPS only)
- [x] Preferiti con ❤️ Save — max 10 spiagge, persistiti in localStorage
- [x] Side drawer (stile Epic surf app) con lista preferiti live
- [x] Layout desktop centrato (max-w-md)
- [x] iPhone safe area (Dynamic Island / notch)
- [x] Disclaimer sicurezza
- [x] Open source MIT su GitHub
- [x] Deploy automatico su Vercel (push → main)

---

## Feature in backlog ("Soon" nel drawer)

| Feature | Priorità | Note |
|---|---|---|
| Alerts | Media | Notifiche meteo avverse per le spiagge salvate |
| Settings | Bassa | Unità (°C/°F, km/h/knots), lingua |
| About | Bassa | Info app, crediti Open-Meteo, link GitHub |
| "Understand the data" | Bassa | Spiega come funziona l'algoritmo scoring |

---

## Ultimi commit

```
c02ed7a feat: side drawer menu with favourites (inspired by Epic surf app)
eccd872 feat: expand beach database to 300 beaches
90ce72a feat: expand beach database from 30 to 101 beaches
923cde4 feat: UV card, emergency numbers, local hazards, water temp, fix duplicates
82c508d feat: desktop layout, safe area, geolocation, disclaimer
ee1b3d9 feat: initial WaveGuard MVP
```

---

## Problemi noti / workaround attivi

- **CLAUDE.md / AGENTS.md nel repo pubblico**: il sistema ha bloccato la loro rimozione (protezione auto-modifica). Matteo deve rimuoverli manualmente:
  ```bash
  git rm CLAUDE.md AGENTS.md
  echo -e "AGENTS.md\nCLAUDE.md" >> .gitignore
  git add .gitignore
  git commit -m "chore: remove internal AI config files from public repo"
  git push
  ```
  Oppure tenerli (non è bloccante).

- **Geolocalizzazione su localhost**: il browser blocca la geolocation su HTTP. Funziona correttamente su https://waveguard-lilac.vercel.app

---

## Ambiente di sviluppo

- **macOS** (Apple Silicon, /opt/homebrew)
- **Node.js** gestito con npm
- **gh CLI** installato via Homebrew (`eval "$(/opt/homebrew/bin/brew shellenv)"` se non trovato)
- **Vercel**: progetto connesso a GitHub, auto-deploy su `main`
  - Dashboard: https://vercel.com/matteocarbos-projects/waveguard
- **GitHub**: MatteoCarbo/waveguard (repository pubblico)

---

## Come riprendere il lavoro

1. `cd /Users/matteocarbone/Documents/Claude/Code/waveguard`
2. `npm run dev` per sviluppo locale (porta 3000)
3. Leggi `CLAUDE.md` per architettura e vincoli
4. Leggi questo file per lo stato corrente
5. Push su `main` → Vercel deploya automaticamente
