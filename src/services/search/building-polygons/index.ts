import { searchBuildingsNearby } from "@/services/requests/building/nearby";
import { createTerrainPolygon } from "@/services/terrain/create-polygon";
import type { Coordinate } from "ol/coordinate";

export async function searchBuildingPolygons(
  coordinate: Coordinate,
  maxDistance: number
) {
  try {
    // Cerco terreni nelle vicinanze
    const buildings = await searchBuildingsNearby(coordinate, maxDistance);
    if (!buildings.length) return [];

    // Genero i poligoni che definiscono i terreni
    return buildings.map(createTerrainPolygon);
  } catch (error) {
    console.warn("Error searchBuildingPolygons:", error);
    throw new Error(
      "Non è stato possibile recuperare gli edifici presenti nella zona"
    );
  }
}
