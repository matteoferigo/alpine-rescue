import type { LatLon } from "@/services/overpass/types/latlon";
import type { CoordinateWithDistance } from "@/services/path/types";
import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

export const getWayCloserNode = (geometry: LatLon[], toNode: Coordinate) => {
  return geometry.reduce((acc: CoordinateWithDistance | null, latlon) => {
    const coordinate = [latlon.lon, latlon.lat];
    const distance = getDistance(coordinate, toNode);

    return acc == null || distance < acc.distance
      ? { coordinate, distance }
      : acc;
  }, null) as CoordinateWithDistance;
};
