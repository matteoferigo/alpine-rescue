import { geojson } from "@/services/map/geojson";
import type { Coordinate } from "ol/coordinate";
import VectorSource from "ol/source/Vector";

export const createWayVectorSource = (coordinates: Coordinate[]) => {
  return new VectorSource({
    features: geojson.readFeatures({
      type: "FeatureCollection",
      features: [
        {
          type: "LineString",
          coordinates,
        },
      ],
    }),
  });
};
