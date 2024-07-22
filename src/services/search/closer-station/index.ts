import { parseCenterElement } from "@/services/overpass/parsers/center";
import { getCloserNode } from "@/services/path/way/closer-node";
import { searchPowerStationNearby } from "@/services/requests/power/station/nearby";
import type { Coordinate } from "ol/coordinate";

export async function searchCloserPowerStation(emergencyCoords: Coordinate) {
  try {
    // Cerco ospedali vicini
    const stations = await searchPowerStationNearby(emergencyCoords, 20000);
    if (!stations.length)
      throw new Error("Non sono state trovate stazioni nelle vicinanze");

    // Scelgo il più vicino
    const stationsCoords = stations.map(parseCenterElement);
    const stationNode = getCloserNode(stationsCoords, emergencyCoords);
    return stationNode.coordinate;
  } catch (error) {
    console.warn("Error searchCloserPowerStation:", error);
    throw new Error("Non è stato possibile calcolare la stazione più vicina");
  }
}
