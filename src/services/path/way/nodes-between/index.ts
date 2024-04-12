import { greatCircleBearing } from "@/services/ol/circle-bearing";
import { computeDestinationPoint } from "@/services/ol/destination-point";
import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

export const getNodesBeetween = (
  fromPoint: Coordinate,
  toPoint: Coordinate,
  gap: number
) => {
  // Calcolare la distanza tra i due punti
  const distance = getDistance(fromPoint, toPoint);

  // Calcolare il numero di punti (distanza in metri)
  const numPoints = Math.floor(distance / gap);
  const spare = Math.floor((distance % gap) / 2);

  // Calcolo della direzione tra i due punti (in gradi)
  const bearing = greatCircleBearing(fromPoint, toPoint);

  // Generare i punti
  const points = [];
  for (let i = spare ? 0 : 1; i <= numPoints; i++) {
    points.push(computeDestinationPoint(fromPoint, spare + i * gap, bearing));
  }

  return points;
};
