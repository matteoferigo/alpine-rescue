import { overpassRequest } from "@/services/overpass";
import {
  roadTagFilter,
  trailTagFilter,
} from "@/services/overpass/filters/tags";
import type { NodeOutput } from "@/services/overpass/types/node";
import type { Coordinate } from "ol/coordinate";

export const searchTrailheadsNearby = async (
  node: Coordinate,
  distance: number,
  outFormat: string
) => {
  const point = `${node[1]},${node[0]}`;
  const areaFilter = `around:${distance},${point}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/polygon.html
  // https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#out
  const query = `way(${areaFilter})${roadTagFilter};node(w)->.roads;
  way(${areaFilter})${trailTagFilter};node(w)->.trails;
  node.roads.trails;out ${outFormat};`;

  return overpassRequest<NodeOutput>(query);
};
