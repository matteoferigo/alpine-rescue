import type { WeightedArch } from "@/services/graph/types";

export type RouteArchsTableProps = {
  archs: WeightedArch[];
  distance: number;
  duration: number;
  elevationGain: number;
};
