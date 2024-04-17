import type { GeomNoIdsOutput } from "@/services/overpass/types/geom";
import type { TerrainPolygon, TerrainType } from "@/services/terrain/types";
import Polygon from "ol/geom/Polygon";

export const createTerrainPolygon = (geom: GeomNoIdsOutput): TerrainPolygon => {
  // Recupero il tipo di terreno
  const terrainType = (geom.tags.natural || geom.tags.landuse) as TerrainType;

  // Genero il poligono dell'area
  const nodes = geom.geometry.map((node) => [node.lon, node.lat]);
  const polygon = new Polygon([nodes]);

  return {
    type: terrainType,
    polygon,
  };
};
