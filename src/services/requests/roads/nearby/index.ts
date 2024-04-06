import { overpassRequest } from "@/services/overpass";
import { roadTagFilter } from "@/services/overpass/filters/tags";
import type { GeomOutput } from "@/services/overpass/types/geom";
import type { Coordinate } from "ol/coordinate";

export const searchRoadsNearby = async (
  node: Coordinate,
  distance: number = 100
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/polygon.html
  const query = `way(around:${distance},${point})${roadTagFilter};out geom;`;

  return overpassRequest<GeomOutput>(query);
};
