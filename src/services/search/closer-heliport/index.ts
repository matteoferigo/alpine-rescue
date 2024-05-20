import { parseCenterElement } from "@/services/overpass/parsers/center";
import { getCloserNode } from "@/services/path/way/closer-node";
import { searchHeliportNearby } from "@/services/requests/heliport/nearby";
import type { Coordinate } from "ol/coordinate";

export async function searchCloserHeliportPoint(hospitalCoords: Coordinate) {
  try {
    // Cerco elisuperfici vicine
    const heliports = await searchHeliportNearby(hospitalCoords, 5000);
    if (!heliports.length)
      throw new Error("Non sono state trovate eliporti nelle vicinanze");

    // Scelgo il più vicino
    const heliportsCoords = heliports.map(parseCenterElement);
    const heliportNode = getCloserNode(heliportsCoords, hospitalCoords);
    return heliportNode.coordinate;
  } catch (error) {
    console.warn("Error searchCloserHeliportPoint:", error);
    throw new Error("Non è stato possibile trovare l'eliporto più vicina");
  }
}
