import type { GeomTagsOutput } from "@/services/overpass/types/geom";
import type { TerrainType } from "@/services/terrain/types";

export const getTerrainType = (geom: GeomTagsOutput): TerrainType => {
  return geom.tags.natural || geom.tags.landuse;
};
