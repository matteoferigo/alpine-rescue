import { parseCenterElement } from "@/services/overpass/parsers/center";
import { getCloserNode } from "@/services/path/way/closer-node";
import { searchHospitalNearby } from "@/services/requests/hospital/nearby";
import type { Coordinate } from "ol/coordinate";

export async function searchCloserRescuePoint(emergencyCoords: Coordinate) {
  try {
    // Cerco ospedali vicini
    const hospitals = await searchHospitalNearby(emergencyCoords, 20000);
    if (!hospitals.length)
      throw new Error("Non sono stati trovati ospedali nelle vicinanze");

    // Scelgo il più vicino
    const hospitalsCoords = hospitals.map(parseCenterElement);
    const hospitalNode = getCloserNode(hospitalsCoords, emergencyCoords);
    return hospitalNode.coordinate;
  } catch (error) {
    console.warn("Error searchCloserRescuePoint:", error);
    throw new Error(
      "Non è stato possibile calcolare il luogo di soccorso più vicino"
    );
  }
}
