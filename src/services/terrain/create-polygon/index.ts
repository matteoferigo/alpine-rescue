import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import { getTerrainType } from "@/services/terrain/get-type";
import type { TerrainPolygon } from "@/services/terrain/types";
import Polygon from "ol/geom/Polygon";

export const createTerrainPolygon = (geom: GeomNoIdsOutput): TerrainPolygon => {
  // Genero il poligono dell'area
  const nodes = geom.geometry.map((node) => [node.lon, node.lat]);
  const polygon = new Polygon([nodes]);

  return {
    type: getTerrainType(geom),
    polygon,
  };
};
