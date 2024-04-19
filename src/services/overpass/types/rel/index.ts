import type { GeomOutput } from "@/services/overpass/types/geom";
import type { OSMType } from "@/services/overpass/types/osm-type";
import type { Tags } from "@/services/overpass/types/tags";

export type RelationOutput<Member = RelationMember> = {
  type: "relation";
  id: number;
  members: Member[];
  tags: Tags;
};

export type RelationMember = {
  type: OSMType;
  ref: number;
  role: "outer" | "inner";
};

export type RelationWayMember = RelationMember & {
  way: GeomOutput;
};
