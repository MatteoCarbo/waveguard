import { Beach, LifeguardInfo } from "@/types";
import { CAPARICA_HAZARDS } from "./hazards";

// ── Lifeguard service data ────────────────────────────────────────────────────
// Sources: Portugal bathing season legislation, municipal announcements, APA data.
// Only beaches with confirmed data are listed. Omitted = unknown (not shown in UI).

const yr: LifeguardInfo = { type: "year-round" };
const none: LifeguardInfo = { type: "none" };
const s515 = (to = "10-15"): LifeguardInfo => ({ type: "seasonal", season: { from: "05-15", to } });
const s501 = (to = "10-15"): LifeguardInfo => ({ type: "seasonal", season: { from: "05-01", to } });
const s601 = (to = "09-30"): LifeguardInfo => ({ type: "seasonal", season: { from: "06-01", to } });
const s701: LifeguardInfo = { type: "seasonal", season: { from: "07-01", to: "08-31" } };

const LIFEGUARD: Record<string, LifeguardInfo> = {
  // Year-round — Albufeira is the only Portuguese municipality with year-round coverage
  "praia-dos-pescadores":   yr,
  "praia-do-peneco":        yr,
  "praia-de-albufeira":     yr,

  // Algarve — May 15 – Oct 15 (Algarve regional season)
  "praia-de-monte-gordo":         s515(),
  "praia-verde":                  s515(),
  "praia-de-manta-rota":          s515(),
  "praia-do-barril":              s515(),
  "praia-da-ilha-de-tavira":      s515(),
  "praia-de-fuzeta-ilha-armona":  s515(),
  "praia-de-fuzeta":              s515(),
  "praia-de-faro":                s515(),
  "praia-da-quinta-do-lago":      s515(),
  "praia-do-garrao":              s515(),
  "praia-das-dunas-douradas":     s515(),
  "praia-de-vale-do-lobo":        s515(),
  "praia-de-quarteira":           s515(),
  "praia-de-vilamoura":           s515(),
  "praia-da-falesia":             s515(),
  "praia-da-rocha-baixinha":      s515(),
  "praia-de-olhos-de-agua":       s515(),
  "praia-da-oura":                s515(),
  "praia-de-gale":                s515(),
  "praia-dos-salgados":           s515(),
  "praia-de-armacao":             s515(),
  "praia-de-nossa-senhora-da-rocha": s515(),
  "praia-da-marinha":             s515(),
  "praia-de-vale-centianes":      s515(),
  "praia-de-alfanzina":           s515(),
  "praia-dos-caneiros":           s515(),
  "praia-do-carvoeiro":           s515(),
  "praia-do-pintadinho":          s515(),
  "praia-de-ferragudo":           s515(),
  "praia-grande-ferragudo":       s515(),
  "praia-da-rocha":               s515(),
  "praia-do-vau":                 s515(),
  "praia-dos-tres-irmaos":        s515(),
  "praia-de-alvor":               s515(),
  "praia-do-alemao":              s515(),
  "praia-de-meia-praia":          s515(),
  "praia-de-porto-de-mos":        s515(),
  "praia-dona-ana":               s515(),
  "praia-do-pinhao":              s515(),
  "praia-de-luz":                 s515(),
  "praia-de-burgau":              s515(),
  "praia-de-salema":              s515(),
  "praia-da-mareta":              s515(),
  "praia-do-martinhal":           s515(),
  "praia-de-sao-rafael":          s515(),
  "praia-do-castelo":             s515(),
  "praia-do-almargem":            s515(),
  "praia-do-alemao-tavira":       s515(),
  "praia-de-pedras-d-el-rei":     s515(),
  "praia-de-meia-praia-tavira":   s515(),
  "praia-de-santa-luzia":         s515(),
  "praia-nova-portimao":          s515(),
  "praia-de-sao-joao-lagos":      s515(),
  "praia-de-cabanas-velhas":      s515(),

  // Cascais / Estoril / Oeiras — May 1 – Oct 15 (longest season in Portugal)
  "praia-de-carcavelos":            s501(),
  "praia-de-sao-pedro-do-estoril":  s501(),
  "praia-do-tamariz":               s501(),
  "praia-de-estoril":               s501(),
  "praia-de-azarujinha":            s501(),
  "praia-da-rainha":                s501(),
  "praia-de-cascais":               s501(),
  "praia-de-cascais-ribeira":       s501(),
  "praia-da-parede":                s501(),
  "praia-de-santo-amaro-oeiras":    s501(),
  "praia-de-sao-pedro-estoril-norte": s501(),

  // Sesimbra — Jun 6 – Sep 14 (confirmed 2025 municipal dates)
  "praia-de-sesimbra":     { type: "seasonal", season: { from: "06-06", to: "09-14" } },
  "praia-do-ouro-sesimbra": { type: "seasonal", season: { from: "06-06", to: "09-14" } },

  // General Portugal — Jun 1 – Sep 30 (standard national season)
  // Setúbal / Arrábida
  "praia-de-setubal":               s601(),
  "praia-da-figueirinha":           s601(),
  "praia-de-galapos":               s601(),
  "praia-do-portinho-da-arrabida":  s601(),
  "praia-de-lagoa-de-albufeira":    s601(),
  "praia-de-santa-maria-setubal":   s601(),
  // Costa da Caparica — generic sections
  "praia-da-cova-do-vapor":         s601(),
  "praia-de-caparica-norte":        s601(),
  "praia-de-caparica-central":      s601(),
  "praia-de-caparica-sul":          s601(),
  "praia-de-sao-joao-caparica":     s601(),
  "praia-de-nova-caparica":         s601(),
  "praia-do-rei-caparica":          s601(),
  // Costa da Caparica — specific named sections (north → south)
  "praia-do-norte-caparica":        s601(),
  "praia-do-dragao-vermelho":       s601(),
  "praia-do-tarquinio-paraiso":     s601(),
  "praia-do-cds":                   s601(),
  "praia-da-saude-caparica":        s601(),
  "praia-da-nova-vaga":             s601(),
  "fonte-da-telha":                 none,
  // Sintra coast
  "praia-de-adraga":    s601(),
  "praia-das-macas":    s601(),
  "praia-de-grande":    s601(),
  "praia-de-sao-juliao": s601(),
  // Ericeira
  "praia-de-sao-sebastiao-ericeira": s601(),
  "praia-dos-pescadores-ericeira":   s601(),
  "praia-do-norte-ericeira":         s601(),
  "praia-de-foz-do-lizandro":        s601(),
  // Oeste
  "praia-de-santa-cruz":      s601(),
  "praia-de-areia-branca":    s601(),
  "praia-de-consolacao":      s601(),
  "praia-de-ferrel":          s601(),
  "praia-de-peniche":         s601(),
  "praia-de-baleal":          s601(),
  "praia-de-sao-martinho":    s601(),
  "praia-de-sao-pedro-de-moel": s601(),
  "praia-da-foz-do-arelho":   s601(),
  "praia-de-nadadouro":       s601(),
  "praia-da-lagoa-de-obidos": s601(),
  "praia-de-ribamar":         s601(),
  // Nazaré
  "praia-da-nazare": s601(),
  // Centro / Figueira da Foz
  "praia-do-cabedelo":       s601(),
  "praia-do-cabedelo-viana": s601(),
  "praia-de-buarcos":     s601(),
  "praia-de-figueira":    s601(),
  "praia-da-barra":       s601(),
  "praia-da-costa-nova":  s601(),
  "praia-da-vagueira":    s601(),
  "praia-da-vieira":      s601(),
  "praia-do-pedrogao":    s601(),
  "praia-de-mira":        s601(),
  "praia-da-torreira":    s601(),
  "praia-de-tocha":       s601(),
  "praia-de-gala":        s601(),
  // Norte (Porto metro)
  "praia-de-furadouro":       s601(),
  "praia-de-cortegaca":       s601(),
  "praia-de-esmoriz":         s601(),
  "praia-de-espinho":         s601(),
  "praia-da-granja":          s601(),
  "praia-de-miramar":         s601(),
  "praia-de-aguda":           s601(),
  "praia-de-madalena":        s601(),
  "praia-de-valadares":       s601(),
  "praia-de-matosinhos":      s601(),
  "praia-de-leca-da-palmeira": s601(),
  "praia-de-lavra":           s601(),
  "praia-de-mindelo":         s601(),
  "praia-de-vila-do-conde":   s601(),
  "praia-de-agucadoura":      s601(),
  "praia-de-povoa-de-varzim": s601(),
  "praia-de-ofir":            s601(),
  "praia-de-esposende":       s601(),
  "praia-de-apulia":          s601(),
  "praia-de-viana":           s601(),
  "praia-de-ainda":           s601(),
  "praia-de-ancora":          s601(),
  "praia-de-moledo":          s601(),
  "praia-de-caminha":         s601(),
  "praia-de-gelfa":           s601(),
  // Alentejo popular
  "praia-de-troia":               s601(),
  "praia-de-troia-rei":           s601(),
  "praia-de-vila-nova-de-milfontes": s601(),
  "praia-do-farol-milfontes":     s601(),
  "praia-de-porto-covo":          s601(),
  "praia-de-sines":               s601(),
  "praia-de-sao-torpes":          s601(),
  "praia-de-santo-andre":         s601(),
  "praia-de-comporta":            s601(),
  "praia-de-carvalhal":           s601(),
  "praia-de-lagoa-de-santo-andre": s601(),
  "praia-de-vasco-da-gama":       s601(),
  "praia-do-pessegueirinho":      s601(),

  // Peak season only — Jul 1 – Aug 31 (remote/natural park beaches with minimal coverage)
  "praia-de-amoreira":       s701,
  "praia-da-arrifana":       s701,
  "praia-do-amado":          s701,
  "praia-de-odeceixe":       s701,
  "praia-de-melides":        s701,
  "praia-de-pego":           s701,
  "praia-de-zambujeira-do-mar": s701,

  // No lifeguard — confirmed remote, wild, or boat-access-only beaches
  "praia-da-culatra":         none,
  "praia-do-farol":           none,
  "praia-de-cacela-velha":    none,
  "praia-de-cabanas":         none,
  "praia-da-cordoama":        none,
  "praia-da-castelaria":      none,
  "praia-do-castelejo":       none,
  "praia-de-beliche":         none,
  "praia-de-sagres":          none,
  "praia-do-tonel":           none,
  "praia-de-vale-da-telha":   none,
  "praia-do-galapinhos":      none,
  "praia-do-ribeiro-do-cavalo": none,
  "praia-da-ursa":            none,
  "praia-do-norte-nazare":    none,
  "praia-de-sao-jacinto":     none,
  "praia-de-monte-clerigo":   none,
  "praia-de-carriagem":       none,
  "praia-do-vale-dos-homens": none,
  "praia-de-vale-figueiras":  none,
  "praia-da-bordeira":        none,
  "praia-de-almograve":       none,
  "praia-de-queimado":        none,
  "praia-de-sao-lourenco-azoia": none,
  "praia-de-comenda":         none,
  "praia-das-furnas":         none,
  "praia-do-guincho":         none,
  "praia-do-carvalho":        none,
  "praia-de-supertubos":      none,
  "praia-de-fisica":          none,
  "praia-de-porto-novo":      none,
  "praia-de-assenta":         none,
  "praia-da-empa":            none,
  "praia-de-brejao":          none,
  "praia-de-alteirinhos":     none,
  "praia-das-furnas-milfontes": none,
  "praia-de-morgavel":        none,
  "praia-da-ilha-do-pessegueiro": none,
};

export function getLifeguardStatus(
  lifeguard: LifeguardInfo | undefined,
  date: string // ISO date "YYYY-MM-DD"
): "active" | "inactive" | "none" | "unknown" {
  if (!lifeguard) return "unknown";
  if (lifeguard.type === "year-round") return "active";
  if (lifeguard.type === "none") return "none";
  if (lifeguard.season) {
    const mmdd = date.slice(5); // "MM-DD"
    const { from, to } = lifeguard.season;
    return mmdd >= from && mmdd <= to ? "active" : "inactive";
  }
  return "unknown";
}

export const BEACHES: Beach[] = ((): Beach[] => [

  // ── ALGARVE EAST (Castro Marim → Faro) ───────────────────────────────────
  { id: "praia-de-monte-gordo", name: "Praia de Monte Gordo", region: "Algarve", lat: 37.1793, lon: -7.4636, description: "Wide sandy beach near the Spanish border, warm shallow water." },
  { id: "praia-verde", name: "Praia Verde", region: "Algarve", lat: 37.1853, lon: -7.5011, description: "Quiet pine-backed beach east of Castro Marim." },
  { id: "praia-de-manta-rota", name: "Praia de Manta Rota", region: "Algarve", lat: 37.1712, lon: -7.5247, description: "Calm barrier island beach, good for families." },
  { id: "praia-de-cabanas", name: "Praia de Cabanas", region: "Algarve", lat: 37.1541, lon: -7.5926, description: "Secluded barrier island beach near Tavira, boat access only.", hazards: "Strong tidal currents near the lagoon channel. Boat access only." },
  { id: "praia-de-cacela-velha", name: "Praia de Cacela Velha", region: "Algarve", lat: 37.1618, lon: -7.5553, description: "Remote beach below a whitewashed hilltop village, no road access.", hazards: "Accessible only by boat. Strong tidal currents near the lagoon channel." },
  { id: "praia-do-barril", name: "Praia do Barril", region: "Algarve", lat: 37.1009, lon: -7.6368, description: "Beautiful barrier island beach, famous for its anchor cemetery.", hazards: "Tidal currents near the lagoon channel." },
  { id: "praia-da-ilha-de-tavira", name: "Ilha de Tavira", region: "Algarve", lat: 37.0973, lon: -7.6512, description: "Barrier island beach, reachable by ferry from Tavira.", hazards: "Tidal currents near the ferry channel." },
  { id: "praia-de-fuzeta-ilha-armona", name: "Praia da Armona", region: "Algarve", lat: 37.0348, lon: -7.7717, description: "Barrier island beach of Ilha da Armona, accessible by ferry from Olhão.", hazards: "Tidal currents near channels." },
  { id: "praia-de-fuzeta", name: "Praia de Fuzeta", region: "Algarve", lat: 37.0587, lon: -7.7388, description: "Peaceful island beach with a lagoon behind, accessible by ferry.", hazards: "Tidal currents near estuary mouth." },
  { id: "praia-da-culatra", name: "Praia da Culatra", region: "Algarve", lat: 36.9899, lon: -7.9000, description: "Barrier island fishing village beach in the Ria Formosa.", hazards: "Only accessible by ferry. Tidal channels." },
  { id: "praia-do-farol", name: "Praia do Farol", region: "Algarve", lat: 36.9760, lon: -7.9215, description: "Remote island beach near a lighthouse, no cars, pristine.", hazards: "Ferry access only. Strong currents near lighthouse." },
  { id: "praia-de-faro", name: "Praia de Faro", region: "Algarve", lat: 36.9959, lon: -7.9556, description: "Long barrier island beach serving the Algarve capital.", hazards: "Strong currents near the channel entrance." },
  { id: "praia-do-ancao", name: "Praia do Ancão", region: "Algarve", lat: 37.0105, lon: -8.0271, description: "Wild end of the Ria Formosa barrier island, pine forest." },
  { id: "praia-da-quinta-do-lago", name: "Praia da Quinta do Lago", region: "Algarve", lat: 37.0345, lon: -8.0085, description: "Exclusive resort beach with fine golden sand and clear water." },
  { id: "praia-do-garrao", name: "Praia do Garrão", region: "Algarve", lat: 37.0518, lon: -8.0580, description: "Quiet beach between Quinta do Lago and Vale do Lobo." },
  { id: "praia-das-dunas-douradas", name: "Praia das Dunas Douradas", region: "Algarve", lat: 37.0558, lon: -8.0476, description: "Long sandy beach with golden dunes between Garrão and Vale do Lobo." },
  { id: "praia-de-vale-do-lobo", name: "Praia de Vale do Lobo", region: "Algarve", lat: 37.0735, lon: -8.0268, description: "Exclusive resort beach with orange sandstone cliffs." },
  { id: "praia-de-quarteira", name: "Praia de Quarteira", region: "Algarve", lat: 37.0652, lon: -8.1005, description: "Popular family beach on the Golden Triangle coast." },
  { id: "praia-de-vilamoura", name: "Praia de Vilamoura", region: "Algarve", lat: 37.0797, lon: -8.1240, description: "Well-serviced beach next to the famous Vilamoura marina." },
  { id: "praia-da-falesia", name: "Praia da Falésia", region: "Algarve", lat: 37.0784, lon: -8.1688, description: "Striking red and orange ochre cliffs stretching 6km.", hazards: "Cliff erosion — do not stand near the cliff base. Rocky seabed in places." },
  { id: "praia-da-rocha-baixinha", name: "Praia da Rocha Baixinha", region: "Algarve", lat: 37.0756, lon: -8.1467, description: "Sandy beach below low sandstone cliffs, quieter than Vilamoura." },
  { id: "praia-de-olhos-de-agua", name: "Praia de Olhos de Água", region: "Algarve", lat: 37.0967, lon: -8.2010, description: "Charming fishing village cove with freshwater springs.", hazards: "Rocky seabed at low tide. Fishing boats present." },

  // ── ALGARVE CENTRAL (Albufeira → Portimão) ────────────────────────────────
  { id: "praia-da-oura", name: "Praia da Oura", region: "Algarve", lat: 37.0877, lon: -8.2213, description: "Lively beach in Albufeira's tourist strip, great facilities." },
  { id: "praia-dos-pescadores", name: "Praia dos Pescadores", region: "Algarve", lat: 37.0872, lon: -8.2489, description: "Albufeira's original old-town beach, charming atmosphere." },
  { id: "praia-do-peneco", name: "Praia do Peneco", region: "Algarve", lat: 37.0845, lon: -8.2527, description: "Broad sandy beach at the foot of Albufeira's old town." },
  { id: "praia-de-albufeira", name: "Praia de Albufeira", region: "Algarve", lat: 37.0852, lon: -8.2510, description: "The main town beach of Albufeira, surrounded by restaurants." },
  { id: "praia-da-coelha", name: "Praia da Coelha", region: "Algarve", lat: 37.0807, lon: -8.2310, description: "Quiet cove between Albufeira and São Rafael, less crowded.", hazards: "Rocky seabed. Small access path." },
  { id: "praia-de-sao-rafael", name: "Praia de São Rafael", region: "Algarve", lat: 37.0770, lon: -8.2609, description: "Scenic small cove with golden rock formations.", hazards: "Rocky seabed and outcrops. Great for snorkelling." },
  { id: "praia-de-gale", name: "Praia de Galé", region: "Algarve", lat: 37.0813, lon: -8.2953, description: "Long sandy beach between Albufeira and Armação de Pêra." },
  { id: "praia-dos-salgados", name: "Praia dos Salgados", region: "Algarve", lat: 37.0916, lon: -8.3172, description: "Wide beach bordering a bird reserve lagoon, peaceful setting." },
  { id: "praia-de-armacao", name: "Praia de Armação de Pêra", region: "Algarve", lat: 37.1024, lon: -8.3560, description: "Wide sandy beach in a traditional fishing village." },
  { id: "praia-de-nossa-senhora-da-rocha", name: "Praia de Nossa Senhora da Rocha", region: "Algarve", lat: 37.1038, lon: -8.3849, description: "Dramatic beach below a chapel on a headland.", hazards: "Rocky seabed. Shore break possible." },
  { id: "praia-do-carvalho", name: "Praia do Carvalho", region: "Algarve", lat: 37.0898, lon: -8.4381, description: "Hidden cove near Benagil, accessible through a cliff tunnel.", hazards: "Rocky seabed. Difficult access. Shore break when waves are up." },
  { id: "praia-de-benagil", name: "Praia de Benagil", region: "Algarve", lat: 37.0892, lon: -8.4258, description: "Famous for its sea cave; very small beach, big swell.", hazards: "Very small beach with strong shore break. Cave access by kayak or boat only — swimming to the cave is dangerous." },
  { id: "praia-da-marinha", name: "Praia da Marinha", region: "Algarve", lat: 37.0893, lon: -8.4147, description: "Dramatic limestone cliffs, crystal-clear water.", hazards: "Rocky and uneven seabed. Sea urchins near rocks. Entry and exit can be slippery." },
  { id: "praia-de-vale-centianes", name: "Praia de Vale Centianes", region: "Algarve", lat: 37.0977, lon: -8.4518, description: "Small cove between Marinha and Carvoeiro, calm water.", hazards: "Rocky seabed. Sea urchins near cliffs." },
  { id: "praia-de-alfanzina", name: "Praia de Alfanzina", region: "Algarve", lat: 37.0971, lon: -8.4665, description: "Beautiful cove below the Alfanzina lighthouse.", hazards: "Rocky seabed. Sea urchins." },
  { id: "praia-dos-caneiros", name: "Praia dos Caneiros", region: "Algarve", lat: 37.1038, lon: -8.4543, description: "Scenic cove with clear water near Ferragudo.", hazards: "Rocky seabed. Sea urchins." },
  { id: "praia-do-carvoeiro", name: "Praia do Carvoeiro", region: "Algarve", lat: 37.1008, lon: -8.4668, description: "Pretty cove nestled between cliffs in the village of Carvoeiro.", hazards: "Rocky seabed at the sides. Shore break when waves are up." },
  { id: "praia-do-pintadinho", name: "Praia do Pintadinho", region: "Algarve", lat: 37.1026, lon: -8.4744, description: "Small cove near Carvoeiro with clear turquoise water.", hazards: "Rocky seabed. Limited space." },
  { id: "praia-de-ferragudo", name: "Praia de Ferragudo", region: "Algarve", lat: 37.1155, lon: -8.5345, description: "Charming sandy beach below the castle of Ferragudo." },
  { id: "praia-grande-ferragudo", name: "Praia Grande (Ferragudo)", region: "Algarve", lat: 37.1252, lon: -8.5448, description: "Long sandy beach north of Ferragudo, quiet and unspoilt." },
  { id: "praia-da-rocha", name: "Praia da Rocha", region: "Algarve", lat: 37.1146, lon: -8.5315, description: "Iconic golden beach in Portimão, great facilities." },
  { id: "praia-do-vau", name: "Praia do Vau", region: "Algarve", lat: 37.1169, lon: -8.6107, description: "Family beach west of Portimão with rock formations.", hazards: "Rocky areas at the sides." },
  { id: "praia-dos-tres-irmaos", name: "Praia dos Três Irmãos", region: "Algarve", lat: 37.1214, lon: -8.6007, description: "Named after three rock formations, dramatic scenery.", hazards: "Rocky seabed. Sea urchins near rocks." },
  { id: "praia-de-alvor", name: "Praia de Alvor", region: "Algarve", lat: 37.1219, lon: -8.5927, description: "Long beach at the mouth of the Alvor estuary.", hazards: "Strong currents near the estuary channel. Avoid swimming near the river mouth." },
  { id: "praia-do-alemao", name: "Praia do Alemão", region: "Algarve", lat: 37.1096, lon: -8.6323, description: "Quiet beach between Portimão and Lagos, less visited." },

  // ── ALGARVE LAGOS AREA ────────────────────────────────────────────────────
  { id: "praia-de-meia-praia", name: "Praia de Meia Praia", region: "Algarve", lat: 37.1108, lon: -8.7028, description: "Long sandy beach near Lagos, sheltered bay." },
  { id: "praia-de-porto-de-mos", name: "Praia de Porto de Mós", region: "Algarve", lat: 37.0801, lon: -8.6865, description: "Wide sandy beach in a sheltered cove south of Lagos." },
  { id: "praia-dona-ana", name: "Praia Dona Ana", region: "Algarve", lat: 37.0965, lon: -8.6698, description: "Postcard-perfect beach near Lagos.", hazards: "Rocky areas at the sides. Sea urchins near cliff base." },
  { id: "praia-do-pinhao", name: "Praia do Pinhão", region: "Algarve", lat: 37.0893, lon: -8.6721, description: "Tiny cove near Dona Ana, quieter and more intimate.", hazards: "Very small beach. Rocky seabed." },
  { id: "praia-do-camilo", name: "Praia do Camilo", region: "Algarve", lat: 37.0875, lon: -8.6742, description: "Hidden gem accessible via wooden staircase.", hazards: "Rocky seabed. Very small beach." },
  { id: "praia-de-luz", name: "Praia de Luz", region: "Algarve", lat: 37.0888, lon: -8.7293, description: "Relaxed village beach with calm water and a promenade." },
  { id: "praia-de-burgau", name: "Praia de Burgau", region: "Algarve", lat: 37.0754, lon: -8.7563, description: "Small beach in a traditional fishing village, rugged cliffs.", hazards: "Rocky seabed. Shore break when swell is up." },
  { id: "praia-de-cabanas-velhas", name: "Praia de Cabanas Velhas", region: "Algarve", lat: 37.0683, lon: -8.7699, description: "Quiet cove near Burgau, accessible via short walk.", hazards: "Rocky seabed. Shore break possible." },
  { id: "praia-da-boca-do-rio", name: "Praia da Boca do Rio", region: "Algarve", lat: 37.0681, lon: -8.8208, description: "Wild beach at a river mouth west of Salema.", hazards: "River currents near the mouth. Exposed to Atlantic swell." },
  { id: "praia-de-salema", name: "Praia de Salema", region: "Algarve", lat: 37.0631, lon: -8.8086, description: "Unspoilt village beach, one of the last authentic fishing spots.", hazards: "Shore break possible. Fishing boats launch here." },
  { id: "praia-de-figueira-sw", name: "Praia de Figueira", region: "Algarve", lat: 37.0561, lon: -8.8386, description: "Isolated cove between Salema and Zavial, rarely crowded.", hazards: "Difficult access. Strong swell possible." },
  { id: "praia-do-zavial", name: "Praia do Zavial", region: "Algarve", lat: 37.0326, lon: -8.8948, description: "Wild surf beach south of Vila do Bispo.", hazards: "Strong shore break and rip currents. Popular with surfers." },
  { id: "praia-de-ingrina", name: "Praia de Ingrina", region: "Algarve", lat: 37.0246, lon: -8.8758, description: "Remote cove near Raposeira, crystal water.", hazards: "Rocky seabed. Difficult access track." },
  { id: "praia-do-martinhal", name: "Praia do Martinhal", region: "Algarve", lat: 36.9996, lon: -8.9132, description: "Sheltered bay near Sagres, great for water sports.", hazards: "Strong winds common — good for kitesurfing but choppy for swimmers." },

  // ── ALGARVE SAGRES / COSTA VICENTINA SOUTH ────────────────────────────────
  { id: "praia-da-mareta", name: "Praia da Mareta", region: "Algarve", lat: 36.9995, lon: -8.9271, description: "Sagres town beach, sheltered from north winds.", hazards: "Can have rip currents when swell is active." },
  { id: "praia-do-tonel", name: "Praia do Tonel", region: "Algarve", lat: 37.0149, lon: -8.9439, description: "Powerful surf beach near Sagres, dramatic headland views.", hazards: "Powerful shore break and rip currents. Strong winds. Not safe for casual swimmers." },
  { id: "praia-de-sagres", name: "Praia de Sagres", region: "Algarve", lat: 37.0097, lon: -8.9368, description: "Wild, windswept beach at Portugal's southwest tip.", hazards: "Powerful shore break and strong rip currents. Frequently closed to swimming. Not suitable for children." },
  { id: "praia-do-castelejo", name: "Praia do Castelejo", region: "Algarve", lat: 37.1054, lon: -8.9626, description: "Dramatic cliffside surf beach north of Sagres.", hazards: "Powerful Atlantic swell. Rip currents. For experienced swimmers only." },
  { id: "praia-de-beliche", name: "Praia de Beliche", region: "Algarve", lat: 37.0175, lon: -8.9947, description: "Remote Atlantic cove accessible via steep cliffs.", hazards: "Very exposed to Atlantic swell. Dangerous in all but the calmest conditions. Steep cliff access." },
  { id: "praia-da-cordoama", name: "Praia da Cordoama", region: "Algarve", lat: 37.1444, lon: -8.9637, description: "Wild cliff-backed beach on the Costa Vicentina.", hazards: "Powerful swell and rip currents. No lifeguard." },
  { id: "praia-da-castelaria", name: "Praia da Castelaria", region: "Algarve", lat: 37.1630, lon: -8.9546, description: "Secluded beach in the Costa Vicentina natural park.", hazards: "Exposed Atlantic beach. Strong currents." },
  { id: "praia-de-odeceixe", name: "Praia de Odeceixe", region: "Algarve", lat: 37.4527, lon: -8.7723, description: "Stunning estuary beach on the Alentejo border.", hazards: "River current near estuary mouth. Atlantic side has strong waves — stick to the calmer river side." },

  // ── COSTA VICENTINA / ALENTEJO SOUTH ──────────────────────────────────────
  { id: "praia-de-amoreira", name: "Praia de Amoreira", region: "Alentejo", lat: 37.4061, lon: -8.7607, description: "River-meets-ocean beach backed by dunes.", hazards: "River currents near the estuary. Strong Atlantic swell on the open side." },
  { id: "praia-de-monte-clerigo", name: "Praia de Monte Clérigo", region: "Alentejo", lat: 37.3458, lon: -8.8280, description: "Wild Atlantic beach in the Vicentina coast natural park.", hazards: "Exposed Atlantic beach. Rip currents and strong shore break. No lifeguard most of the year." },
  { id: "praia-da-arrifana", name: "Praia da Arrifana", region: "Alentejo", lat: 37.2974, lon: -8.8619, description: "Dramatic clifftop setting, popular surf break.", hazards: "Powerful shore break and rip currents. For experienced swimmers only." },
  { id: "praia-do-amado", name: "Praia do Amado", region: "Alentejo", lat: 37.1669, lon: -8.8977, description: "Classic surf beach with a consistent break, natural park.", hazards: "Rip currents along the sandbanks. Surfers in the water." },
  { id: "praia-da-bordeira", name: "Praia da Bordeira", region: "Alentejo", lat: 37.2340, lon: -8.8748, description: "Vast beach with impressive dunes and a river estuary.", hazards: "Strong rip currents, especially near the river channel. Very exposed." },
  { id: "praia-do-vale-dos-homens", name: "Praia do Vale dos Homens", region: "Alentejo", lat: 37.2800, lon: -8.8700, description: "Remote and wild beach in the Vicentina natural park.", hazards: "Exposed Atlantic beach. No facilities. Rip currents." },
  { id: "praia-de-carriagem", name: "Praia de Carriagem", region: "Alentejo", lat: 37.3152, lon: -8.8502, description: "Quiet surf beach between Arrifana and Monte Clérigo.", hazards: "Rip currents and shore break. No lifeguard." },
  { id: "praia-de-vale-figueiras", name: "Praia de Vale Figueiras", region: "Alentejo", lat: 37.3837, lon: -8.8035, description: "Remote beach in the Vicentina natural park, no facilities.", hazards: "Very exposed. Rip currents. Long walk to access." },

  // ── ALENTEJO CENTRAL/NORTH ────────────────────────────────────────────────
  { id: "praia-de-porto-covo", name: "Praia de Porto Covo", region: "Alentejo", lat: 37.8533, lon: -8.7862, description: "Rugged cliffs and strong Atlantic swell.", hazards: "Powerful swell and rocky seabed. Rip currents near the cliffs. Not suitable for weak swimmers." },
  { id: "praia-das-furnas", name: "Praia das Furnas", region: "Alentejo", lat: 37.8633, lon: -8.7876, description: "Small rocky cove near Porto Covo, dramatic sea caves.", hazards: "Rocky seabed, sea caves. Powerful swell. Dangerous when rough." },
  { id: "praia-da-ilha-do-pessegueiro", name: "Ilha do Pessegueiro", region: "Alentejo", lat: 37.8353, lon: -8.7954, description: "Facing a small island, remote and beautiful.", hazards: "Exposed Atlantic beach. Rip currents possible. No lifeguard most of the year." },
  { id: "praia-de-almograve", name: "Praia de Almograve", region: "Alentejo", lat: 37.6449, lon: -8.8008, description: "Wild beach in the Vicentina natural park, near Odemira.", hazards: "Powerful Atlantic swell. Rip currents. No lifeguard." },
  { id: "praia-de-zambujeira-do-mar", name: "Praia de Zambujeira do Mar", region: "Alentejo", lat: 37.5221, lon: -8.7902, description: "Village beach in the Vicentina natural park, site of the Sudowoeste festival.", hazards: "Powerful shore break and rip currents. Very exposed." },
  { id: "praia-de-vila-nova-de-milfontes", name: "Praia de Vila Nova de Milfontes", region: "Alentejo", lat: 37.7251, lon: -8.7938, description: "Popular beach at the Mira river mouth, charming town nearby.", hazards: "River mouth currents when tide is running." },
  { id: "praia-do-farol-milfontes", name: "Praia do Farol (Milfontes)", region: "Alentejo", lat: 37.7138, lon: -8.8007, description: "Atlantic-facing beach north of the Mira estuary.", hazards: "Exposed to Atlantic swell. Rip currents possible." },
  { id: "praia-de-santo-andre", name: "Praia de Santo André", region: "Alentejo", lat: 37.9912, lon: -8.7943, description: "Long beach beside a lagoon, pine forest behind." },
  { id: "praia-de-melides", name: "Praia de Melides", region: "Alentejo", lat: 38.1997, lon: -8.7310, description: "Remote lagoon and ocean beach, increasingly fashionable.", hazards: "Strong rip currents. No lifeguard outside summer." },
  { id: "praia-de-pego", name: "Praia do Pego", region: "Alentejo", lat: 38.3420, lon: -8.7697, description: "Secluded beach near Carvalhal, backed by pines, very quiet." },
  { id: "praia-do-carvalhal", name: "Praia do Carvalhal", region: "Alentejo", lat: 38.3106, lon: -8.7716, description: "Long wild beach south of Comporta, pine and dune landscape.", hazards: "Strong rip currents. No lifeguard outside summer." },
  { id: "praia-de-comporta", name: "Praia de Comporta", region: "Alentejo", lat: 38.3653, lon: -8.7728, description: "Unspoilt wild beach with rice fields behind.", hazards: "Strong rip currents along this stretch of coast. No lifeguard outside summer season." },
  { id: "praia-de-troia", name: "Praia de Tróia", region: "Alentejo", lat: 38.4897, lon: -8.8980, description: "Peninsula beach with turquoise, calm water." },
  { id: "praia-de-troia-rei", name: "Praia de Tróia-Rei", region: "Alentejo", lat: 38.5107, lon: -8.8953, description: "Northern Tróia peninsula, calm Sado estuary waters." },

  // ── SETÚBAL / ARRÁBIDA ────────────────────────────────────────────────────
  { id: "praia-de-setubal", name: "Praia de Setúbal", region: "Setúbal", lat: 38.4958, lon: -8.8983, description: "Long beach facing the Sado estuary." },
  { id: "praia-da-figueirinha", name: "Praia da Figueirinha", region: "Setúbal", lat: 38.4946, lon: -8.9121, description: "Popular sandy beach near Setúbal inside the Arrábida natural park." },
  { id: "praia-de-galapos", name: "Praia de Galapos", region: "Setúbal", lat: 38.4846, lon: -8.9495, description: "Clear blue cove in Arrábida, protected from wind.", hazards: "Rocky seabed. Sea urchins near rocks. Boat traffic in summer." },
  { id: "praia-do-portinho-da-arrabida", name: "Portinho da Arrábida", region: "Setúbal", lat: 38.4870, lon: -8.9587, description: "Turquoise Mediterranean-like water, protected natural park.", hazards: "Rocky seabed. Sea urchins near rocks. Boat traffic in summer." },
  { id: "praia-do-galapinhos", name: "Praia do Galapinhos", region: "Setúbal", lat: 38.4778, lon: -8.9433, description: "Remote cove in Arrábida, accessible only on foot or by boat.", hazards: "No facilities. Rocky seabed and sea urchins. Rough access path." },
  { id: "praia-do-creiro", name: "Praia do Creiro", region: "Setúbal", lat: 38.4818, lon: -8.9613, description: "Quiet pebble and sand beach near Sesimbra.", hazards: "Rocky seabed, sea urchins. Pebble entry." },
  { id: "praia-da-arrabida", name: "Praia da Arrábida", region: "Setúbal", lat: 38.4741, lon: -8.9735, description: "Mediterranean-like turquoise water inside a nature park.", hazards: "Rocky seabed in places. Sea urchins near rocks. Boat traffic in summer." },
  { id: "praia-do-ribeiro-do-cavalo", name: "Praia do Ribeiro do Cavalo", region: "Setúbal", lat: 38.4327, lon: -9.0596, description: "Hidden paradise cove, accessible only by boat or long hike.", hazards: "Very difficult access. Rocky seabed. No facilities." },
  { id: "praia-de-sesimbra", name: "Praia de Sesimbra", region: "Setúbal", lat: 38.4438, lon: -9.1001, description: "Sheltered bay with a Moorish castle above." },
  { id: "praia-do-ouro-sesimbra", name: "Praia do Ouro (Sesimbra)", region: "Setúbal", lat: 38.4416, lon: -9.0885, description: "Small beach east of Sesimbra, calmer and less crowded." },
  { id: "praia-de-sao-lourenco-azoia", name: "Praia de São Lourenço (Azóia)", region: "Setúbal", lat: 38.4295, lon: -9.1268, description: "Remote Atlantic-facing beach south of Cabo Espichel.", hazards: "Very exposed. Powerful shore break. No lifeguard." },
  { id: "praia-de-lagoa-de-albufeira", name: "Lagoa de Albufeira", region: "Setúbal", lat: 38.5110, lon: -9.1869, description: "Lagoon beach with calm water, popular with windsurfers and families." },

  // ── COSTA DA CAPARICA ─────────────────────────────────────────────────────
  // Generic sections — broad areas of the 26 km coast
  { id: "praia-da-cova-do-vapor", name: "Praia da Cova do Vapor", region: "Lisboa", lat: 38.6585, lon: -9.2455, description: "Small beach at the northern tip of Caparica, near the Tagus mouth.", ipmaAreaAviso: "LSB" },
  { id: "praia-de-caparica-norte", name: "Praia de Caparica (Norte)", region: "Lisboa", lat: 38.5638, lon: -9.2382, description: "Northern Caparica coast, closest to Lisbon, lively.", ipmaAreaAviso: "LSB" },
  { id: "praia-de-caparica-central", name: "Praia de Caparica (Central)", region: "Lisboa", lat: 38.5410, lon: -9.2349, description: "Lively central section of Costa da Caparica, great facilities.", ipmaAreaAviso: "LSB" },
  { id: "praia-de-caparica-sul", name: "Praia de Caparica (Sul)", region: "Lisboa", lat: 38.4977, lon: -9.2213, description: "Quieter southern end of Caparica, less crowded.", ipmaAreaAviso: "LSB" },
  { id: "praia-de-sao-joao-caparica", name: "Praia de São João da Caparica", region: "Lisboa", lat: 38.6540, lon: -9.2375, description: "Family section of the Caparica coast with calm conditions.", ipmaAreaAviso: "LSB" },
  { id: "praia-de-nova-caparica", name: "Praia Nova (Caparica)", region: "Lisboa", lat: 38.5300, lon: -9.2355, description: "Central-north Caparica section, popular with younger crowds.", ipmaAreaAviso: "LSB" },
  { id: "praia-do-rei-caparica", name: "Praia do Rei (Caparica)", region: "Lisboa", lat: 38.5070, lon: -9.2280, description: "Southern Caparica section, quieter and less developed.", ipmaAreaAviso: "LSB" },
  // Specific named sections — north → south, with structured hazard data
  { id: "praia-do-norte-caparica", name: "Praia do Norte (Caparica)", region: "Lisboa", lat: 38.6495, lon: -9.2370, description: "Northernmost surf section of Caparica, just south of São João.", ipmaAreaAviso: "LSB" },
  { id: "praia-do-cds", name: "Praia do CDS", region: "Lisboa", lat: 38.6450, lon: -9.2366, description: "Water-sports hub near the town centre of Costa da Caparica.", ipmaAreaAviso: "LSB" },
  { id: "praia-do-tarquinio-paraiso", name: "Praia do Tarquínio / Paraíso", region: "Lisboa", lat: 38.6425, lon: -9.2364, description: "Family-friendly section of Caparica with beach bars and good facilities.", ipmaAreaAviso: "LSB" },
  { id: "praia-do-dragao-vermelho", name: "Praia do Dragão Vermelho", region: "Lisboa", lat: 38.6400, lon: -9.2362, description: "Popular surf beach on the Caparica coast, known for consistent waves.", ipmaAreaAviso: "LSB" },
  { id: "praia-da-saude-caparica", name: "Praia da Saúde", region: "Lisboa", lat: 38.6375, lon: -9.2360, description: "Open section of Caparica, wide beach close to the town.", ipmaAreaAviso: "LSB" },
  { id: "praia-da-nova-vaga", name: "Praia da Nova Vaga", region: "Lisboa", lat: 38.6345, lon: -9.2356, description: "Southern end of the urban Caparica strip, more exposed to wind.", ipmaAreaAviso: "LSB" },
  { id: "fonte-da-telha", name: "Praia da Fonte da Telha", region: "Lisboa", lat: 38.5852, lon: -9.2050, description: "Remote southern end of the Caparica coast, cliff-backed, few facilities.", ipmaAreaAviso: "LSB" },

  // ── ESTORIL / CASCAIS LINE ────────────────────────────────────────────────
  { id: "praia-de-carcavelos", name: "Praia de Carcavelos", region: "Lisboa", lat: 38.6895, lon: -9.3359, description: "Wide beach near Lisbon, popular with surfers and families.", hazards: "Rip currents and strong shore break. Surf school area — watch for boards." },
  { id: "praia-de-sao-pedro-do-estoril", name: "Praia de São Pedro do Estoril", region: "Lisboa", lat: 38.7009, lon: -9.3758, description: "Small sheltered beach along the Estoril coast." },
  { id: "praia-do-tamariz", name: "Praia do Tamariz", region: "Lisboa", lat: 38.7020, lon: -9.3927, description: "Iconic Estoril beach in front of the casino, lively atmosphere." },
  { id: "praia-de-estoril", name: "Praia de Estoril", region: "Lisboa", lat: 38.7029, lon: -9.3955, description: "Classic beach in front of the Estoril casino and gardens." },
  { id: "praia-de-azarujinha", name: "Praia de Azarujinha", region: "Lisboa", lat: 38.7062, lon: -9.3847, description: "Small sheltered cove between Estoril and Cascais." },
  { id: "praia-da-rainha", name: "Praia da Rainha", region: "Lisboa", lat: 38.6990, lon: -9.3872, description: "Small elegant beach in Cascais bay." },
  { id: "praia-de-cascais", name: "Praia de Cascais", region: "Lisboa", lat: 38.6979, lon: -9.4215, description: "Town beach in the cosmopolitan Cascais bay." },
  { id: "praia-de-cascais-ribeira", name: "Praia da Ribeira (Cascais)", region: "Lisboa", lat: 38.6972, lon: -9.4179, description: "Charming small beach in the heart of Cascais fishing harbour." },
  { id: "praia-do-guincho", name: "Praia do Guincho", region: "Lisboa", lat: 38.7272, lon: -9.4747, description: "Wild Atlantic beach, often windy — a kite surfer's paradise.", hazards: "Very strong and persistent winds. Rip currents common. Swimming is frequently prohibited." },

  // ── SINTRA COAST ──────────────────────────────────────────────────────────
  { id: "praia-de-adraga", name: "Praia de Adraga", region: "Lisboa", lat: 38.8037, lon: -9.4828, description: "Wild cove south of Sintra, rugged cliffs and natural beauty.", hazards: "Strong shore break and rip currents. No lifeguard outside summer." },
  { id: "praia-das-macas", name: "Praia das Maçãs", region: "Lisboa", lat: 38.8262, lon: -9.4741, description: "Village beach north of Sintra, charming and relaxed." },
  { id: "praia-de-grande", name: "Praia Grande", region: "Lisboa", lat: 38.8215, lon: -9.4802, description: "Wide beach north of Sintra, popular with surfers.", hazards: "Strong rip currents and powerful shore break. Children must be supervised at all times." },
  { id: "praia-de-sao-juliao", name: "Praia de São Julião", region: "Lisboa", lat: 38.8399, lon: -9.4703, description: "Long beach north of Sintra, quieter than Praia Grande.", hazards: "Rip currents and strong Atlantic swell." },
  { id: "praia-da-aguda-sintra", name: "Praia da Aguda (Sintra)", region: "Lisboa", lat: 38.8100, lon: -9.4759, description: "Small rocky cove between Adraga and Sintra." },
  { id: "praia-da-ursa", name: "Praia da Ursa", region: "Lisboa", lat: 38.8089, lon: -9.4935, description: "Dramatic remote cove, very challenging access down steep cliffs.", hazards: "Extremely dangerous access — cliffs are unstable. Very powerful swell. Not recommended without local knowledge." },

  // ── ERICEIRA ──────────────────────────────────────────────────────────────
  { id: "praia-de-foz-do-lizandro", name: "Praia de Foz do Lizandro", region: "Oeste", lat: 39.0171, lon: -9.4187, description: "River mouth beach near Ericeira, popular with families.", hazards: "River currents near the mouth." },
  { id: "praia-de-sao-sebastiao-ericeira", name: "Praia de São Sebastião", region: "Oeste", lat: 38.9617, lon: -9.4191, description: "Main beach of Ericeira, sandy with good facilities." },
  { id: "praia-dos-pescadores-ericeira", name: "Praia dos Pescadores (Ericeira)", region: "Oeste", lat: 38.9622, lon: -9.4226, description: "Small beach below the Ericeira cliffs, colourful fishing boats." },
  { id: "praia-do-norte-ericeira", name: "Praia do Norte (Ericeira)", region: "Oeste", lat: 38.9681, lon: -9.4246, description: "North-facing beach in Ericeira, good surf conditions.", hazards: "Shore break and rip currents when surf is up." },
  { id: "praia-de-ribeira-d-ilhas", name: "Ribeira d'Ilhas", region: "Oeste", lat: 38.9901, lon: -9.4260, description: "World Surfing Reserve. Iconic right-hand point break.", hazards: "Powerful surf. Rocks. For experienced water sports only." },
  { id: "praia-de-sao-lourenco-ericeira", name: "Praia de São Lourenço (Ericeira)", region: "Oeste", lat: 38.9983, lon: -9.4185, description: "Smaller beach north of Ericeira, popular with locals.", hazards: "Rocky entry points. Shore break possible." },
  { id: "praia-da-empa", name: "Praia da Empa", region: "Oeste", lat: 39.0083, lon: -9.4127, description: "Wild beach between Ericeira and Foz do Lizandro.", hazards: "Rocky. Shore break possible." },
  { id: "praia-de-ribamar", name: "Praia de Ribamar", region: "Oeste", lat: 39.0457, lon: -9.4107, description: "Quiet beach near the village of Ribamar, good surf." },

  // ── TORRES VEDRAS / SANTA CRUZ ────────────────────────────────────────────
  { id: "praia-de-assenta", name: "Praia da Assenta", region: "Oeste", lat: 39.2052, lon: -9.3876, description: "Wild beach north of Torres Vedras, backed by cliffs.", hazards: "Exposed Atlantic beach. Rip currents." },
  { id: "praia-de-silveira", name: "Praia da Silveira", region: "Oeste", lat: 39.1742, lon: -9.4044, description: "Long dune beach between Ericeira and Santa Cruz.", hazards: "Rip currents and shore break. No lifeguard outside summer." },
  { id: "praia-de-fisica", name: "Praia da Física", region: "Oeste", lat: 39.1553, lon: -9.4075, description: "Remote beach south of Santa Cruz, very unspoilt.", hazards: "Strong rip currents. No facilities." },
  { id: "praia-de-santa-cruz", name: "Praia de Santa Cruz", region: "Oeste", lat: 39.2167, lon: -9.3926, description: "Large beach near Torres Vedras with good facilities.", hazards: "Strong rip currents and shore break. Always swim between the flags." },
  { id: "praia-de-porto-novo", name: "Praia de Porto Novo", region: "Oeste", lat: 39.2617, lon: -9.3936, description: "Wild beach near Vimeiro, backed by cliffs.", hazards: "Exposed Atlantic beach. Rip currents common." },
  { id: "praia-de-areal-alto", name: "Praia de Areal Alto", region: "Oeste", lat: 39.2830, lon: -9.3847, description: "Quiet beach north of Santa Cruz, dunes and pine forest." },

  // ── PENICHE AREA ──────────────────────────────────────────────────────────
  { id: "praia-da-areia-branca", name: "Praia da Areia Branca", region: "Oeste", lat: 39.3019, lon: -9.3869, description: "Popular family beach south of Peniche, good facilities." },
  { id: "praia-de-consolacao", name: "Praia da Consolação", region: "Oeste", lat: 39.3194, lon: -9.3744, description: "Long beach south of Peniche, popular with families." },
  { id: "praia-de-ferrel", name: "Praia de Ferrel", region: "Oeste", lat: 39.3497, lon: -9.3862, description: "Wide beach south of Peniche with good surf conditions.", hazards: "Rip currents and shore break." },
  { id: "praia-de-peniche", name: "Praia de Peniche", region: "Oeste", lat: 39.3556, lon: -9.3810, description: "Near the world-famous Supertubos surf break.", hazards: "Heavy shore break. Rip currents along the sandbanks. Surfers in the water." },
  { id: "praia-de-supertubos", name: "Praia de Supertubos", region: "Oeste", lat: 39.3419, lon: -9.3769, description: "Host of the WSL Rip Curl Pro, one of Europe's best surf breaks.", hazards: "Extremely powerful waves — dangerous for swimmers. For observation only except in calm conditions." },
  { id: "praia-de-baleal", name: "Praia do Baleal", region: "Oeste", lat: 39.3797, lon: -9.3430, description: "Charming isthmus beach with surf schools.", hazards: "Rip currents near the sandbar. Surf school area." },
  { id: "praia-da-lagide", name: "Praia da Lagide", region: "Oeste", lat: 39.3873, lon: -9.3397, description: "Small cove on the Baleal peninsula, calmer water.", hazards: "Rocky seabed. Limited space." },
  { id: "praia-de-sao-bernardino", name: "Praia de São Bernardino", region: "Oeste", lat: 39.4108, lon: -9.3390, description: "Exposed beach north of Peniche with consistent surf.", hazards: "Strong rip currents and shore break." },

  // ── NAZARÉ / SILVER COAST ─────────────────────────────────────────────────
  { id: "praia-de-sao-martinho", name: "São Martinho do Porto", region: "Oeste", lat: 39.5103, lon: -9.1413, description: "Almost circular sheltered bay — perfect for kids and families." },
  { id: "praia-de-sao-pedro-de-moel", name: "Praia de São Pedro de Moel", region: "Oeste", lat: 39.7556, lon: -9.0254, description: "Pine-backed beach resort south of Nazaré, beautiful setting." },
  { id: "praia-de-vale-furado", name: "Praia de Vale Furado", region: "Oeste", lat: 39.5784, lon: -9.0661, description: "Quiet beach between Nazaré and São Martinho, dunes behind.", hazards: "Rip currents. No lifeguard outside summer." },
  { id: "praia-do-salgado", name: "Praia do Salgado", region: "Oeste", lat: 39.5450, lon: -9.0908, description: "Wild beach south of Nazaré." },
  { id: "praia-da-nazare", name: "Praia de Nazaré", region: "Oeste", lat: 39.6007, lon: -9.0712, description: "Famous for record-breaking waves in winter; calmer in summer.", hazards: "Dangerous currents year-round due to the underwater canyon. Even in summer, rip currents are common. Never swim alone here." },
  { id: "praia-do-norte-nazare", name: "Praia do Norte (Nazaré)", region: "Oeste", lat: 39.6140, lon: -9.0738, description: "Where the world's biggest waves are surfed. Observation only.", hazards: "EXTREMELY DANGEROUS. Never enter the water. Observation only." },

  // ── LEIRIA COAST ──────────────────────────────────────────────────────────
  { id: "praia-da-vieira", name: "Praia da Vieira de Leiria", region: "Centro", lat: 39.8780, lon: -8.9698, description: "Long beach near Marinha Grande, pine forest behind.", hazards: "Rip currents. Stay between the flags." },
  { id: "praia-do-pedrogao", name: "Praia do Pedrógão", region: "Centro", lat: 39.8478, lon: -8.9826, description: "Quiet beach south of Vieira de Leiria, less crowded." },
  { id: "praia-de-monte-real", name: "Praia de Monte Real", region: "Centro", lat: 39.8288, lon: -8.9825, description: "Beach near the spa town of Monte Real, backed by pines." },
  { id: "praia-das-paredes", name: "Praia das Paredes da Vitória", region: "Centro", lat: 39.9105, lon: -8.8973, description: "Small beach between Vieira and Pedrogão, rocky cliffs." },

  // ── FIGUEIRA DA FOZ / COIMBRA COAST ──────────────────────────────────────
  { id: "praia-de-leirosa", name: "Praia de Leirosa", region: "Centro", lat: 40.0297, lon: -8.8741, description: "Long dune beach south of Figueira da Foz, quiet." },
  { id: "praia-de-lavos", name: "Praia de Lavos", region: "Centro", lat: 40.1013, lon: -8.8951, description: "Sandy beach south of Figueira, backed by pine forest." },
  { id: "praia-do-cabedelo", name: "Praia do Cabedelo", region: "Centro", lat: 40.0918, lon: -8.9012, description: "Wide beach at the Mondego river mouth, good facilities.", hazards: "Strong currents near the river mouth." },
  { id: "praia-de-buarcos", name: "Praia de Buarcos", region: "Centro", lat: 40.1616, lon: -8.8823, description: "Fishing village beach just north of Figueira da Foz." },
  { id: "praia-de-figueira", name: "Praia de Figueira da Foz", region: "Centro", lat: 40.1491, lon: -8.8639, description: "One of the longest beaches in Portugal, vibrant casino town.", hazards: "Rip currents along the sandbanks, especially after storms. Stay between the flags." },
  { id: "praia-de-quiaios", name: "Praia de Quiaios", region: "Centro", lat: 40.2581, lon: -8.8097, description: "Wild dune beach north of Figueira, backed by pine forest.", hazards: "Strong rip currents. No lifeguard outside summer." },
  { id: "praia-de-tocha", name: "Praia de Tocha", region: "Centro", lat: 40.3269, lon: -8.7933, description: "Long beach near Cantanhede, pine dunes behind.", hazards: "Rip currents common on this stretch of coast." },
  { id: "praia-de-palheiros", name: "Praia de Palheirões", region: "Centro", lat: 40.3709, lon: -8.7994, description: "Quiet beach between Tocha and Mira, unspoilt." },
  { id: "praia-de-mira", name: "Praia de Mira", region: "Centro", lat: 40.4269, lon: -8.7919, description: "Tranquil lagoon-side beach with traditional ox carts." },
  { id: "praia-de-areao", name: "Praia de Areão", region: "Centro", lat: 40.3967, lon: -8.7955, description: "Wild beach between Mira and Tocha, pine forest backdrop." },

  // ── AVEIRO LAGOON COAST ───────────────────────────────────────────────────
  { id: "praia-de-vagueira", name: "Praia da Vagueira", region: "Centro", lat: 40.5462, lon: -8.7481, description: "Beach in the Aveiro lagoon area, popular resort." },
  { id: "praia-da-costa-nova", name: "Praia da Costa Nova", region: "Centro", lat: 40.5799, lon: -8.7476, description: "Famous for its striped candy-coloured houses.", hazards: "Strong rip currents and shore break. Always swim between the flags." },
  { id: "praia-da-barra", name: "Praia da Barra", region: "Centro", lat: 40.6352, lon: -8.7487, description: "Long beach near Aveiro, lighthouse at the river mouth.", hazards: "Strong currents near the lighthouse and river mouth." },
  { id: "praia-de-sao-jacinto", name: "Praia de São Jacinto", region: "Centro", lat: 40.6630, lon: -8.7506, description: "Wild nature reserve beach north of Aveiro, accessible by ferry.", hazards: "Exposed Atlantic beach. No lifeguard." },
  { id: "praia-da-torreira", name: "Praia da Torreira", region: "Centro", lat: 40.7508, lon: -8.7040, description: "Sandy beach on the Murtosa peninsula inside the Ria de Aveiro." },

  // ── OVAR / ESPINHO (South Porto coast) ────────────────────────────────────
  { id: "praia-de-furadouro", name: "Praia de Furadouro", region: "Norte", lat: 40.8619, lon: -8.6882, description: "Busy resort beach in Ovar, good facilities." },
  { id: "praia-de-cortegaca", name: "Praia de Cortegaça", region: "Norte", lat: 40.8950, lon: -8.6745, description: "Village beach with a fishing community atmosphere." },
  { id: "praia-de-esmoriz", name: "Praia de Esmoriz", region: "Norte", lat: 40.9556, lon: -8.6593, description: "Long beach at the south end of the Porto coastline." },
  { id: "praia-de-espinho", name: "Praia de Espinho", region: "Norte", lat: 41.0092, lon: -8.6418, description: "Urban beach south of Porto with a casino promenade.", hazards: "Rip currents and strong shore break typical of northern Portugal beaches." },
  { id: "praia-da-granja", name: "Praia da Granja", region: "Norte", lat: 41.0375, lon: -8.6419, description: "Traditional beach resort near Espinho, cliff walk nearby." },
  { id: "praia-de-miramar", name: "Praia de Miramar", region: "Norte", lat: 41.0782, lon: -8.6518, description: "Romantic beach with a small chapel on a rock in the sea." },
  { id: "praia-de-aguda", name: "Praia de Aguda", region: "Norte", lat: 41.0937, lon: -8.6567, description: "Rocky coastal beach with a marine biodiversity station." },
  { id: "praia-de-madalena", name: "Praia de Madalena", region: "Norte", lat: 41.1065, lon: -8.6594, description: "Urban beach south of Porto, popular with locals." },

  // ── PORTO METROPOLITAN ────────────────────────────────────────────────────
  { id: "praia-de-salgueiros", name: "Praia de Salgueiros", region: "Norte", lat: 41.1494, lon: -8.6759, description: "Small beach between Madalena and Valadares." },
  { id: "praia-de-valadares", name: "Praia de Valadares", region: "Norte", lat: 41.1263, lon: -8.6660, description: "Urban beach south of Porto with good access." },
  { id: "praia-de-matosinhos", name: "Praia de Matosinhos", region: "Norte", lat: 41.1870, lon: -8.6979, description: "Urban beach just north of Porto, famous fish restaurant strip.", hazards: "Rip currents. Irregular currents near the port." },
  { id: "praia-de-leca-da-palmeira", name: "Praia de Leça da Palmeira", region: "Norte", lat: 41.2011, lon: -8.7069, description: "Beach near the famous Leça swimming pools by Álvaro Siza." },
  { id: "praia-de-lavra", name: "Praia de Lavra", region: "Norte", lat: 41.2705, lon: -8.7339, description: "Long dune beach north of Porto, less crowded than Matosinhos." },
  { id: "praia-de-angeiras", name: "Praia de Angeiras", region: "Norte", lat: 41.2930, lon: -8.7476, description: "Small fishing village beach north of Porto." },
  { id: "praia-de-mindelo", name: "Praia de Mindelo", region: "Norte", lat: 41.3238, lon: -8.7475, description: "Dune beach near Vila do Conde, protected natural area." },

  // ── NORTE (Vila do Conde → Viana) ─────────────────────────────────────────
  { id: "praia-de-vila-do-conde", name: "Praia de Vila do Conde", region: "Norte", lat: 41.3522, lon: -8.7483, description: "Historic beach town at the mouth of the Ave river.", hazards: "River mouth creates unpredictable currents near the jetty." },
  { id: "praia-de-agucadoura", name: "Praia de Aguçadoura", region: "Norte", lat: 41.4175, lon: -8.7718, description: "Long beach between Vila do Conde and Póvoa de Varzim." },
  { id: "praia-de-povoa-de-varzim", name: "Praia de Póvoa de Varzim", region: "Norte", lat: 41.3801, lon: -8.7632, description: "City beach with a promenade and casino, good facilities." },
  { id: "praia-de-ofir", name: "Praia de Ofir", region: "Norte", lat: 41.4947, lon: -8.7767, description: "Beautiful dune beach in a protected natural area near Esposende.", hazards: "Rip currents. Strong shore break when swell is up." },
  { id: "praia-de-esposende", name: "Praia de Esposende", region: "Norte", lat: 41.5349, lon: -8.7761, description: "Town beach in Esposende, backed by a 16th century fort." },
  { id: "praia-de-apulia", name: "Praia de Apúlia", region: "Norte", lat: 41.5597, lon: -8.7785, description: "Long dune beach between Esposende and Viana, surf waves." },
  { id: "praia-de-marinhas", name: "Praia de Marinhas", region: "Norte", lat: 41.5930, lon: -8.7885, description: "Wild beach with strong Atlantic swell, north of Esposende." },
  { id: "praia-de-belinho", name: "Praia de Belinho", region: "Norte", lat: 41.6122, lon: -8.7994, description: "Quiet beach south of Viana, good surf break." },
  { id: "praia-do-cabedelo-viana", name: "Praia do Cabedelo (Viana)", region: "Norte", lat: 41.6755, lon: -8.8448, description: "Wide dune beach at the Lima river mouth, accessible by ferry from Viana.", hazards: "Strong currents near the river mouth." },
  { id: "praia-de-viana", name: "Praia de Viana do Castelo", region: "Norte", lat: 41.6888, lon: -8.8496, description: "Long beach under the iconic Santa Luzia basilica.", hazards: "Strong rip currents and powerful Atlantic swell. Northern Portugal water is cold year-round." },

  // ── MINHO COAST ───────────────────────────────────────────────────────────
  { id: "praia-de-ainda", name: "Praia de Âinda", region: "Norte", lat: 41.7310, lon: -8.8541, description: "Quiet beach between Viana and Âncora." },
  { id: "praia-de-ancora", name: "Praia de Âncora", region: "Norte", lat: 41.8069, lon: -8.8577, description: "Peaceful beach in the fishing village of Vila Praia de Âncora." },
  { id: "praia-de-moledo", name: "Praia de Moledo", region: "Norte", lat: 41.8448, lon: -8.8676, description: "Long beach near the Spanish border, backed by pine trees.", hazards: "Strong Atlantic swell common. Cold water." },
  { id: "praia-de-caminha", name: "Praia de Caminha", region: "Norte", lat: 41.8742, lon: -8.8432, description: "Beach at the Minho river mouth, facing the Spanish coast.", hazards: "Minho river currents near the estuary mouth. Cold water." },
  { id: "praia-de-mata", name: "Praia de Mata", region: "Norte", lat: 41.7935, lon: -8.8556, description: "Dune beach south of Moledo, very quiet and unspoilt." },
  { id: "praia-de-gelfa", name: "Praia de Gelfa", region: "Norte", lat: 41.8164, lon: -8.8599, description: "Long beach between Âncora and Moledo, pine forest behind." },

  // ── ALGARVE EXTRA COVES ───────────────────────────────────────────────────
  { id: "praia-do-almargem", name: "Praia do Almargem", region: "Algarve", lat: 37.1155, lon: -8.3098, description: "Quiet sandy beach between Lagoa and Armação, little-known.", },
  { id: "praia-de-vale-da-telha", name: "Praia de Vale da Telha", region: "Algarve", lat: 37.3696, lon: -8.8040, description: "Wild beach south of Aljezur in the natural park.", hazards: "Exposed Atlantic beach. Rip currents. No lifeguard." },
  { id: "praia-do-castelo", name: "Praia do Castelo", region: "Algarve", lat: 37.1635, lon: -8.4862, description: "Sheltered cove between Porches and Armação, often uncrowded." },
  { id: "praia-de-padrinho", name: "Praia do Padrinho", region: "Algarve", lat: 37.1241, lon: -8.4700, description: "Small cove east of Carvoeiro, quiet and scenic.", hazards: "Rocky seabed. Sea urchins." },
  { id: "praia-de-albandeira", name: "Praia de Albandeira", region: "Algarve", lat: 37.0936, lon: -8.3769, description: "Hidden cove between Armação and Lagoa, cave arch nearby.", hazards: "Rocky seabed. Sea urchins. Difficult access." },
  { id: "praia-do-alemao-tavira", name: "Praia do Alemão (Tavira)", region: "Algarve", lat: 37.1123, lon: -7.6270, description: "Quiet section of the Ilha de Tavira barrier island." },
  { id: "praia-de-pedras-d-el-rei", name: "Praia de Pedras d'El Rei", region: "Algarve", lat: 37.1252, lon: -7.6069, description: "Beach at the eastern end of Ilha de Tavira, accessible by miniature train.", hazards: "Tidal currents near the lagoon channel." },
  { id: "praia-de-meia-praia-tavira", name: "Praia da Meia Praia (Tavira)", region: "Algarve", lat: 37.1199, lon: -7.6476, description: "Central section of the Ilha de Tavira, popular with families." },
  { id: "praia-de-santa-luzia", name: "Praia de Santa Luzia", region: "Algarve", lat: 37.0843, lon: -7.6926, description: "Beach near the famous octopus fishing village of Santa Luzia." },
  { id: "praia-de-almadena", name: "Praia de Almádena", region: "Algarve", lat: 37.0781, lon: -8.7706, description: "Small cove between Luz and Burgau, calm and quiet.", hazards: "Rocky seabed. Shore break possible." },
  { id: "praia-de-barrigao", name: "Praia de Barrigão", region: "Algarve", lat: 37.1387, lon: -8.5165, description: "Wild beach north of Portimão, accessible via dirt track." },
  { id: "praia-do-poco-partido", name: "Praia do Poço Partido", region: "Algarve", lat: 37.0857, lon: -8.4051, description: "Secluded cove east of Marinha, rocky arch formations.", hazards: "Rocky seabed. Sea urchins. Difficult cliff access." },
  { id: "praia-de-vale-covo", name: "Praia de Vale Covo", region: "Algarve", lat: 37.0993, lon: -8.4395, description: "Small sheltered cove between Benagil and Marinha.", hazards: "Rocky seabed. Sea urchins." },
  { id: "praia-nova-portimao", name: "Praia Nova (Portimão)", region: "Algarve", lat: 37.1297, lon: -8.5447, description: "Long beach north of Ferragudo, backed by dunes." },
  { id: "praia-de-sao-joao-lagos", name: "Praia de São João (Lagos)", region: "Algarve", lat: 37.1030, lon: -8.6774, description: "Small beach east of Lagos at the base of clay cliffs." },

  // ── ALENTEJO EXTRA ────────────────────────────────────────────────────────
  { id: "praia-de-brejao", name: "Praia do Brejo Largo", region: "Alentejo", lat: 37.5590, lon: -8.8002, description: "Remote Vicentina coast beach, pine trees and dunes.", hazards: "Very exposed. No facilities. Rip currents." },
  { id: "praia-de-alteirinhos", name: "Praia de Alteirinhos", region: "Alentejo", lat: 37.6125, lon: -8.8021, description: "Wild beach near Zambujeira, part of the Vicentina natural park.", hazards: "Exposed Atlantic beach. Rip currents." },
  { id: "praia-de-queimado", name: "Praia do Queimado", region: "Alentejo", lat: 37.7551, lon: -8.8026, description: "Quiet beach near Milfontes, accessed via pine forest track.", hazards: "Rip currents. No lifeguard." },
  { id: "praia-das-furnas-milfontes", name: "Praia das Furnas (Milfontes)", region: "Alentejo", lat: 37.7062, lon: -8.7976, description: "Rocky beach south of Milfontes with sea caves.", hazards: "Rocky. Powerful swell. Sea caves dangerous in rough conditions." },
  { id: "praia-de-sines", name: "Praia de Sines", region: "Alentejo", lat: 37.9536, lon: -8.8658, description: "Town beach near the birthplace of Vasco da Gama." },
  { id: "praia-de-vasco-da-gama", name: "Praia de Vasco da Gama", region: "Alentejo", lat: 37.9619, lon: -8.8763, description: "Long sandy beach north of Sines, dune system behind." },
  { id: "praia-de-morgavel", name: "Praia de Morgavel", region: "Alentejo", lat: 37.9908, lon: -8.8289, description: "Remote beach south of Santiago do Cacém.", hazards: "No facilities. Rip currents." },
  { id: "praia-de-sao-torpes", name: "Praia de São Torpes", region: "Alentejo", lat: 37.9259, lon: -8.8728, description: "Long beach between Sines and Porto Covo, popular with windsurfers." },
  { id: "praia-do-pessegueirinho", name: "Praia do Pessegueirinho", region: "Alentejo", lat: 38.0437, lon: -8.7927, description: "Quiet dune beach north of Santo André lagoon." },
  { id: "praia-de-lagoa-de-santo-andre", name: "Lagoa de Santo André", region: "Alentejo", lat: 38.0780, lon: -8.8051, description: "Lagoon beach with calm freshwater swimming, popular with families." },

  // ── SETÚBAL EXTRA ─────────────────────────────────────────────────────────
  { id: "praia-de-outao", name: "Praia de Outão", region: "Setúbal", lat: 38.5037, lon: -8.9314, description: "Rocky beach at the Setúbal peninsula tip, dramatic cliffs.", hazards: "Rocky seabed. Strong currents in the Sado channel." },
  { id: "praia-de-santa-maria-setubal", name: "Praia de Santa Maria (Setúbal)", region: "Setúbal", lat: 38.5146, lon: -8.9052, description: "Long sandy beach north of Setúbal, family-friendly." },
  { id: "praia-de-comenda", name: "Praia da Comenda", region: "Setúbal", lat: 38.4667, lon: -9.0183, description: "Remote Arrábida cove accessible only from the sea.", hazards: "No road access. Rocky seabed. Very remote." },

  // ── LISBOA EXTRA ──────────────────────────────────────────────────────────
  { id: "praia-dos-galapagos", name: "Praia dos Galapagos", region: "Lisboa", lat: 38.7151, lon: -9.4050, description: "Small rocky cove west of Cascais, accessible via cliff path.", hazards: "Rocky seabed. Difficult access. Shore break." },
  { id: "praia-dos-medos", name: "Praia dos Medos", region: "Lisboa", lat: 38.7070, lon: -9.4082, description: "Small secluded beach between Cascais and Guincho.", hazards: "Rocky seabed. Shore break possible." },
  { id: "praia-da-parede", name: "Praia da Parede", region: "Lisboa", lat: 38.6836, lon: -9.3536, description: "Small beach in the town of Parede, between Cascais and Lisbon." },
  { id: "praia-de-santo-amaro-oeiras", name: "Praia de Santo Amaro (Oeiras)", region: "Lisboa", lat: 38.6767, lon: -9.3199, description: "Urban beach in Oeiras, near the historic Palácio do Marquês." },
  { id: "praia-de-sao-pedro-estoril-norte", name: "Praia de Monte Estoril", region: "Lisboa", lat: 38.7025, lon: -9.3836, description: "Small beach between São Pedro and Tamariz, good for families." },

  // ── OESTE EXTRA ───────────────────────────────────────────────────────────
  { id: "praia-da-calada", name: "Praia da Calada", region: "Oeste", lat: 39.1231, lon: -9.4217, description: "Secluded beach between Silveira and Fisica, rarely visited.", hazards: "Strong rip currents. No facilities." },
  { id: "praia-do-pisao", name: "Praia do Pisão", region: "Oeste", lat: 39.0689, lon: -9.4172, description: "Quiet beach south of Ericeira, accessed via a dirt road.", hazards: "Exposed to Atlantic swell. Rip currents." },
  { id: "praia-de-sao-lourenco-torres", name: "Praia de São Lourenço (Torres Vedras)", region: "Oeste", lat: 39.2440, lon: -9.3887, description: "Wild beach north of Santa Cruz.", hazards: "Exposed Atlantic beach. Rip currents." },
  { id: "praia-de-casais-da-lagoa", name: "Praia de Casais da Lagoa", region: "Oeste", lat: 39.4329, lon: -9.3316, description: "Small beach north of Baleal, quiet and undiscovered." },
  { id: "praia-da-foz-do-arelho", name: "Praia da Foz do Arelho", region: "Oeste", lat: 39.4441, lon: -9.2166, description: "Long beach at the Óbidos lagoon entrance, lagoon swimming on one side.", hazards: "Tidal currents near the lagoon channel." },
  { id: "praia-da-lagoa-de-obidos", name: "Lagoa de Óbidos", region: "Oeste", lat: 39.4396, lon: -9.2038, description: "Calm lagoon beach, ideal for families and stand-up paddle." },
  { id: "praia-de-nadadouro", name: "Praia de Nadadouro", region: "Oeste", lat: 39.4520, lon: -9.2294, description: "Beach on the north shore of the Óbidos lagoon, sheltered." },
  { id: "praia-de-sao-martinho-norte", name: "Praia de Salir do Porto", region: "Oeste", lat: 39.5296, lon: -9.1511, description: "Small beach in a cove north of São Martinho do Porto." },
  { id: "praia-de-paredes-da-vitoria", name: "Praia das Paredes da Vitória", region: "Centro", lat: 39.9105, lon: -8.8973, description: "Small beach between Vieira and Pedrógão, rocky cliffs." },

  // ── CENTRO EXTRA ──────────────────────────────────────────────────────────
  { id: "praia-de-gala", name: "Praia da Gala", region: "Centro", lat: 40.1193, lon: -8.8987, description: "Wide beach south of Figueira da Foz, dunes and pine forest.", hazards: "Rip currents. Stay between the flags." },
  { id: "praia-de-cabedelo-norte", name: "Praia de Cabedelo Norte", region: "Centro", lat: 40.1025, lon: -8.9087, description: "Beach north of the Mondego mouth, surf waves." },
  { id: "praia-de-cova-gala", name: "Praia de Cova-Gala", region: "Centro", lat: 40.1330, lon: -8.8911, description: "Beach village between Figueira and Gala, relaxed atmosphere." },
  { id: "praia-de-murtinheira", name: "Praia de Murtinheira", region: "Centro", lat: 40.2021, lon: -8.8643, description: "Quiet beach between Figueira and Quiaios, pine forest." },
  { id: "praia-de-costinha", name: "Praia de Costinha", region: "Centro", lat: 40.2295, lon: -8.8399, description: "Small beach near Quiaios, dune landscape." },
  { id: "praia-de-sao-pedro-de-moel-sul", name: "Praia de Légua", region: "Centro", lat: 39.7781, lon: -9.0119, description: "Wild beach south of São Pedro de Moel, pine dunes." },
  { id: "praia-de-pedrogao-norte", name: "Praia do Pedrógão Norte", region: "Centro", lat: 39.8612, lon: -8.9762, description: "Northern section of the Pedrógão beach, quieter." },
  { id: "praia-de-sao-pedro-norte", name: "Praia de São Pedro de Moel Norte", region: "Centro", lat: 39.7668, lon: -9.0304, description: "Northern part of São Pedro de Moel, rocky cliffs and dunes." },
  { id: "praia-de-labrego", name: "Praia do Leiroso", region: "Centro", lat: 40.0538, lon: -8.9005, description: "Wild dune beach south of Figueira, pine forest behind." },
  { id: "praia-de-areeiro", name: "Praia do Areeiro", region: "Centro", lat: 40.5210, lon: -8.7477, description: "Quiet beach south of Vagueira in the Aveiro lagoon area." },
  { id: "praia-do-poco-da-cruz", name: "Praia do Poço da Cruz", region: "Centro", lat: 40.5635, lon: -8.7477, description: "Beach between Vagueira and Costa Nova, sheltered." },
  { id: "praia-de-labrego-aveiro", name: "Praia do Lido", region: "Centro", lat: 40.6166, lon: -8.7484, description: "Beach between Costa Nova and Barra, quieter stretch." },
  { id: "praia-da-torreira-sul", name: "Praia de Muranzel", region: "Centro", lat: 40.7284, lon: -8.7098, description: "Beach on the Murtosa peninsula, lagoon on one side." },
  { id: "praia-de-sao-paio", name: "Praia de São Paio", region: "Centro", lat: 40.7793, lon: -8.6967, description: "Northern Aveiro lagoon beach near the Mira channel." },
  { id: "praia-de-esgueira", name: "Praia de Esgueira", region: "Centro", lat: 40.6551, lon: -8.7236, description: "Small beach inside the Aveiro lagoon, calm water." },
  { id: "praia-de-arda", name: "Praia de Arda", region: "Norte", lat: 40.9003, lon: -8.6635, description: "Beach between Cortegaça and Esmoriz, quiet." },
  { id: "praia-de-paramos", name: "Praia de Paramos", region: "Norte", lat: 40.9260, lon: -8.6695, description: "Small beach between Esmoriz and Espinho." },
  { id: "praia-de-silvalde", name: "Praia de Silvalde", region: "Norte", lat: 40.9784, lon: -8.6570, description: "Beach between Espinho and Porto, urban fringe." },

  // ── NORTE EXTRA ───────────────────────────────────────────────────────────
  { id: "praia-de-foz-do-douro", name: "Praia de Foz do Douro", region: "Norte", lat: 41.1529, lon: -8.6767, description: "Beach at the Douro river mouth, iconic Porto landmark.", hazards: "Strong Douro river currents near the river mouth." },
  { id: "praia-do-ourigo", name: "Praia do Ourigo", region: "Norte", lat: 41.1558, lon: -8.6792, description: "Small beach just south of the Douro mouth, rocky." },
  { id: "praia-de-nevogilde", name: "Praia de Nevogilde", region: "Norte", lat: 41.1616, lon: -8.6802, description: "Beach next to the Serralves park coastline, Porto." },
  { id: "praia-dos-ingleses", name: "Praia dos Ingleses", region: "Norte", lat: 41.1668, lon: -8.6851, description: "Rocky urban beach north of Foz do Douro, Porto." },
  { id: "praia-do-homem-do-leme", name: "Praia do Homem do Leme", region: "Norte", lat: 41.1720, lon: -8.6878, description: "Small beach north of Porto city, named after a historic statue." },
  { id: "praia-de-gondarém", name: "Praia de Gondarém", region: "Norte", lat: 41.2165, lon: -8.7157, description: "Small beach between Leça and Lavra, local favourite." },
  { id: "praia-de-costinha-norte", name: "Praia de Costinha (Norte)", region: "Norte", lat: 41.2432, lon: -8.7286, description: "Small beach between Angeiras and Lavra." },
  { id: "praia-de-castelo-do-neiva", name: "Praia de Castelo do Neiva", region: "Norte", lat: 41.5852, lon: -8.7900, description: "Long dune beach between Esposende and Viana, quiet." },
  { id: "praia-de-afife", name: "Praia de Afife", region: "Norte", lat: 41.7493, lon: -8.8516, description: "Wild beach between Viana and Âncora, protected dunes.", hazards: "Strong Atlantic swell. Rip currents." },
  { id: "praia-de-darque", name: "Praia de Darque", region: "Norte", lat: 41.6920, lon: -8.8561, description: "Long beach north of Viana, backed by dunes and pine." },
  { id: "praia-de-carreço", name: "Praia de Carreço", region: "Norte", lat: 41.7254, lon: -8.8531, description: "Wild beach between Viana and Afife, rocky cliffs." },
  { id: "praia-de-vila-mou", name: "Praia de Vila Mou", region: "Norte", lat: 41.8293, lon: -8.8624, description: "Small beach between Moledo and Âncora, quiet." },
  { id: "praia-de-deao", name: "Praia de Deão", region: "Norte", lat: 41.8596, lon: -8.8668, description: "Small beach near Caminha, pine forest." },
  { id: "praia-fluvial-de-caminha", name: "Praia Fluvial de Caminha", region: "Norte", lat: 41.8759, lon: -8.8320, description: "River beach on the Minho, views to Spain. Calm freshwater swimming." },
  { id: "praia-de-lanhelas", name: "Praia de Lanhelas", region: "Norte", lat: 41.8873, lon: -8.7916, description: "River beach on the Minho, sheltered, very calm water." },
  { id: "praia-da-figueira-caminha", name: "Praia da Figueira (Caminha)", region: "Norte", lat: 41.8631, lon: -8.8612, description: "Atlantic beach near the Minho estuary.", hazards: "Minho river currents near the mouth. Cold Atlantic water." },
  { id: "praia-de-dem", name: "Praia de Dem", region: "Norte", lat: 41.6532, lon: -8.7962, description: "Quiet beach between Viana and Esposende, dunes." },

  // ── ALGARVE FINAL COVES ───────────────────────────────────────────────────
  { id: "praia-de-vale-navio", name: "Praia de Vale Navio", region: "Algarve", lat: 37.0928, lon: -8.2153, description: "Small cove near Albufeira, quieter than the resort beaches.", hazards: "Rocky seabed." },
  { id: "praia-das-fontainhas", name: "Praia das Fontainhas", region: "Algarve", lat: 37.0958, lon: -8.3010, description: "Quiet beach between Galé and Salgados." },
  { id: "praia-do-paraiso", name: "Praia do Paraíso", region: "Algarve", lat: 37.0981, lon: -8.4296, description: "Small cove between Benagil and Marinha, natural rock arch.", hazards: "Rocky seabed. Sea urchins." },
  { id: "praia-de-vale-de-boi", name: "Praia de Vale de Boi", region: "Algarve", lat: 37.0822, lon: -8.7506, description: "Secluded cove near Burgau, accessible by walking trail.", hazards: "Rocky seabed. Shore break." },
  { id: "praia-de-vale-santo", name: "Praia de Vale Santo", region: "Algarve", lat: 37.3195, lon: -8.8388, description: "Wild beach in the Vicentina natural park, rarely visited.", hazards: "No facilities. Rip currents. Long hike to access." },

  // ── OESTE FINAL ───────────────────────────────────────────────────────────
  { id: "praia-de-porto-dinheiro", name: "Praia de Porto Dinheiro", region: "Oeste", lat: 39.1876, lon: -9.3919, description: "Beach near Lourinhã, dinosaur fossil coastline.", hazards: "Shore break. Rip currents." },
  { id: "praia-do-lido-nazare", name: "Praia do Lido (Nazaré)", region: "Oeste", lat: 39.6050, lon: -9.0715, description: "South end of Nazaré beach, slightly calmer section.", hazards: "Underwater canyon creates dangerous currents. Never swim alone." },
  { id: "praia-do-bom-sucesso", name: "Praia do Bom Sucesso", region: "Oeste", lat: 39.4617, lon: -9.2442, description: "Beach near Óbidos lagoon, great for kitesurfing." },
  { id: "praia-de-nazar-sul", name: "Praia de Salgado (Sul)", region: "Oeste", lat: 39.5320, lon: -9.0948, description: "Wild dune beach between Nazaré and São Martinho." },

  // ── CENTRO FINAL ──────────────────────────────────────────────────────────
  { id: "praia-de-sao-pedro-maceda", name: "Praia de São Pedro de Maceda", region: "Centro", lat: 40.8376, lon: -8.6789, description: "Small beach north of Furadouro, quieter stretch." },
  { id: "praia-de-carregal", name: "Praia de Carregal", region: "Centro", lat: 40.8145, lon: -8.6877, description: "Beach between Furadouro and São Paio, dune landscape." },
  { id: "praia-de-vagueirinha", name: "Praia de Vagueirinha", region: "Centro", lat: 40.5652, lon: -8.7477, description: "Small beach south of Vagueira, quiet." },
  { id: "praia-de-mar-e-sol", name: "Praia de Mar e Sol", region: "Centro", lat: 40.5870, lon: -8.7479, description: "Beach between Vagueira and Costa Nova." },
  { id: "praia-da-bairrada", name: "Praia da Bairrada", region: "Centro", lat: 40.2820, lon: -8.8200, description: "Wild beach near the Bairrada wine region coast.", hazards: "Rip currents. No lifeguard." },

  // ── NORTE FINAL ───────────────────────────────────────────────────────────
  { id: "praia-de-areosa", name: "Praia de Areosa", region: "Norte", lat: 41.7053, lon: -8.8485, description: "Beach between Viana and Darque, dunes and pines." },
  { id: "praia-de-chafe", name: "Praia de Chafé", region: "Norte", lat: 41.7163, lon: -8.8516, description: "Quiet beach north of Darque, less developed." },
  { id: "praia-viana-norte", name: "Praia Norte (Viana do Castelo)", region: "Norte", lat: 41.7009, lon: -8.8478, description: "Northern stretch of Viana beach, less crowded.", hazards: "Strong Atlantic swell. Rip currents." },
  { id: "praia-de-ancora-norte", name: "Praia Norte (Âncora)", region: "Norte", lat: 41.8109, lon: -8.8592, description: "Northern section of Âncora beach, rockier and quieter.", hazards: "Rocky seabed. Shore break." },
  { id: "praia-fluvial-caminha", name: "Praia Fluvial de Caminha", region: "Norte", lat: 41.8759, lon: -8.8320, description: "River beach on the Minho, views to Spain. Calm freshwater." },

])().map((beach) => {
  const structuredHazards = CAPARICA_HAZARDS[beach.id];
  return {
    ...beach,
    lifeguard: LIFEGUARD[beach.id],
    ...(structuredHazards ? { structuredHazards } : {}),
  };
});

export function findNearestBeach(lat: number, lon: number): Beach {
  return BEACHES.reduce((nearest, beach) => {
    const d = Math.hypot(beach.lat - lat, beach.lon - lon);
    const nd = Math.hypot(nearest.lat - lat, nearest.lon - lon);
    return d < nd ? beach : nearest;
  });
}

export function getBeachById(id: string): Beach | undefined {
  return BEACHES.find((b) => b.id === id);
}
