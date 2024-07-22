import { overpassRequest } from "@/services/overpass";
import { buildingTagFilter } from "@/services/overpass/filters/tags";
import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import type { Coordinate } from "ol/coordinate";

export const searchBuildingsNearby = async (
  node: Coordinate,
  distance: number = 100
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/osm_types.html
  const query = `way(around:${distance},${point})${buildingTagFilter};out geom tags;`;

  return overpassRequest<GeomNoIdsOutput>(query);
};
