import { calculateWayElevationGain } from "@/services/path/way/elevation-gain";
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
      elevation: calculateWayElevationGain(coordinate[2], toNode[2]),
    }))
    .toSorted((a, b) => a.elevation - b.elevation);

  // // TODO: Verifico i dati
  // console.debug(
  //   "SortNodesByElevation from",
  //   toNode[2],
  //   nodes
  //     .toSorted((a, b) => a[0] - b[0])
  //     .map((coords) => {
  //       const rankIndex = sortedNodes.findIndex(
  //         (node) => node.coordinate === coords
  //       );
  //       return {
  //         // coords,
  //         rank: rankIndex,
  //         elevation: coords[2],
  //         gain: sortedNodes[rankIndex].elevation,
  //       };
  //     })
  // );

  // Restituisco solo coordinate
  return sortedNodes.slice(0, maxNodes).map(({ coordinate }) => coordinate);
};
