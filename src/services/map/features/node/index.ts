import { geojson } from "@/services/map/geojson";
import type { Coordinate } from "ol/coordinate";

export const createNodeFeatures = (
  coordinates: Coordinate,
  properties?: Record<string, any>
) => {
  const features = geojson.readFeatures({
    type: "Point",
    coordinates,
  });

  if (properties) {
    features.map((feature) => {
      feature.setProperties(properties);
    });
  }

  return features;
};
