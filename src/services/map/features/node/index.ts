import { geojson } from "@/services/map/geojson";
import type { Coordinate } from "ol/coordinate";

export const createNodeFeatures = (coordinates: Coordinate) => {
  return geojson.readFeatures({
    type: "Point",
    coordinates,
  });
};
