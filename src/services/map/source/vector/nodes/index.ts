import { geojson } from "@/services/map/geojson";
import type Feature from "ol/Feature";
import type { Coordinate } from "ol/coordinate";
import type Geometry from "ol/geom/Geometry";
import VectorSource from "ol/source/Vector";

export const createNodesVectorSource = (nodes: Coordinate[]) => {
  return new VectorSource({
    features: nodes.reduce((acc: Feature<Geometry>[], node) => {
      acc.push(
        ...geojson.readFeatures({
          type: "Point",
          coordinates: node,
        })
      );
      return acc;
    }, []),
  });
};
