import { createGraphFromCloserTrail } from "@/services/graph/create/from-closer-trail";
import { getCloserWay } from "@/services/path/closer-way";
import { searchTrailsNearby } from "@/services/requests/trails/nearby";
import type { Coordinate } from "ol/coordinate";

export async function searchCloserTrail(destination: Coordinate) {
  try {
    // Cerco sentieri vicini
    const closerTrails = await searchTrailsNearby(destination, 1000, "geom");
    if (!closerTrails.length)
      throw new Error("Non sono stati trovati sentieri nelle vicinanze");

    const closerTrail = getCloserWay(closerTrails, destination);

    return {
      offroadPoint: closerTrail.closerNode.coordinate,
      trailsGraph: createGraphFromCloserTrail(closerTrail),
    };
  } catch (error) {
    console.warn(`${error}`);
    throw new Error("Non è stato trovare il sentiero più vicino");
  }
}
