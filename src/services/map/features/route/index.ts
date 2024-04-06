import { geojson } from "@/services/map/geojson";
import type { DirectionsResponse } from "@/services/openroute/types/directions";

export const createRouteFeatures = (directions: DirectionsResponse) => {
  return geojson.readFeatures(directions);
};
