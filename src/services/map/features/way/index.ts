import { geojson } from "@/services/map/geojson";
import type { Coordinate } from "ol/coordinate";

export const createWayFeatures = (coordinates: Coordinate[]) => {
  return geojson.readFeatures({
    type: "FeatureCollection",
    features: [
      {
        type: "LineString",
        coordinates,
      },
    ],
  });
};
