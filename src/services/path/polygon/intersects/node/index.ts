import type { Coordinate } from "ol/coordinate";
import type MultiPolygon from "ol/geom/MultiPolygon";
import type Polygon from "ol/geom/Polygon";

export const isNodeInPolygon = (
  node: Coordinate,
  polygon: Polygon | MultiPolygon
) => {
  // Verifica se il punto interseca il poligono
  return polygon.intersectsCoordinate(node);
};
