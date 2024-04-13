import type { DirectionsResponse } from "@/services/openroute/types/directions";

export const getRouteDuration = (directions: DirectionsResponse) => {
  return directions.features.reduce(
    (acc, feature) => acc + feature.properties.summary.duration,
    0
  );
};
