import type { DirectionsResponse } from "@/services/openroute/types/directions";
import type { Coordinate } from "ol/coordinate";

// https://openrouteservice.org/dev/#/api-docs/v2/directions/{profile}/get

export async function getCarDirections(start: Coordinate, end: Coordinate) {
  const result = await fetch(
    `/api/openroute/v2/directions/driving-car?start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`
  );
  const response: DirectionsResponse = await result.json();

  return response;
}
