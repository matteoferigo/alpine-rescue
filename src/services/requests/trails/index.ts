import { overpassRequest } from "@/services/overpass";
import { createBoundingBox } from "@/services/overpass/bbox";
import { trailTagFilter } from "@/services/overpass/filters/tags";
import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import type { Coordinate } from "ol/coordinate";

export const searchTrailsInArea = async (nodes: Coordinate[]) => {
  const bbox = createBoundingBox(nodes[0], nodes[nodes.length - 1]);

  // https://dev.overpass-api.de/overpass-doc/en/full_data/osm_types.html
  const query = `way(${bbox})${trailTagFilter};out noids geom;`;

  return overpassRequest<GeomNoIdsOutput>(query);
};
