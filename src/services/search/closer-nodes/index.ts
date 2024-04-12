import { searchTrailNodesNearby } from "@/services/requests/trails/nodes/nearby";
import type { Coordinate } from "ol/coordinate";

export const searchCloserNodes = async (
  destination: Coordinate,
  maxDistance: number
) => {
  // Cerco sentieri vicini
  const closerNodes = await searchTrailNodesNearby(
    destination,
    maxDistance,
    "noids"
  );
  if (!closerNodes.length)
    throw new Error("Non sono stati trovati sentieri nelle vicinanze");

  return closerNodes.map((node) => [node.lon, node.lat]);
};
