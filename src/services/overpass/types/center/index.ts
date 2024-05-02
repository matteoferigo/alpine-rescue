import type { OSMType } from "@/services/overpass/types/osm-type";

export type CenterOutput = {
  type: OSMType;
  id: number;
  center: {
    lat: number;
    lon: number;
  };
};
