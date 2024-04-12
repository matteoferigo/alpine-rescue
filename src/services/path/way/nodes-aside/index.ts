import { greatCircleBearing } from "@/services/ol/circle-bearing";
import { computeDestinationPoint } from "@/services/ol/destination-point";
import type { Coordinate } from "ol/coordinate";

const rightAngleRadiants = (90 * Math.PI) / 180;

export const getNodesAside = (
  fromPoint: Coordinate,
  toPoint: Coordinate,
  gap: number,
  numPoints: number
) => {
  // Calcolo della direzione tra i due punti (in gradi)
  const bearing = greatCircleBearing(fromPoint, toPoint);

  // Calcolo la direzione ortogonale
  const leftBearing = bearing + rightAngleRadiants;
  const rightBearing = bearing - rightAngleRadiants;

  // Generare i punti
  const points = [];
  for (let i = 1; i < Math.ceil(numPoints / 2); i++) {
    points.push(computeDestinationPoint(fromPoint, i * gap, leftBearing));
    points.push(computeDestinationPoint(fromPoint, i * gap, rightBearing));
  }

  return points;
};
