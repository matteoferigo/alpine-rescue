import { geojson } from "@/services/map/geojson";
import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import VectorSource from "ol/source/Vector";

export const createGeomWaysVectorSource = (geom: GeomNoIdsOutput[]) => {
  return new VectorSource({
    features: geom.reduce((acc: Feature<Geometry>[], { geometry }) => {
      acc.push(
        ...geojson.readFeatures({
          type: "FeatureCollection",
          features: [
            {
              type: "LineString",
              coordinates: geometry.map((node) => [node.lon, node.lat]),
            },
          ],
        })
      );
      return acc;
    }, []),
  });
};
