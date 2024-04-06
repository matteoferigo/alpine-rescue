import { geojson } from "@/services/map/geojson";
import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";

export const createGeomWaysFeatures = (geom: GeomNoIdsOutput[]) => {
  return geom.reduce((acc: Feature<Geometry>[], { geometry }) => {
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
  }, []);
};
