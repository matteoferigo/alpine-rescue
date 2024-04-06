import type { GeomOutput } from "@/services/overpass/types/geom";

export type GraphNode = {
  id: number;
  way: GeomOutput;
  children: GraphNode[];
  weight: number | undefined;
};
