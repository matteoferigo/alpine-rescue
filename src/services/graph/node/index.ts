import type { GraphNode } from "@/services/graph/types";
import type { GeomOutput } from "@/services/overpass/types/geom";

export const createNode = (
  id: number,
  way: GeomOutput,
  children: GraphNode[] = []
): GraphNode => ({
  id,
  way,
  children,
  weight: undefined,
});
