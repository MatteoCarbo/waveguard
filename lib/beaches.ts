import { Beach } from "@/types";

export const BEACHES: Beach[] = [

  // ── ALGARVE (East → West) ─────────────────────────────────────────────────
  { id: "praia-de-monte-gordo", name: "Praia de Monte Gordo", region: "Algarve", lat: 37.1793, lon: -7.4636, description: "Wide sandy beach near the Spanish border, warm shallow water." },
  { id: "praia-verde", name: "Praia Verde", region: "Algarve", lat: 37.1853, lon: -7.5011, description: "Quiet pine-backed beach east of Castro Marim." },
  { id: "praia-de-manta-rota", name: "Praia de Manta Rota", region: "Algarve", lat: 37.1712, lon: -7.5247, description: "Calm barrier island beach, good for families." },
  { id: "praia-de-cacela-velha", name: "Praia de Cacela Velha", region: "Algarve", lat: 37.1618, lon: -7.5553, description: "Remote beach below a whitewashed hilltop village, no road access.", hazards: "Accessible only by boat. Strong tidal currents near the lagoon channel." },
  { id: "praia-da-ilha-de-tavira", name: "Ilha de Tavira", region: "Algarve", lat: 37.0973, lon: -7.6512, description: "Barrier island beach, reachable by ferry from Tavira.", hazards: "Tidal currents near the ferry channel. Watch children near the lagoon side." },
  { id: "praia-de-fuzeta", name: "Praia de Fuzeta", region: "Algarve", lat: 37.0587, lon: -7.7388, description: "Peaceful island beach with a lagoon behind, accessible by ferry.", hazards: "Tidal currents near estuary mouth." },
  { id: "praia-de-faro", name: "Praia de Faro", region: "Algarve", lat: 36.9959, lon: -7.9556, description: "Long barrier island beach serving the Algarve capital.", hazards: "Strong currents near the channel entrance. Aircraft noise from nearby airport." },
  { id: "praia-da-falesia", name: "Praia da Falésia", region: "Algarve", lat: 37.0784, lon: -8.1688, description: "Striking red and orange ochre cliffs stretching 6km.", hazards: "Cliff erosion — do not stand near the cliff base. Rocky seabed in places." },
  { id: "praia-de-vilamoura", name: "Praia de Vilamoura", region: "Algarve", lat: 37.0797, lon: -8.1240, description: "Well-serviced beach next to the famous Vilamoura marina." },
  { id: "praia-de-vale-do-lobo", name: "Praia de Vale do Lobo", region: "Algarve", lat: 37.0735, lon: -8.0268, description: "Exclusive resort beach with orange sandstone cliffs." },
  { id: "praia-de-quarteira", name: "Praia de Quarteira", region: "Algarve", lat: 37.0652, lon: -8.1005, description: "Popular family beach on the Golden Triangle coast." },
  { id: "praia-da-oura", name: "Praia da Oura", region: "Algarve", lat: 37.0877, lon: -8.2213, description: "Lively beach in Albufeira's tourist strip, good facilities." },
  { id: "praia-de-albufeira", name: "Praia de Albufeira", region: "Algarve", lat: 37.0852, lon: -8.2510, description: "The main town beach of Albufeira, surrounded by restaurants." },
  { id: "praia-de-sao-rafael", name: "Praia de São Rafael", region: "Algarve", lat: 37.0770, lon: -8.2609, description: "Scenic small cove with golden rock formations.", hazards: "Rocky seabed and outcrops. Snorkelling is great but watch your footing." },
  { id: "praia-de-gale", name: "Praia de Galé", region: "Algarve", lat: 37.0813, lon: -8.2953, description: "Long sandy beach between Albufeira and Armação de Pêra." },
  { id: "praia-de-armacao", name: "Praia de Armação de Pêra", region: "Algarve", lat: 37.1024, lon: -8.3560, description: "Wide sandy beach in a traditional fishing village." },
  { id: "praia-de-benagil", name: "Praia de Benagil", region: "Algarve", lat: 37.0892, lon: -8.4258, description: "Famous for its sea cave; very small beach, big swell.", hazards: "Very small beach with strong shore break. Cave access by kayak or boat only — swimming to the cave is dangerous." },
  { id: "praia-da-marinha", name: "Praia da Marinha", region: "Algarve", lat: 37.0893, lon: -8.4147, description: "Dramatic limestone cliffs, crystal-clear water.", hazards: "Rocky and uneven seabed. Sea urchins near rocks. Entry and exit can be slippery." },
  { id: "praia-do-carvoeiro", name: "Praia do Carvoeiro", region: "Algarve", lat: 37.1008, lon: -8.4668, description: "Pretty cove nestled between cliffs in the village of Carvoeiro.", hazards: "Rocky seabed at the sides. Shore break when waves are up." },
  { id: "praia-de-ferragudo", name: "Praia de Ferragudo", region: "Algarve", lat: 37.1155, lon: -8.5345, description: "Charming sandy beach below the castle of Ferragudo." },
  { id: "praia-da-rocha", name: "Praia da Rocha", region: "Algarve", lat: 37.1146, lon: -8.5315, description: "Iconic golden beach in Portimão, great facilities." },
  { id: "praia-de-alvor", name: "Praia de Alvor", region: "Algarve", lat: 37.1219, lon: -8.5927, description: "Long beach at the mouth of the Alvor estuary.", hazards: "Strong currents near the estuary channel. Avoid swimming near the river mouth." },
  { id: "praia-de-meia-praia", name: "Praia de Meia Praia", region: "Algarve", lat: 37.1108, lon: -8.7028, description: "Long sandy beach near Lagos, sheltered bay." },
  { id: "praia-dona-ana", name: "Praia Dona Ana", region: "Algarve", lat: 37.0965, lon: -8.6698, description: "Postcard-perfect beach near Lagos.", hazards: "Rocky areas at the sides. Sea urchins near cliff base." },
  { id: "praia-do-camilo", name: "Praia do Camilo", region: "Algarve", lat: 37.0875, lon: -8.6742, description: "Hidden gem accessible via wooden staircase.", hazards: "Rocky seabed. Very small beach — can become crowded quickly." },
  { id: "praia-de-luz", name: "Praia de Luz", region: "Algarve", lat: 37.0888, lon: -8.7293, description: "Relaxed village beach with calm water and a promenade." },
  { id: "praia-de-burgau", name: "Praia de Burgau", region: "Algarve", lat: 37.0754, lon: -8.7563, description: "Small beach in a traditional fishing village, rugged cliffs.", hazards: "Rocky seabed. Shore break when swell is up." },
  { id: "praia-de-salema", name: "Praia de Salema", region: "Algarve", lat: 37.0631, lon: -8.8086, description: "Unspoilt village beach, one of the last authentic fishing spots.", hazards: "Shore break possible. Fishing boats launch here — be aware." },
  { id: "praia-do-martinhal", name: "Praia do Martinhal", region: "Algarve", lat: 36.9996, lon: -8.9132, description: "Sheltered bay near Sagres, great for water sports.", hazards: "Strong winds common — good for kitesurfing but choppy for swimmers." },
  { id: "praia-de-sagres", name: "Praia de Sagres", region: "Algarve", lat: 37.0097, lon: -8.9368, description: "Wild, windswept beach at Portugal's southwest tip.", hazards: "Powerful shore break and strong rip currents. Frequently closed to swimming. Not suitable for children." },
  { id: "praia-de-beliche", name: "Praia de Beliche", region: "Algarve", lat: 37.0175, lon: -8.9947, description: "Remote Atlantic cove accessible via steep cliffs.", hazards: "Very exposed to Atlantic swell. Dangerous in all but the calmest conditions. Steep cliff access." },
  { id: "praia-de-odeceixe", name: "Praia de Odeceixe", region: "Algarve", lat: 37.4527, lon: -8.7723, description: "Stunning estuary beach on the Alentejo border.", hazards: "River current near estuary mouth. Atlantic side has strong waves — stick to the calmer river side." },

  // ── ALENTEJO COAST ───────────────────────────────────────────────────────
  { id: "praia-de-amoreira", name: "Praia de Amoreira", region: "Alentejo", lat: 37.4061, lon: -8.7607, description: "River-meets-ocean beach backed by dunes.", hazards: "River currents near the estuary. Strong Atlantic swell on the open side." },
  { id: "praia-da-arrifana", name: "Praia da Arrifana", region: "Alentejo", lat: 37.2974, lon: -8.8619, description: "Dramatic clifftop setting, popular surf break.", hazards: "Powerful shore break and rip currents. For experienced swimmers only." },
  { id: "praia-de-monte-clerigo", name: "Praia de Monte Clérigo", region: "Alentejo", lat: 37.3458, lon: -8.8280, description: "Wild Atlantic beach in the Vicentina coast natural park.", hazards: "Exposed Atlantic beach. Rip currents and strong shore break. No lifeguard most of the year." },
  { id: "praia-da-bordeira", name: "Praia da Bordeira", region: "Alentejo", lat: 37.2340, lon: -8.8748, description: "Vast beach with impressive dunes and a river estuary.", hazards: "Strong rip currents, especially near the river channel. Very exposed." },
  { id: "praia-do-amado", name: "Praia do Amado", region: "Alentejo", lat: 37.1669, lon: -8.8977, description: "Classic surf beach with a consistent break, natural park.", hazards: "Rip currents along the sandbanks. Surfers in the water." },
  { id: "praia-de-porto-covo", name: "Praia de Porto Covo", region: "Alentejo", lat: 37.8533, lon: -8.7862, description: "Rugged cliffs and strong Atlantic swell.", hazards: "Powerful swell and rocky seabed. Rip currents near the cliffs. Not suitable for weak swimmers." },
  { id: "praia-da-ilha-do-pessegueiro", name: "Ilha do Pessegueiro", region: "Alentejo", lat: 37.8353, lon: -8.7954, description: "Facing a small island, remote and beautiful.", hazards: "Exposed Atlantic beach. Rip currents possible. No lifeguard most of the year." },
  { id: "praia-de-melides", name: "Praia de Melides", region: "Alentejo", lat: 38.1997, lon: -8.7310, description: "Remote lagoon and ocean beach, increasingly fashionable.", hazards: "Strong rip currents. No lifeguard outside summer." },
  { id: "praia-de-santo-andre", name: "Praia de Santo André", region: "Alentejo", lat: 37.9912, lon: -8.7943, description: "Long beach beside a lagoon, pine forest behind." },
  { id: "praia-de-comporta", name: "Praia de Comporta", region: "Alentejo", lat: 38.3653, lon: -8.7728, description: "Unspoilt wild beach with rice fields behind.", hazards: "Strong rip currents along this stretch of coast. No lifeguard outside summer season." },
  { id: "praia-de-troia", name: "Praia de Tróia", region: "Alentejo", lat: 38.4897, lon: -8.8980, description: "Peninsula beach with turquoise, calm water." },

  // ── SETÚBAL / ARRÁBIDA ───────────────────────────────────────────────────
  { id: "praia-de-setubal", name: "Praia de Setúbal", region: "Setúbal", lat: 38.4958, lon: -8.8983, description: "Long beach facing the Sado estuary." },
  { id: "praia-de-troia-rei", name: "Praia de Tróia-Rei", region: "Setúbal", lat: 38.5107, lon: -8.8953, description: "Northern tip of the Tróia peninsula, calm Sado estuary waters." },
  { id: "praia-do-portinho-da-arrabida", name: "Portinho da Arrábida", region: "Setúbal", lat: 38.4870, lon: -8.9587, description: "Turquoise Mediterranean-like water, protected natural park.", hazards: "Rocky seabed. Sea urchins near rocks. Boat traffic in summer — stay in designated swimming areas." },
  { id: "praia-do-galapinhos", name: "Praia do Galapinhos", region: "Setúbal", lat: 38.4778, lon: -8.9433, description: "Remote cove in Arrábida, accessible only on foot or by boat.", hazards: "No facilities. Rocky seabed and sea urchins. Rough access path." },
  { id: "praia-do-creiro", name: "Praia do Creiro", region: "Setúbal", lat: 38.4818, lon: -8.9613, description: "Quiet pebble and sand beach near Sesimbra.", hazards: "Rocky seabed, sea urchins. Pebble entry." },
  { id: "praia-da-arrabida", name: "Praia da Arrábida", region: "Setúbal", lat: 38.4741, lon: -8.9735, description: "Mediterranean-like turquoise water inside a nature park.", hazards: "Rocky seabed in places. Sea urchins near rocks. Boat traffic in summer." },
  { id: "praia-de-sesimbra", name: "Praia de Sesimbra", region: "Setúbal", lat: 38.4438, lon: -9.1001, description: "Sheltered bay with a Moorish castle above." },
  { id: "praia-de-sesimbra-do-ouro", name: "Praia do Ouro (Sesimbra)", region: "Setúbal", lat: 38.4416, lon: -9.0885, description: "Small beach east of Sesimbra, calmer and less crowded." },

  // ── COSTA DA CAPARICA ────────────────────────────────────────────────────
  { id: "praia-de-caparica-norte", name: "Praia de Caparica (Norte)", region: "Lisboa", lat: 38.5638, lon: -9.2382, description: "Northern end of the 30km Caparica coast, closest to Lisbon." },
  { id: "praia-de-caparica-central", name: "Praia de Caparica (Central)", region: "Lisboa", lat: 38.5410, lon: -9.2349, description: "Lively central section of Costa da Caparica, great facilities." },
  { id: "praia-de-caparica-sul", name: "Praia de Caparica (Sul)", region: "Lisboa", lat: 38.4977, lon: -9.2213, description: "Quieter southern end of Caparica, less crowded." },

  // ── ESTORIL LINE ─────────────────────────────────────────────────────────
  { id: "praia-de-carcavelos", name: "Praia de Carcavelos", region: "Lisboa", lat: 38.6895, lon: -9.3359, description: "Wide beach near Lisbon, popular with surfers and families.", hazards: "Rip currents and strong shore break. Surf school area — watch for boards." },
  { id: "praia-de-sao-pedro-do-estoril", name: "Praia de São Pedro do Estoril", region: "Lisboa", lat: 38.7009, lon: -9.3758, description: "Small sheltered beach along the Estoril coast." },
  { id: "praia-de-estoril", name: "Praia de Estoril", region: "Lisboa", lat: 38.7029, lon: -9.3955, description: "Classic beach in front of the Estoril casino and gardens." },
  { id: "praia-de-cascais", name: "Praia de Cascais", region: "Lisboa", lat: 38.6979, lon: -9.4215, description: "Town beach in the cosmopolitan Cascais bay." },
  { id: "praia-de-guincho", name: "Praia do Guincho", region: "Lisboa", lat: 38.7272, lon: -9.4747, description: "Wild Atlantic beach, often windy — a kite surfer's paradise.", hazards: "Very strong and persistent winds. Rip currents common. Swimming is frequently prohibited. Suitable for experienced water sports only." },

  // ── SINTRA COAST ─────────────────────────────────────────────────────────
  { id: "praia-de-adraga", name: "Praia de Adraga", region: "Lisboa", lat: 38.8037, lon: -9.4828, description: "Wild cove south of Sintra, rugged cliffs and natural beauty.", hazards: "Strong shore break and rip currents. No lifeguard outside summer." },
  { id: "praia-das-macas", name: "Praia das Maçãs", region: "Lisboa", lat: 38.8262, lon: -9.4741, description: "Village beach north of Sintra, charming and relaxed." },
  { id: "praia-grande", name: "Praia Grande", region: "Lisboa", lat: 38.8215, lon: -9.4802, description: "Wide beach north of Sintra, popular with surfers.", hazards: "Strong rip currents and powerful shore break. Frequently has red or yellow flags. Children must be supervised at all times." },
  { id: "praia-de-sao-juliao", name: "Praia de São Julião", region: "Lisboa", lat: 38.8399, lon: -9.4703, description: "Long beach north of Sintra, quieter than Praia Grande.", hazards: "Rip currents and strong Atlantic swell." },

  // ── ERICEIRA ─────────────────────────────────────────────────────────────
  { id: "praia-de-sao-sebastiao", name: "Praia de São Sebastião", region: "Oeste", lat: 38.9617, lon: -9.4191, description: "Main beach of Ericeira, sandy with good facilities." },
  { id: "praia-de-ribeira-d-ilhas", name: "Ribeira d'Ilhas", region: "Oeste", lat: 38.9901, lon: -9.4260, description: "World Surfing Reserve. Iconic right-hand point break.", hazards: "Powerful surf. Rocks. For experienced water sports only. Avoid when swell is active." },
  { id: "praia-de-sao-lourenco", name: "Praia de São Lourenço", region: "Oeste", lat: 38.9983, lon: -9.4185, description: "Smaller beach north of Ericeira, popular with locals.", hazards: "Rocky entry points. Shore break possible." },

  // ── SANTA CRUZ / TORRES VEDRAS ───────────────────────────────────────────
  { id: "praia-de-santa-cruz", name: "Praia de Santa Cruz", region: "Oeste", lat: 39.2167, lon: -9.3926, description: "Large beach near Torres Vedras with good facilities.", hazards: "Strong rip currents and shore break. Always swim between the flags." },
  { id: "praia-de-porto-novo", name: "Praia de Porto Novo", region: "Oeste", lat: 39.2617, lon: -9.3936, description: "Wild beach near Vimeiro, backed by cliffs.", hazards: "Exposed Atlantic beach. Rip currents common." },

  // ── PENICHE ──────────────────────────────────────────────────────────────
  { id: "praia-de-consolacao", name: "Praia da Consolação", region: "Oeste", lat: 39.3194, lon: -9.3744, description: "Long beach south of Peniche, popular with families." },
  { id: "praia-de-peniche", name: "Praia de Peniche", region: "Oeste", lat: 39.3556, lon: -9.3810, description: "Near the world-famous Supertubos surf break.", hazards: "Heavy shore break. Rip currents along the sandbanks. Surfers in the water — be aware of boards." },
  { id: "praia-de-baleal", name: "Praia do Baleal", region: "Oeste", lat: 39.3797, lon: -9.3430, description: "Charming isthmus beach with surf schools.", hazards: "Rip currents near the sandbar. Surf school area — watch for beginners on boards." },
  { id: "praia-da-lagide", name: "Praia da Lagide", region: "Oeste", lat: 39.3873, lon: -9.3397, description: "Small cove on the Baleal peninsula, calmer water.", hazards: "Rocky seabed. Limited space." },

  // ── NAZARÉ / SILVER COAST ────────────────────────────────────────────────
  { id: "praia-de-sao-martinho", name: "São Martinho do Porto", region: "Oeste", lat: 39.5103, lon: -9.1413, description: "Almost circular sheltered bay — perfect for kids and families." },
  { id: "praia-da-nazare", name: "Praia de Nazaré", region: "Oeste", lat: 39.6007, lon: -9.0712, description: "Famous for record-breaking waves in winter; calmer in summer.", hazards: "Dangerous currents year-round due to the underwater canyon. Even in summer, rip currents are common. Local warning: never swim alone here." },
  { id: "praia-do-norte-nazare", name: "Praia do Norte (Nazaré)", region: "Oeste", lat: 39.6140, lon: -9.0738, description: "Where Garrett McNamara surfed the world's biggest wave.", hazards: "Extremely dangerous. Do not enter the water under any circumstances. Observation only." },
  { id: "praia-de-sao-bernardino", name: "Praia de São Bernardino", region: "Oeste", lat: 39.4108, lon: -9.3390, description: "Exposed beach north of Peniche with consistent surf.", hazards: "Strong rip currents and shore break." },

  // ── CENTRO ───────────────────────────────────────────────────────────────
  { id: "praia-de-figueira", name: "Praia de Figueira da Foz", region: "Centro", lat: 40.1491, lon: -8.8639, description: "One of the longest beaches in Portugal, vibrant casino town.", hazards: "Rip currents along the sandbanks, especially after storms. Stay between the flags." },
  { id: "praia-de-quiaios", name: "Praia de Quiaios", region: "Centro", lat: 40.2581, lon: -8.8097, description: "Wild dune beach north of Figueira, backed by pine forest.", hazards: "Strong rip currents. No lifeguard outside summer." },
  { id: "praia-de-mira", name: "Praia de Mira", region: "Centro", lat: 40.4269, lon: -8.7919, description: "Tranquil lagoon-side beach with traditional ox carts." },
  { id: "praia-de-tocha", name: "Praia de Tocha", region: "Centro", lat: 40.3269, lon: -8.7933, description: "Long beach near Cantanhede, pine dunes behind.", hazards: "Rip currents common on this stretch of coast." },
  { id: "praia-da-costa-nova", name: "Praia da Costa Nova", region: "Centro", lat: 40.5799, lon: -8.7476, description: "Famous for its striped candy-coloured houses.", hazards: "Strong rip currents and shore break. Always swim between the flags." },
  { id: "praia-da-barra", name: "Praia da Barra", region: "Centro", lat: 40.6352, lon: -8.7487, description: "Long beach near Aveiro, lighthouse at the river mouth.", hazards: "Strong currents near the lighthouse and river mouth." },
  { id: "praia-de-sao-jacinto", name: "Praia de São Jacinto", region: "Centro", lat: 40.6630, lon: -8.7506, description: "Wild nature reserve beach north of Aveiro, accessible by ferry.", hazards: "Exposed Atlantic beach. No lifeguard." },
  { id: "praia-de-furadouro", name: "Praia de Furadouro", region: "Centro", lat: 40.8619, lon: -8.6882, description: "Busy resort beach in Ovar, good facilities." },
  { id: "praia-de-cortegaca", name: "Praia de Cortegaça", region: "Centro", lat: 40.8950, lon: -8.6745, description: "Village beach with a fishing community atmosphere." },

  // ── NORTE ────────────────────────────────────────────────────────────────
  { id: "praia-de-esmoriz", name: "Praia de Esmoriz", region: "Norte", lat: 40.9556, lon: -8.6593, description: "Long beach at the south end of the Porto coastline." },
  { id: "praia-de-espinho", name: "Praia de Espinho", region: "Norte", lat: 41.0092, lon: -8.6418, description: "Urban beach south of Porto with a casino promenade.", hazards: "Rip currents and strong shore break typical of northern Portugal beaches." },
  { id: "praia-da-granja", name: "Praia da Granja", region: "Norte", lat: 41.0375, lon: -8.6419, description: "Traditional beach resort near Espinho, cliff walk nearby." },
  { id: "praia-de-miramar", name: "Praia de Miramar", region: "Norte", lat: 41.0782, lon: -8.6518, description: "Romantic beach with a small chapel on a rock in the sea." },
  { id: "praia-de-aguda", name: "Praia de Aguda", region: "Norte", lat: 41.0937, lon: -8.6567, description: "Rocky coastal beach with a marine biodiversity station." },
  { id: "praia-de-matosinhos", name: "Praia de Matosinhos", region: "Norte", lat: 41.1870, lon: -8.6979, description: "Urban beach just north of Porto, next to the famous fish restaurants.", hazards: "Rip currents. The port area creates some irregular currents." },
  { id: "praia-de-lavra", name: "Praia de Lavra", region: "Norte", lat: 41.2705, lon: -8.7339, description: "Long dune beach north of Porto, less crowded than Matosinhos." },
  { id: "praia-de-vila-do-conde", name: "Praia de Vila do Conde", region: "Norte", lat: 41.3522, lon: -8.7483, description: "Historic beach town at the mouth of the Ave river.", hazards: "River mouth creates unpredictable currents near the jetty." },
  { id: "praia-de-ofir", name: "Praia de Ofir", region: "Norte", lat: 41.4947, lon: -8.7767, description: "Beautiful dune beach in a protected natural area near Esposende.", hazards: "Rip currents. Strong shore break when swell is up." },
  { id: "praia-de-esposende", name: "Praia de Esposende", region: "Norte", lat: 41.5349, lon: -8.7761, description: "Town beach in Esposende, backed by a 16th century fort." },
  { id: "praia-de-viana", name: "Praia de Viana do Castelo", region: "Norte", lat: 41.6888, lon: -8.8496, description: "Long beach under the iconic Santa Luzia basilica.", hazards: "Strong rip currents and powerful Atlantic swell. Northern Portugal water is cold year-round." },
  { id: "praia-do-cabedelo", name: "Praia do Cabedelo", region: "Norte", lat: 41.6755, lon: -8.8448, description: "Wide dune beach at the Lima river mouth, accessible by ferry from Viana.", hazards: "Strong currents near the river mouth." },
  { id: "praia-de-ancora", name: "Praia de Âncora", region: "Norte", lat: 41.8069, lon: -8.8577, description: "Peaceful beach in the fishing village of Vila Praia de Âncora." },
  { id: "praia-de-moledo", name: "Praia de Moledo", region: "Norte", lat: 41.8448, lon: -8.8676, description: "Long beach near the Spanish border, backed by pine trees.", hazards: "Strong Atlantic swell common. Cold water." },
  { id: "praia-de-caminha", name: "Praia de Caminha", region: "Norte", lat: 41.8742, lon: -8.8432, description: "Beach at the Minho river mouth, facing the Spanish coast.", hazards: "Minho river currents near the estuary mouth. Cold water." },

];

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
