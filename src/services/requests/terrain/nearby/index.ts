import { overpassRequest } from "@/services/overpass";
import {
  landuseTagFilter,
  naturalTagFilter,
} from "@/services/overpass/filters/tags";
import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import type { Coordinate } from "ol/coordinate";

export const searchTerrainNearby = async (
  node: Coordinate,
  distance: number = 100
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/osm_types.html
  const query = `rel(around:${distance},${point})${landuseTagFilter};(way(r)${landuseTagFilter};way(around:${distance},${point})${naturalTagFilter};);out geom tags;`;

  return overpassRequest<GeomNoIdsOutput>(query);
};
