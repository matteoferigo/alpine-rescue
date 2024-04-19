import { calculateElevationGain } from "@/services/path/way/elevation-gain";
import type { Coordinate } from "ol/coordinate";

export const sortNodesByElevation = (
  nodes: Coordinate[],
  toNode: Coordinate,
  maxNodes?: number
) => {
  // Ordino per distanza
  const sortedNodes = nodes
    .map((coordinate) => ({
      coordinate,
      elevation: calculateElevationGain(coordinate[2], toNode[2]),
    }))
    .sort((a, b) => a.elevation - b.elevation);

  // Restituisco solo coordinate
  return sortedNodes.slice(0, maxNodes).map(({ coordinate }) => coordinate);
};
