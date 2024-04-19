import type { Bounds } from "@/services/overpass/types/bounds";
import type { LatLon } from "@/services/overpass/types/latlon";
import type { OSMType } from "@/services/overpass/types/osm-type";
import type { Tags } from "@/services/overpass/types/tags";
import type { Coordinate } from "ol/coordinate";

// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#out

export type GeomTagsOutput = {
  tags: Tags;
};

export type GeomNoIdsOutput = {
  type: OSMType;
  bounds: Bounds;
  nodes: Coordinate[];
  geometry: LatLon[];
  tags: Tags;
};

export type GeomIdsOutput = {
  id: number;
};

export type GeomOutput = GeomNoIdsOutput & GeomIdsOutput;
