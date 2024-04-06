import { overpassRequest } from "@/services/overpass";
import type { NodeOutput } from "@/services/overpass/types/node";

export const getNodes = async (nodeIds: number[]) => {
  // https://dev.overpass-api.de/overpass-doc/en/full_data/osm_types.html
  const query = `node(id: ${nodeIds.join(",")});out geom;`;

  return overpassRequest<NodeOutput>(query);
};
