import { overpassRequest } from "@/services/overpass";
import { highwayTagFilter } from "@/services/overpass/filters/tags";
import type { NodeOutput } from "@/services/overpass/types/node";
import type { Coordinate } from "ol/coordinate";

export const searchTrailNodesNearby = async (
  node: Coordinate,
  distance: number,
  outFormat: string
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/polygon.html
  // https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#out
  const query = `way(around:${distance},${point})${highwayTagFilter};node(w);out ${outFormat};`;

  return overpassRequest<NodeOutput>(query);
};
