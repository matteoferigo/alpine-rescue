import { searchTerrainNearby } from "@/services/requests/terrain/nearby";
import { createTerrainPolygon } from "@/services/terrain/create-polygon";
import type { Coordinate } from "ol/coordinate";

export async function searchTerrainPolygons(
  coordinate: Coordinate,
  maxDistance: number
) {
  try {
    // Cerco terreni nelle vicinanze
    const terrains = await searchTerrainNearby(coordinate, maxDistance);
    if (!terrains.length)
      throw new Error("Non sono stati trovati terreni nelle vicinanze");

    // Genero i poligoni che definiscono i terreni
    return terrains.map(createTerrainPolygon);
  } catch (error) {
    console.warn("Error searchTerrainPolygons:", error);
    throw new Error(
      "Non è stato possibile recuperare i tipi di terreni nella zona"
    );
  }
}
