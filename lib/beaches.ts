import { Beach } from "@/types";

export const BEACHES: Beach[] = [
  // Algarve
  { id: "praia-da-marinha", name: "Praia da Marinha", region: "Algarve", lat: 37.0893, lon: -8.4147, description: "Dramatic limestone cliffs, crystal-clear water.", hazards: "Rocky and uneven seabed. Sea urchins present near rocks. Entry and exit can be slippery." },
  { id: "praia-de-meia-praia", name: "Praia de Meia Praia", region: "Algarve", lat: 37.1108, lon: -8.7028, description: "Long sandy beach near Lagos, sheltered bay." },
  { id: "meia-praia-lagos", name: "Praia Dona Ana", region: "Algarve", lat: 37.0965, lon: -8.6698, description: "Postcard-perfect beach near Lagos.", hazards: "Rocky areas at the sides. Sea urchins near cliff base." },
  { id: "praia-da-rocha", name: "Praia da Rocha", region: "Algarve", lat: 37.1146, lon: -8.5315, description: "Iconic golden beach in Portimão." },
  { id: "praia-de-sagres", name: "Praia de Sagres", region: "Algarve", lat: 37.0097, lon: -8.9368, description: "Wild, windswept beach at Portugal's southwest tip.", hazards: "Powerful shore break and strong rip currents. Frequently closed to swimming. Not suitable for children." },
  { id: "praia-do-camilo", name: "Praia do Camilo", region: "Algarve", lat: 37.0875, lon: -8.6742, description: "Hidden gem accessible via wooden staircase.", hazards: "Rocky seabed. Very small beach — can become crowded quickly." },
  { id: "praia-de-odeceixe", name: "Praia de Odeceixe", region: "Algarve", lat: 37.4527, lon: -8.7723, description: "Stunning estuary beach on the Alentejo border.", hazards: "River current near estuary mouth. Atlantic side has strong waves — stick to the calmer river side." },
  { id: "praia-de-armacao", name: "Praia de Armação de Pêra", region: "Algarve", lat: 37.1024, lon: -8.3560, description: "Wide sandy beach in a traditional fishing village." },
  { id: "praia-de-quarteira", name: "Praia de Quarteira", region: "Algarve", lat: 37.0652, lon: -8.1005, description: "Popular family beach on the Golden Triangle coast." },
  { id: "praia-de-manta-rota", name: "Praia de Manta Rota", region: "Algarve", lat: 37.1712, lon: -7.5247, description: "Quiet beach near the Spanish border." },

  // Alentejo
  { id: "praia-de-comporta", name: "Praia de Comporta", region: "Alentejo", lat: 38.3653, lon: -8.7728, description: "Unspoilt wild beach with rice fields behind.", hazards: "Strong rip currents along this stretch of coast. No lifeguard outside summer season." },
  { id: "praia-de-troia", name: "Praia de Tróia", region: "Alentejo", lat: 38.4897, lon: -8.8980, description: "Peninsula beach with turquoise, calm water." },
  { id: "praia-de-porto-covo", name: "Praia de Porto Covo", region: "Alentejo", lat: 37.8533, lon: -8.7862, description: "Rugged cliffs and strong Atlantic swell.", hazards: "Powerful swell and rocky seabed. Rip currents near the cliffs. Not suitable for weak swimmers." },
  { id: "praia-da-ilha-do-pessegueiro", name: "Ilha do Pessegueiro", region: "Alentejo", lat: 37.8353, lon: -8.7954, description: "Facing a small island, remote and beautiful.", hazards: "Exposed Atlantic beach. Rip currents possible. No lifeguard most of the year." },

  // Setúbal / Lisboa region
  { id: "praia-de-setubal", name: "Praia de Setúbal", region: "Setúbal", lat: 38.4958, lon: -8.8983, description: "Long beach facing the Sado estuary." },
  { id: "praia-da-arrábida", name: "Praia da Arrábida", region: "Setúbal", lat: 38.4741, lon: -8.9735, description: "Mediterranean-like turquoise water inside a nature park.", hazards: "Rocky seabed in places. Sea urchins near rocks. Generally calm, but boat traffic in summer." },
  { id: "praia-de-sesimbra", name: "Praia de Sesimbra", region: "Setúbal", lat: 38.4438, lon: -9.1001, description: "Sheltered bay with a Moorish castle above." },
  { id: "praia-grande", name: "Praia Grande", region: "Lisboa", lat: 38.8215, lon: -9.4802, description: "Wide beach north of Sintra, popular with surfers.", hazards: "Strong rip currents and powerful shore break. Frequently has red or yellow flags. Children must be supervised at all times." },
  { id: "praia-de-cascais", name: "Praia de Cascais", region: "Lisboa", lat: 38.6979, lon: -9.4215, description: "Town beach in the cosmopolitan Cascais bay." },
  { id: "praia-de-guincho", name: "Praia do Guincho", region: "Lisboa", lat: 38.7272, lon: -9.4747, description: "Wild Atlantic beach, often windy — a kite surfer's paradise.", hazards: "Very strong and persistent winds. Rip currents common. Swimming is frequently prohibited. Suitable for experienced water sports only." },

  // Oeste / Centro
  { id: "praia-de-peniche", name: "Praia de Peniche", region: "Oeste", lat: 39.3556, lon: -9.3810, description: "Near the world-famous Supertubos surf break.", hazards: "Heavy shore break. Rip currents along the sandbanks. Surfers in the water — be aware of boards." },
  { id: "praia-de-baleal", name: "Praia do Baleal", region: "Oeste", lat: 39.3797, lon: -9.3430, description: "Charming isthmus beach with surf schools.", hazards: "Rip currents near the sandbar. Surf school area — watch for beginners on boards." },
  { id: "praia-de-nazare", name: "Praia de Nazaré", region: "Oeste", lat: 39.6007, lon: -9.0712, description: "Famous for record-breaking waves in winter; calmer in summer.", hazards: "Dangerous currents year-round due to the underwater canyon. Even in calm summer conditions, rip currents are common. Local warning: never swim alone here." },
  { id: "praia-de-sao-martinho", name: "São Martinho do Porto", region: "Oeste", lat: 39.5103, lon: -9.1413, description: "Almost circular sheltered bay — perfect for kids." },
  { id: "praia-de-figueira", name: "Praia de Figueira da Foz", region: "Centro", lat: 40.1491, lon: -8.8639, description: "One of the longest beaches in Portugal.", hazards: "Rip currents along the sandbanks, especially after storms. Stay between the flags." },
  { id: "praia-de-mira", name: "Praia de Mira", region: "Centro", lat: 40.4269, lon: -8.7919, description: "Tranquil lagoon-side beach with traditional ox carts." },
  { id: "praia-da-costa-nova", name: "Praia da Costa Nova", region: "Centro", lat: 40.5799, lon: -8.7476, description: "Famous for its striped candy-coloured houses.", hazards: "Strong rip currents and shore break. Always swim between the flags." },

  // Norte
  { id: "praia-de-espinho", name: "Praia de Espinho", region: "Norte", lat: 41.0092, lon: -8.6418, description: "Urban beach south of Porto with a casino promenade.", hazards: "Rip currents and strong shore break typical of northern Portugal beaches." },
  { id: "praia-de-vila-do-conde", name: "Praia de Vila do Conde", region: "Norte", lat: 41.3522, lon: -8.7483, description: "Historic beach town at the mouth of the Ave river.", hazards: "River mouth creates unpredictable currents near the jetty." },
  { id: "praia-de-viana", name: "Praia de Viana do Castelo", region: "Norte", lat: 41.6888, lon: -8.8496, description: "Long beach under the iconic Santa Luzia basilica.", hazards: "Strong rip currents and powerful Atlantic swell. Northern Portugal water is cold year-round." },
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
