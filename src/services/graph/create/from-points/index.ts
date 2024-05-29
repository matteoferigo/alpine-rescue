import { getElevations } from "@/services/gmaps/elevation";
import { getNodesAside } from "@/services/path/way/nodes-aside";
import { getNodesBeetween } from "@/services/path/way/nodes-between";
import type { Coordinate } from "ol/coordinate";

export async function createGraphFrom2Points(
  fromPoint: Coordinate,
  toPoint: Coordinate,
  distanceGap: number,
  altNodes: number
) {
  // Genero dei nodi intermedi lungo il tragitto (matrice)
  const nodesBetween = getNodesBeetween(fromPoint, toPoint, distanceGap);

  // Per ogni nodo intermedio trovo ortogonalmente dei nodi alternativi
  const nodesGrid = nodesBetween.map((node) =>
    getNodesAside(node, toPoint, distanceGap, altNodes)
  );

  if (!nodesGrid.length) {
    return [[fromPoint], [toPoint]];
  }

  // Compongo il grafo, comprensivo di altitudini
  const betweenPoints = await Promise.all(
    nodesGrid.map(async (nodes) => {
      // Recupero altitudine dei nodi intermedi
      const elevations = await getElevations(nodes);

      return elevations.map((node) => [
        node.location.lng,
        node.location.lat,
        node.elevation,
      ]);
    })
  );

  return [[fromPoint], ...betweenPoints, [toPoint]];
}
