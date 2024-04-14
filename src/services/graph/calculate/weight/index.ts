import { WeightedArch } from "@/services/graph/types";
import { calculateElevationGain } from "@/services/path/way/elevation-gain";
import { calculateWayLength } from "@/services/path/way/length";
import { calculateWaySlope } from "@/services/path/way/slope";
import { calculateWayTimeEstimation } from "@/services/path/way/time-estimation";
import type { Coordinate } from "ol/coordinate";

export function calculateArchWeight(
  fromNode: Coordinate,
  toNode: Coordinate
): WeightedArch {
  // Calcolo la distanza dell'arco (in metri)
  const elevation = calculateElevationGain(fromNode[2], toNode[2]);
  const descending = fromNode[2] > toNode[2];
  const distance = calculateWayLength(fromNode, toNode, elevation);
  const slope = calculateWaySlope(distance, elevation);

  // Calcolo il peso dell'arco (in secondi)
  const duration = calculateWayTimeEstimation(distance, elevation, descending);

  // Restituisco tutti i parametri
  return {
    fromNode,
    toNode,
    descending,
    distance,
    duration,
    elevation,
    slope,
  };
}
