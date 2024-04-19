import type {
  GeomNoIdsOutput,
  GeomOutput,
} from "@/services/overpass/types/geom";
import type { NodeOutput } from "@/services/overpass/types/node";
import type { RelationOutput } from "@/services/overpass/types/rel";

export type OverpassResponse<T extends OverpassResponseElement> = {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: string;
    copyright: string;
  };
  elements: T[];
};

export type OverpassResponseElement =
  | GeomNoIdsOutput
  | GeomOutput
  | NodeOutput
  | RelationOutput;
