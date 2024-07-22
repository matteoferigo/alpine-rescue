import { searchPowerLinesInArea } from "@/services/requests/power/lines";
import type { Coordinate } from "ol/coordinate";

export async function searchPowerLinesInMap(
  bbox: Coordinate[],
  limit?: number
) {
  try {
    // Cerco rete elettrica nell'area
    const powerLines = await searchPowerLinesInArea(bbox, limit);
    if (!powerLines.length) return [];

    // Restituisco tracciati delle linee elettriche
    return powerLines;
  } catch (error) {
    console.warn("Error searchPowerLinesInArea:", error);
    throw new Error(
      "Non è stato possibile trovare la rete elettrica nell'area"
    );
  }
}
