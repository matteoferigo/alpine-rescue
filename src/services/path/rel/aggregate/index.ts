import type { GeomIdsOutput } from "@/services/overpass/types/geom";
import type {
  RelationOutput,
  RelationWayMember,
} from "@/services/overpass/types/rel";

export const aggregateRelModules = (
  rel: RelationOutput,
  ways: GeomIdsOutput[]
): RelationOutput<RelationWayMember> => {
  return {
    ...rel,
    members: rel.members.map(
      (member) =>
        ({
          ...member,
          way: ways.find((way) => member.ref === way.id),
        } as RelationWayMember)
    ),
  };
};
