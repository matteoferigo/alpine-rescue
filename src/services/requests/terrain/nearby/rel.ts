import { overpassRequest } from "@/services/overpass";
import {
  landuseTagFilter,
  naturalTagFilter,
} from "@/services/overpass/filters/tags";
import type { GeomOutput } from "@/services/overpass/types/geom";
import type { RelationOutput } from "@/services/overpass/types/rel";
import type { Coordinate } from "ol/coordinate";

export const searchTerrainRelNearby = async (
  node: Coordinate,
  distance: number = 100
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/osm_types.html
  const query = `(rel(around:${distance},${point})${landuseTagFilter};rel(around:${distance},${point})${naturalTagFilter};)->.areas;way(r.areas) -> .boundaries;.areas out body;.boundaries out geom;`;

  return overpassRequest<RelationOutput | GeomOutput>(query);
};
