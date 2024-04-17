import { calculateArchWeight } from "@/services/graph/calculate/weight";
import type { WeightedPath } from "@/services/graph/types";
import type { Coordinate } from "ol/coordinate";

export function calculatePathAStarFromBottom(graph: Coordinate[][]) {
  // Parto dall'ultimo nodo
  const firstNode = graph.at(0)![0];
  const lastNode = graph.at(-1)![0];
  const lastNodes: WeightedPath = {
    distance: 0,
    duration: 0,
    nodes: [lastNode],
    archs: [],
  };

  // Visito i prossimi nodi e calcolo la stima di costo (percorrenza in secondi)
  for (let index = 1; index < graph.length; index++) {
    // Recupero estremi della soluzione
    const fromNode = firstNode;
    const toNode = lastNodes.nodes.at(0)!;

    // Recupero nodi figli
    const lowerElevation = fromNode[2] > toNode[2] ? toNode[2] : fromNode[2];
    const higherElevation = fromNode[2] > toNode[2] ? fromNode[2] : toNode[2];
    const nextLastNodes = filterNodesByElevation(
      graph.at(-(index + 1))!,
      lowerElevation,
      higherElevation
    );

    // Recupero miglior nodo, prima dal fondo
    const nextLast = getBestNode(nextLastNodes, fromNode, toNode);
    const nextLastNode = nextLast.nodes[0];
    const nextLastArch = nextLast.archs[1];

    // Appendo migliori nodi al grafo
    lastNodes.duration += nextLastArch.duration;
    lastNodes.nodes.unshift(nextLastNode);
    lastNodes.archs.unshift(nextLastArch);
  }

  // Combino i due grafi
  return {
    duration: lastNodes.duration,
    nodes: [firstNode, ...lastNodes.nodes],
    archs: lastNodes.archs,
  };
}

function getBestNode(
  nodes: Coordinate[],
  fromNode: Coordinate,
  toNode: Coordinate
) {
  return nodes.reduce((acc: WeightedPath | null, node) => {
    // Calcolo la percorrenza fino al nodo
    const fromArch = calculateArchWeight(fromNode, node);
    // Stimo la percorrenza fino all'ultimo nodo
    const toArch = calculateArchWeight(node, toNode);

    // Scelgo il nodo con minor tempo di percorrenza
    const duration = fromArch.duration + toArch.duration;

    if (!acc || acc.duration > duration) {
      return {
        distance: fromArch.distance + toArch.distance,
        duration: fromArch.duration + toArch.duration,
        nodes: [node],
        archs: [fromArch, toArch],
      };
    } else {
      return acc;
    }
  }, null)!;
}

function filterNodesByElevation(
  nodes: Coordinate[],
  lower: number,
  higher: number
) {
  // Recupero i punti che seguono il livello di altitudine
  const filtered = nodes.filter(
    ([elevation]) => elevation >= lower && elevation <= higher
  );
  // Considero il caso in cui ci sia una depressione o una cima
  return filtered.length ? filtered : nodes;
}
