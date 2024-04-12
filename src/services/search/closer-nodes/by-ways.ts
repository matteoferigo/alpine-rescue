import { getWayCloserNode } from "@/services/path/way/closer-node";
import { searchTrailsNearby } from "@/services/requests/trails/nearby";
import type { Coordinate } from "ol/coordinate";

export const searchCloserNodesByWays = async (
  destination: Coordinate,
  maxDistance: number
) => {
  // Cerco sentieri vicini
  const closerWays = await searchTrailsNearby(destination, maxDistance, "geom");
  if (!closerWays.length)
    throw new Error("Non sono stati trovati sentieri nelle vicinanze");

  // Selezioni i nodi più vicini per ogni sentiero
  return closerWays.map((way) => {
    const node = getWayCloserNode(way.geometry, destination);
    return node.coordinate;
  });
};
