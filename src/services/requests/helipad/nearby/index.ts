import { overpassRequest } from "@/services/overpass";
import { helipadTagFilter } from "@/services/overpass/filters/tags";
import type { NodeOutput } from "@/services/overpass/types/node";
import type { Coordinate } from "ol/coordinate";

export const searchHelipadNearby = async (
  node: Coordinate,
  distance: number = 100
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/osm_types.html
  const query = `node(around:${distance},${point})${helipadTagFilter};out geom;`;

  return overpassRequest<NodeOutput>(query);
};
