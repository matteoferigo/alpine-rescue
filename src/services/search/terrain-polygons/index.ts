import type { GeomOutput } from "@/services/overpass/types/geom";
import type { RelationOutput } from "@/services/overpass/types/rel";
import { aggregateRelModules } from "@/services/path/rel/aggregate";
import { searchTerrainRelNearby } from "@/services/requests/terrain/nearby/rel";
import { searchTerrainNearby } from "@/services/requests/terrain/nearby/way";
import { createTerrainPolygon } from "@/services/terrain/create-polygon";
import { createTerrainRelPolygon } from "@/services/terrain/create-polygon/rel";
import type { Coordinate } from "ol/coordinate";

export async function searchTerrainPolygons(
  coordinate: Coordinate,
  maxDistance: number
) {
  try {
    // Cerco terreni nelle vicinanze
    const [terrainWays, terrainRelResponse] = await Promise.all([
      searchTerrainNearby(coordinate, maxDistance),
      searchTerrainRelNearby(coordinate, maxDistance),
    ]);
    if (!terrainWays.length && !terrainRelResponse.length)
      throw new Error("Non sono stati trovati terreni nelle vicinanze");

    // Separo i due tipi di valori
    const [terrainRelations, terrainRelWays] = terrainRelResponse.reduce(
      (acc: [RelationOutput[], GeomOutput[]], value) => {
        if (value.type === "relation") acc[0].push(value as RelationOutput);
        else acc[1].push(value as GeomOutput);

        return acc;
      },
      [[], []]
    );

    // Genero i poligoni che definiscono i terreni
    return [
      ...terrainWays.map(createTerrainPolygon),
      ...terrainRelations.map((rel) =>
        createTerrainRelPolygon(aggregateRelModules(rel, terrainRelWays))
      ),
    ];
  } catch (error) {
    console.warn("Error searchTerrainPolygons:", error);
    throw new Error(
      "Non è stato possibile recuperare i tipi di terreni nella zona"
    );
  }
}
