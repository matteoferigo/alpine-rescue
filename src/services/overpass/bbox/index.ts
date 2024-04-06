import type { Coordinate } from "ol/coordinate";

// https://dev.overpass-api.de/overpass-doc/en/full_data/bbox.html

export const createBoundingBox = (a: Coordinate, b: Coordinate) => {
  const latSouth = a[0] < b[0] ? a[0] : b[0];
  const latNorth = a[0] < b[0] ? b[0] : a[0];
  const longWest = a[1] < b[1] ? a[1] : b[1];
  const longEast = a[1] < b[1] ? b[1] : a[1];

  return `${latSouth},${longWest},${latNorth},${longEast}`;
};
