import type MultiPolygon from "ol/geom/MultiPolygon";
import type Polygon from "ol/geom/Polygon";

export type TerrainType = string;

export type TerrainPolygon = {
  type: TerrainType;
  polygon: Polygon | MultiPolygon;
};
