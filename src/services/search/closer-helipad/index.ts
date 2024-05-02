import { getCloserNode } from "@/services/path/way/closer-node";
import { searchHelipadNearby } from "@/services/requests/helipad/nearby";
import type { Coordinate } from "ol/coordinate";

export async function searchCloserHelipadPoint(emergencyCoords: Coordinate) {
  try {
    // Cerco elisuperfici vicine
    const helipads = await searchHelipadNearby(emergencyCoords, 1000);
    if (!helipads.length)
      throw new Error("Non sono state trovate elisuperfici nelle vicinanze");

    // Scelgo il più vicino
    const helipadNode = getCloserNode(helipads, emergencyCoords);
    return helipadNode.coordinate;
  } catch (error) {
    console.warn("Error searchCloserHelipadPoint:", error);
    throw new Error("Non è stato possibile trovate l'elisuperfice più vicina");
  }
}
