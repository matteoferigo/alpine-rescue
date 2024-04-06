import { geojson } from "@/services/map/geojson";
import type { Coordinate } from "ol/coordinate";
import VectorSource from "ol/source/Vector";

export const createNodeVectorSource = (node: Coordinate) => {
  return new VectorSource({
    features: geojson.readFeatures({
      type: "Point",
      coordinates: node,
    }),
  });
};
