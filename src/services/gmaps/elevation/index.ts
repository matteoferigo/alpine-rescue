import type { ElevationsResponse } from "@/services/gmaps/types/elevation";
import type { Coordinate } from "ol/coordinate";

export async function getElevations(coords: Coordinate[]) {
  const result = await fetch(
    `/api/gmaps/elevation/json?locations=${coords.reduce(
      (acc, coord) => `${acc ? `${acc}|` : ""}${coord[1]},${coord[0]}`,
      ""
    )}`
  );
  const response: ElevationsResponse = await result.json();

  return response.results;
}
