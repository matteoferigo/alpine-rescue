import type { DirectionsResponse } from "@/services/openroute/types/directions";
import type { Coordinate } from "ol/coordinate";

// https://openrouteservice.org/dev/#/api-docs/v2/directions/{profile}/get

export async function getFootDirections(start: Coordinate, end: Coordinate) {
  const result = await fetch(
    `/api/openroute/directions/foot-hiking?start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`
  );
  const response: DirectionsResponse = await result.json();

  return response;
}
