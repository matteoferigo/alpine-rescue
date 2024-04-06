import { Bounds } from "@/services/overpass/types/bounds";
import { LatLon } from "@/services/overpass/types/latlon";
import { OSMType } from "@/services/overpass/types/osm-type";
import { Tags } from "@/services/overpass/types/tags";

// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#out

export type GeomNoIdsOutput = {
  type: OSMType;
  bounds: Bounds;
  nodes: number[];
  geometry: LatLon[];
  tags: Tags;
};

export type GeomIdsOutput = {
  id: number;
};

export type GeomOutput = GeomNoIdsOutput & GeomIdsOutput;