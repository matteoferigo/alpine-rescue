import type { GeomOutput } from "@/services/overpass/types/geom";
import type { Coordinate } from "ol/coordinate";

export type CoordinateWithDistance = {
  coordinate: Coordinate;
  distance: number;
};

export type GeomElementWithDistance = GeomOutput & {
  closerNode: CoordinateWithDistance;
};
