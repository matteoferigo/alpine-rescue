import { getCarDirections } from "@/services/openroute/directions/car";
import { getRouteDuration } from "@/services/openroute/directions/duration";
import { getFootDirections } from "@/services/openroute/directions/foot";
import type { NodeOutput } from "@/services/overpass/types/node";
import { searchTrailheadsNearby } from "@/services/requests/trailheads/nearby";
import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

export async function searchShorterPath(
  startRoadPoint: Coordinate,
  endFootPoint: Coordinate,
  maxDistance: number = 2000
) {
  try {
    // Recuperi gli attacchi dei sentieri nei ditorni
    const trailheads = await searchTrailheadsNearby(
      endFootPoint,
      maxDistance,
      "noids"
    );

    // Limito ai nodi più vicini
    let closerTrailheads;
    if (trailheads.length <= 10) {
      closerTrailheads = trailheads;
    } else {
      const nodes: Record<string, NodeOutput> = {};
      trailheads.forEach((node) => {
        const trailheadPoint = [node.lon, node.lat];
        nodes[getDistance(trailheadPoint, startRoadPoint)] = node;
      });
      closerTrailheads = Object.keys(nodes)
        .sort((a, b) => +a - +b)
        .slice(0, 10)
        .map((key) => nodes[key]);
    }

    // Aggiungo i pesi dei vari percorsi
    const directions = await Promise.all(
      closerTrailheads.map(async (node) => {
        const trailheadPoint = [node.lon, node.lat];
        // Recupero i pesi verso il punto di attacco del sentiero
        // e dall'attacco del sentiero fino al punto di arrivo
        const [roadDirections, trailDirections] = await Promise.all([
          getCarDirections(startRoadPoint, trailheadPoint)
            .then((res) => ("error" in res ? null : res))
            .catch(() => null),
          getFootDirections(trailheadPoint, endFootPoint)
            .then((res) => ("error" in res ? null : res))
            .catch(() => null),
        ]);
        // Calcolo la durata complessiva
        if (!roadDirections || !trailDirections) return null;
        // Normalizzo i risultati
        return {
          trailheadPoint,
          roadDirections,
          trailDirections,
          duration:
            getRouteDuration(roadDirections) +
            getRouteDuration(trailDirections),
        };
      })
    );

    // Restituisco percorso più veloce
    const shorterPath = directions.reduce(
      (shorterPath, path) =>
        path == null || (shorterPath && shorterPath.duration < path.duration)
          ? shorterPath
          : path,
      null
    );
    if (shorterPath == null)
      throw new Error("I percorsi trovati non contengono la durata");

    // Restituisco tutte le direzioni per un confronto
    return { shorterPath, directions };
  } catch (error) {
    console.warn(`${error}`);
    throw new Error("Non è stato possibile calcolare il percorso più breve");
  }
}