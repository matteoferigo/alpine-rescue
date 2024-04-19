import type {
  RelationOutput,
  RelationWayMember,
} from "@/services/overpass/types/rel";
import { getTerrainType } from "@/services/terrain/get-type";
import type { TerrainPolygon } from "@/services/terrain/types";
import type { Coordinate } from "ol/coordinate";
import { MultiPolygon } from "ol/geom";

export const createTerrainRelPolygon = (
  rel: RelationOutput<RelationWayMember>
): TerrainPolygon => {
  // Genero i percorsi ciclici
  const geometry = rel.members.reduce(
    (acc: Coordinate[][], member) => {
      const nodes: Coordinate[] = member.way.geometry.map((node) => [
        node.lon,
        node.lat,
      ]);

      // Verifico se è un tratto esterno (perimetro)
      if (member.role === "outer") {
        acc[0].push(...nodes);
      }
      // Se percorso interno va in senso anti-orario (esclusione)
      if (member.role === "inner") {
        if (!acc[1]) acc.push([]);
        acc[1].push(...nodes.reverse());
      }

      return acc;
    },
    [[]]
  );

  // Genero il poligono
  const polygon = new MultiPolygon([geometry]);

  return {
    type: getTerrainType(rel),
    polygon,
  };
};
