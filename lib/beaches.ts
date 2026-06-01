import { Beach } from "@/types";

export const BEACHES: Beach[] = [
  // Algarve
  { id: "praia-da-marinha", name: "Praia da Marinha", region: "Algarve", lat: 37.0893, lon: -8.4147, description: "Dramatic limestone cliffs, crystal-clear water." },
  { id: "praia-de-meia-praia", name: "Praia de Meia Praia", region: "Algarve", lat: 37.1108, lon: -8.7028, description: "Long sandy beach near Lagos, sheltered bay." },
  { id: "meia-praia-lagos", name: "Praia Dona Ana", region: "Algarve", lat: 37.0965, lon: -8.6698, description: "Postcard-perfect beach near Lagos." },
  { id: "praia-da-rocha", name: "Praia da Rocha", region: "Algarve", lat: 37.1146, lon: -8.5315, description: "Iconic golden beach in Portimão." },
  { id: "praia-de-sagres", name: "Praia de Sagres", region: "Algarve", lat: 37.0097, lon: -8.9368, description: "Wild, windswept beach at Portugal's southwest tip." },
  { id: "praia-do-camilo", name: "Praia do Camilo", region: "Algarve", lat: 37.0875, lon: -8.6742, description: "Hidden gem accessible via wooden staircase." },
  { id: "praia-de-odeceixe", name: "Praia de Odeceixe", region: "Algarve", lat: 37.4527, lon: -8.7723, description: "Stunning estuary beach on the Alentejo border." },
  { id: "praia-de-armacao", name: "Praia de Armação de Pêra", region: "Algarve", lat: 37.1024, lon: -8.3560, description: "Wide sandy beach in a traditional fishing village." },
  { id: "praia-de-quarteira", name: "Praia de Quarteira", region: "Algarve", lat: 37.0652, lon: -8.1005, description: "Popular family beach on the Golden Triangle coast." },
  { id: "praia-de-manta-rota", name: "Praia de Manta Rota", region: "Algarve", lat: 37.1712, lon: -7.5247, description: "Quiet beach near the Spanish border." },

  // Alentejo
  { id: "praia-de-comporta", name: "Praia de Comporta", region: "Alentejo", lat: 38.3653, lon: -8.7728, description: "Unspoilt wild beach with rice fields behind." },
  { id: "praia-de-troia", name: "Praia de Tróia", region: "Alentejo", lat: 38.4897, lon: -8.8980, description: "Peninsula beach with turquoise, calm water." },
  { id: "praia-de-porto-covo", name: "Praia de Porto Covo", region: "Alentejo", lat: 37.8533, lon: -8.7862, description: "Rugged cliffs and strong Atlantic swell." },
  { id: "praia-da-ilha-do-pessegueiro", name: "Ilha do Pessegueiro", region: "Alentejo", lat: 37.8353, lon: -8.7954, description: "Facing a small island, remote and beautiful." },

  // Setúbal / Lisboa region
  { id: "praia-de-setubal", name: "Praia de Setúbal", region: "Setúbal", lat: 38.4958, lon: -8.8983, description: "Long beach facing the Sado estuary." },
  { id: "praia-da-arrábida", name: "Praia da Arrábida", region: "Setúbal", lat: 38.4741, lon: -8.9735, description: "Mediterranean-like turquoise water inside a nature park." },
  { id: "praia-de-sesimbra", name: "Praia de Sesimbra", region: "Setúbal", lat: 38.4438, lon: -9.1001, description: "Sheltered bay with a Moorish castle above." },
  { id: "praia-grande", name: "Praia Grande", region: "Lisboa", lat: 38.8215, lon: -9.4802, description: "Wide beach north of Sintra, popular with surfers." },
  { id: "praia-de-cascais", name: "Praia de Cascais", region: "Lisboa", lat: 38.6979, lon: -9.4215, description: "Town beach in the cosmopolitan Cascais bay." },
  { id: "praia-de-guincho", name: "Praia do Guincho", region: "Lisboa", lat: 38.7272, lon: -9.4747, description: "Wild Atlantic beach, often windy — a kite surfer's paradise." },

  // Oeste / Centro
  { id: "praia-de-peniche", name: "Praia de Peniche", region: "Oeste", lat: 39.3556, lon: -9.3810, description: "Near the world-famous Supertubos surf break." },
  { id: "praia-de-baleal", name: "Praia do Baleal", region: "Oeste", lat: 39.3797, lon: -9.3430, description: "Charming isthmus beach with surf schools." },
  { id: "praia-de-nazare", name: "Praia de Nazaré", region: "Oeste", lat: 39.6007, lon: -9.0712, description: "Famous for record-breaking waves in winter; calmer in summer." },
  { id: "praia-de-sao-martinho", name: "São Martinho do Porto", region: "Oeste", lat: 39.5103, lon: -9.1413, description: "Almost circular sheltered bay — perfect for kids." },
  { id: "praia-de-figueira", name: "Praia de Figueira da Foz", region: "Centro", lat: 40.1491, lon: -8.8639, description: "One of the longest beaches in Portugal." },
  { id: "praia-de-mira", name: "Praia de Mira", region: "Centro", lat: 40.4269, lon: -8.7919, description: "Tranquil lagoon-side beach with traditional ox carts." },
  { id: "praia-da-costa-nova", name: "Praia da Costa Nova", region: "Centro", lat: 40.5799, lon: -8.7476, description: "Famous for its striped candy-coloured houses." },

  // Norte
  { id: "praia-de-espinho", name: "Praia de Espinho", region: "Norte", lat: 41.0092, lon: -8.6418, description: "Urban beach south of Porto with a casino promenade." },
  { id: "praia-de-vila-do-conde", name: "Praia de Vila do Conde", region: "Norte", lat: 41.3522, lon: -8.7483, description: "Historic beach town at the mouth of the Ave river." },
  { id: "praia-de-viana", name: "Praia de Viana do Castelo", region: "Norte", lat: 41.6888, lon: -8.8496, description: "Long beach under the iconic Santa Luzia basilica." },
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
