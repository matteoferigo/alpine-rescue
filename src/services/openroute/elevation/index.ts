import { ElevationPointResponse } from "@/services/openroute/types/elevation";
import type { Coordinate } from "ol/coordinate";

export async function getElevation(coord: Coordinate) {
  const result = await fetch(
    `/api/openroute/elevation/point?geometry=${coord[0]},${coord[1]}`
  );
  const response: ElevationPointResponse = await result.json();

  return response.geometry.coordinates[2];
}
