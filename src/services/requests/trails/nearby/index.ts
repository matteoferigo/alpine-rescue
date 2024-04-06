import { overpassRequest } from "@/services/overpass";
import { trailTagFilter } from "@/services/overpass/filters/tags";
import type { GeomOutput } from "@/services/overpass/types/geom";
import type { Coordinate } from "ol/coordinate";

export const searchTrailsNearby = async (
  node: Coordinate,
  distance: number,
  outFormat: string
) => {
  const point = `${node[1]},${node[0]}`;

  // https://dev.overpass-api.de/overpass-doc/en/full_data/polygon.html
  // https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#out
  const query = `way(around:${distance},${point})${trailTagFilter};out ${outFormat};`;

  return overpassRequest<GeomOutput>(query);
};
