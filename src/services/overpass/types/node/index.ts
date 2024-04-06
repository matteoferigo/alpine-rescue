import type { OSMType } from "@/services/overpass/types/osm-type";

export type NodeOutput = {
  type: OSMType;
  id: number;
  lat: number;
  lon: number;
};
