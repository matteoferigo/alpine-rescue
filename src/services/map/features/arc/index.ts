import { geojson } from "@/services/map/geojson";
import arc from "arc";
import type { Coordinate } from "ol/coordinate";

export const createArcFeatures = (fromNode: Coordinate, toNode: Coordinate) => {
  const generator = new arc.GreatCircle(
    { x: fromNode[1], y: fromNode[0] },
    { x: toNode[1], y: toNode[0] }
  );
  const numPoints = 50;
  const coordinates = generator.Arc(numPoints).geometries[0].coords;

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
