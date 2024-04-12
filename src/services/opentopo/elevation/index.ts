import type { ElevationsResponse } from "@/services/opentopo/types/elevation";
import type { Coordinate } from "ol/coordinate";

export async function getElevations(coords: Coordinate[]) {
  const result = await fetch(
    `/api/opentopo?locations=${coords.reduce(
      (acc, coord) => `${acc ? `${acc}|` : ""}${coord[1]},${coord[0]}`,
      ""
    )}`
  );
  const response: ElevationsResponse = await result.json();

  return response.results;
}
