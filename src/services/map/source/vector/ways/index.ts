import { geojson } from "@/services/map/geojson";
import type Feature from "ol/Feature";
import type { Coordinate } from "ol/coordinate";
import type Geometry from "ol/geom/Geometry";
import VectorSource from "ol/source/Vector";

export const createWaysVectorSource = (ways: Coordinate[][]) => {
  return new VectorSource({
    features: ways.reduce((acc: Feature<Geometry>[], coordinates) => {
      acc.push(
        ...geojson.readFeatures({
          type: "FeatureCollection",
          features: [
            {
              type: "LineString",
              coordinates,
            },
          ],
        })
      );
      return acc;
    }, []),
  });
};
