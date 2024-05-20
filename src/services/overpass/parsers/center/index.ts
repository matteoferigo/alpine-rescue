import type { CenterOutput } from "@/services/overpass/types/center";
import type { LatLon } from "@/services/overpass/types/latlon";
import type { NodeOutput } from "@/services/overpass/types/node";

export const parseCenterElement = (
  element: NodeOutput | CenterOutput
): LatLon => {
  return "center" in element ? element.center : element;
};
