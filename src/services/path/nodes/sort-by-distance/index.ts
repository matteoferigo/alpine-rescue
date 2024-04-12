import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

export const sortNodesByDistance = (
  nodes: Coordinate[],
  toNode: Coordinate,
  maxNodes?: number
) => {
  // Ordino per distanza
  const sortedNodes = nodes
    .map((coordinate) => ({
      coordinate,
      distance: getDistance(coordinate, toNode),
    }))
    .toSorted((a, b) => a.distance - b.distance);

  // Restituisco solo coordinate
  return sortedNodes.slice(0, maxNodes).map(({ coordinate }) => coordinate);
};
